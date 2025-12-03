# Contact Form Email Integration Guide

## Overview

The contact form is built with tRPC (type-safe API) and currently sends notifications to the project owner through the Manus notification system. This guide explains how it works and how to integrate actual email sending.

## Current Implementation

### Frontend (Client)

Located in: `client/src/components/ContactSection.tsx`

The form uses tRPC mutation to submit data:

```tsx
const submitMutation = trpc.contact.submit.useMutation({
  onSuccess: (data) => {
    toast.success(data.message);
    setFormData({ name: "", email: "", message: "" });
  },
  onError: (error) => {
    toast.error(error.message || "Failed to send message. Please try again.");
  },
  onSettled: () => {
    setIsSubmitting(false);
  },
});

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  submitMutation.mutate(formData);
};
```

### Backend (Server)

Located in: `server/contact.ts`

The backend validates and processes the form:

```tsx
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const contactRouter = router({
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      // Send notification to owner
      const success = await notifyOwner({
        title: `New Contact Form Submission from ${input.name}`,
        content: `
Email: ${input.email}

Message:
${input.message}
        `.trim(),
      });

      if (!success) {
        console.error("Failed to send notification");
      }

      return {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      };
    }),
});
```

## How It Currently Works

1. **User fills out form** with name, email, and message
2. **Frontend validates** and sends data via tRPC
3. **Backend validates** using Zod schema (type-safe validation)
4. **Notification sent** to project owner via Manus notification system
5. **Success message** shown to user

## Integrating Real Email Sending

### Option 1: Using Nodemailer (SMTP)

1. **Install nodemailer**:
```bash
pnpm add nodemailer
pnpm add -D @types/nodemailer
```

2. **Create email service** (`server/email.ts`):
```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your password or app password
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: "zhaczshth@gmail.com", // your email
    subject: `Portfolio Contact: ${data.name}`,
    text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
```

3. **Update contact router** (`server/contact.ts`):
```typescript
import { sendContactEmail } from "./email";

export const contactRouter = router({
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        // Send email
        await sendContactEmail(input);
        
        // Also send notification (optional)
        await notifyOwner({
          title: `New Contact Form Submission from ${input.name}`,
          content: `Email: ${input.email}\n\n${input.message}`,
        });

        return {
          success: true,
          message: "Thank you for your message! I'll get back to you soon.",
        };
      } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error("Failed to send message. Please try again later.");
      }
    }),
});
```

4. **Add environment variables** (via Management UI → Settings → Secrets):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**For Gmail:**
- Enable 2-factor authentication
- Generate an "App Password" at https://myaccount.google.com/apppasswords
- Use the app password instead of your regular password

### Option 2: Using SendGrid

1. **Install SendGrid**:
```bash
pnpm add @sendgrid/mail
```

2. **Create email service** (`server/email.ts`):
```typescript
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  const msg = {
    to: "zhaczshth@gmail.com",
    from: process.env.SENDGRID_FROM_EMAIL!, // verified sender
    subject: `Portfolio Contact: ${data.name}`,
    text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  };

  await sgMail.send(msg);
}
```

3. **Add environment variables**:
```
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=verified-sender@yourdomain.com
```

### Option 3: Using Resend

1. **Install Resend**:
```bash
pnpm add resend
```

2. **Create email service** (`server/email.ts`):
```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: "zhaczshth@gmail.com",
    subject: `Portfolio Contact: ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  });
}
```

3. **Add environment variable**:
```
RESEND_API_KEY=your-resend-api-key
```

## Testing Email Integration

1. **Test locally** by adding console.log in the mutation
2. **Use a test email service** like Mailtrap for development
3. **Check spam folder** when testing with real email services
4. **Verify sender email** is properly configured (for SendGrid/Resend)

## Adding Auto-Reply to User

To send a confirmation email to the person who submitted the form:

```typescript
// In your email service
export async function sendAutoReply(email: string, name: string) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Thanks for reaching out!",
    html: `
      <h2>Hi ${name},</h2>
      <p>Thank you for your message! I'll get back to you as soon as possible.</p>
      <p>Best regards,<br>Zaw Hein Aung</p>
    `,
  });
}

// In contact router
await sendContactEmail(input);
await sendAutoReply(input.email, input.name);
```

## Security Considerations

1. **Rate limiting**: Add rate limiting to prevent spam
2. **CAPTCHA**: Consider adding reCAPTCHA for production
3. **Input validation**: Already implemented with Zod schema
4. **Environment variables**: Never commit email credentials to git
5. **Error handling**: Don't expose sensitive error details to users

## Recommended Services

- **Gmail SMTP**: Free, easy setup, good for personal sites
- **SendGrid**: Free tier (100 emails/day), reliable
- **Resend**: Developer-friendly, modern API
- **Mailgun**: Flexible, good for scaling
- **Amazon SES**: Very cheap, requires AWS setup

## Current Notification System

The current implementation uses `notifyOwner()` which sends notifications through the Manus platform. This is useful for:
- Instant notifications in the Manus dashboard
- No email configuration needed
- Works immediately out of the box

You can keep this alongside email sending for redundancy.
