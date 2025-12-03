import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Download } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    url: "https://github.com/godheinstein",
  },
  {
    name: "LinkedIn",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    url: "https://linkedin.com/in/zaw-hein-aung",
  },
  {
    name: "Email",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    url: "mailto:zhaczshth@gmail.com",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    // In production, integrate with email service (see CONTACT_FORM_GUIDE.md)
    setTimeout(() => {
      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/resume.pdf';
    link.download = 'Zaw_Hein_Aung_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Resume download started!");
  };

  return (
    <section id="contact" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-glow">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary mx-auto glow-effect" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Interested in collaboration or have a project in mind? Let's connect and build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mechanical-border p-8 bg-card/50 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full magnetic-element glow-effect"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Right side - Social Links & Resume Download */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Social Links */}
            <div className="mechanical-border p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-4 p-4 bg-background/50 border border-border/30 rounded magnetic-element group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded group-hover:bg-primary/30 transition-colors glow-effect">
                      {link.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{link.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {link.name === "Email" ? "zhaczshth@gmail.com" : `@zawheinaung`}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Resume Download */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mechanical-border p-8 bg-card/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4">Resume</h3>
              <p className="text-muted-foreground mb-6">
                Download my complete resume to learn more about my experience and qualifications.
              </p>
              <Button
                onClick={handleDownloadResume}
                className="w-full magnetic-element glow-effect flex items-center justify-center gap-2"
                variant="outline"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container relative z-10 mt-20 pt-8 border-t border-border/30"
      >
        <p className="text-center text-sm text-muted-foreground">
          © 2024 Zaw Hein Aung. Built with passion for robotics and engineering.
        </p>
      </motion.div>
    </section>
  );
}
