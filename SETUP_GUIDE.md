# Portfolio Setup Guide

## Quick Start (3 Steps)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Visit http://localhost:5173
```

That's it! Your portfolio is now running locally.

## Detailed Setup Instructions

### Prerequisites

- **Node.js**: Version 18 or higher
  - Check: `node --version`
  - Download: https://nodejs.org/

- **Package Manager**: npm (comes with Node.js)
  - Check: `npm --version`

### Step-by-Step Installation

1. **Extract the Project**
   ```bash
   unzip portfolio_standalone.zip
   cd portfolio_standalone
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This will install:
   - React 18 & React DOM
   - Three.js & React Three Fiber (for 3D graphics)
   - Framer Motion (for animations)
   - Tailwind CSS 4 (for styling)
   - Radix UI components
   - And all other required packages

   **Expected time**: 1-2 minutes
   **Expected output**: "added XXX packages"

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   **Expected output**:
   ```
   VITE v5.4.21  ready in XXX ms
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://169.254.0.21:5173/
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - You should see your portfolio website!

### Common Issues & Solutions

#### Issue: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org/

#### Issue: "Port 5173 already in use"
**Solution**: 
```bash
# Kill the process using the port
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

#### Issue: Dependencies installation fails
**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: 3D wheel not showing
**Solution**: 
- Ensure WebGL is supported in your browser
- Try a different browser (Chrome, Firefox, Edge)
- Check browser console for errors (F12)

## Available Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:5173

# Production
npm run build        # Build for production (output to /dist)
npm run preview      # Preview production build locally
```

## Project Structure

```
portfolio_standalone/
├── src/
│   ├── components/       # React components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── MecanumWheel.tsx
│   │   └── ui/          # UI components (buttons, inputs, etc.)
│   ├── pages/           # Page components
│   ├── lib/             # Utilities
│   ├── contexts/        # React contexts
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/
│   └── assets/          # Images and static files
├── dist/                # Production build (generated)
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── tailwind.config.js   # Tailwind configuration
```

## Making Changes

### Update Personal Information

1. **Social Links** - Edit `src/components/ContactSection.tsx`:
   ```typescript
   const socialLinks = [
     { name: "GitHub", url: "https://github.com/YOUR_USERNAME" },
     { name: "LinkedIn", url: "https://linkedin.com/in/YOUR_PROFILE" },
     { name: "Email", url: "mailto:YOUR_EMAIL" },
   ];
   ```

2. **Project Links** - Edit `src/components/ProjectsSection.tsx`:
   - Change `link: "#"` to actual project URLs

3. **Resume** - Place your resume PDF at `public/assets/resume.pdf`

### Customize Styling

Edit `src/index.css` to change colors:
```css
@theme inline {
  --primary: 210 100% 50%;      /* Blue accent */
  --background: 222 47% 11%;    /* Dark background */
  /* ... more variables */
}
```

## Building for Production

```bash
npm run build
```

This creates optimized files in the `dist/` folder:
- Minified JavaScript
- Optimized CSS
- Compressed assets
- Production-ready HTML

## Deployment

### GitHub Pages (Recommended)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub**:
   ```bash
   cd dist
   git init
   git add .
   git commit -m "Deploy portfolio"
   git branch -M main
   git remote add origin https://github.com/godheinstein/godheinstein.github.io.git
   git push -f origin main
   ```

3. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`

4. **Access your site**: https://godheinstein.github.io

### Other Platforms

**Netlify**:
1. Drag and drop the `dist/` folder to Netlify
2. Or connect your GitHub repo for auto-deployment

**Vercel**:
```bash
npm install -g vercel
vercel --prod
```

## Development Tips

1. **Hot Reload**: Changes are automatically reflected in the browser
2. **TypeScript**: Full type checking - errors show in terminal
3. **Console**: Check browser console (F12) for runtime errors
4. **Network**: Dev server accessible on local network (see Network URL)

## Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite 5**: Build tool & dev server
- **Tailwind CSS 4**: Styling
- **Three.js**: 3D graphics
- **Framer Motion**: Animations
- **Radix UI**: Accessible components

## Support

- Check `README.md` for more information
- See `MECANUM_WHEEL_GUIDE.md` for 3D model editing
- See `CONTACT_FORM_GUIDE.md` for email integration

## License

© 2024 Zaw Hein Aung. All rights reserved.
