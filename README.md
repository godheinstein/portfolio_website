# Zaw Hein Aung - Robotics Engineer Portfolio

A modern, immersive portfolio website showcasing robotics engineering expertise with 3D animations, interactive elements, and engineering-inspired aesthetics.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## ✨ Features

- **3D Mecanum Wheel** - Interactive Three.js model with scroll-based rotation
- **Isometric View** - 45° camera angle for professional CAD-like presentation
- **Icon-Based Skills Grid** - Hover animations with glow effects
- **11 Project Showcase** - Robotics and AI projects with corner navigation buttons
- **Contact Form** - Integrated form with social links
- **Engineering Aesthetics** - Blueprint patterns, circuit paths, mechanical borders
- **Fully Responsive** - Optimized for mobile, tablet, and desktop

## 📋 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)

## 📦 Installation

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for detailed step-by-step instructions.

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite 5 (build tool)
- Tailwind CSS 4 (styling)
- Three.js + React Three Fiber (3D graphics)
- Framer Motion (animations)
- Radix UI (accessible components)
- Lucide React (icons)

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at http://localhost:5173 |
| `npm run build` | Build for production (output to `/dist`) |
| `npm run preview` | Preview production build locally |

## 🎨 Customization

### Update Personal Info

1. **Social Links**: Edit `src/components/ContactSection.tsx`
2. **Project Links**: Edit `src/components/ProjectsSection.tsx`
3. **Resume**: Place PDF at `public/assets/resume.pdf`

### Change Colors

Edit `src/index.css`:
```css
@theme inline {
  --primary: 210 100% 50%;      /* Blue accent */
  --background: 222 47% 11%;    /* Dark background */
}
```

## 🚢 Deployment

### GitHub Pages

```bash
npm run build
cd dist
git init
git add .
git commit -m "Deploy"
git remote add origin https://github.com/godheinstein/godheinstein.github.io.git
git push -f origin main
```

Configure in GitHub: Settings → Pages → Source: main branch, root folder

Your site: **https://godheinstein.github.io**

### Other Platforms

- **Netlify**: Drag & drop `dist/` folder
- **Vercel**: `npm install -g vercel && vercel --prod`

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup instructions
- **[MECANUM_WHEEL_GUIDE.md](./MECANUM_WHEEL_GUIDE.md)** - Edit the 3D wheel model
- **[CONTACT_FORM_GUIDE.md](./CONTACT_FORM_GUIDE.md)** - Email integration

## 🐛 Troubleshooting

**Port already in use?**
```bash
npx kill-port 5173
```

**Dependencies fail?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**3D wheel not showing?**
- Ensure WebGL is supported
- Try Chrome, Firefox, or Edge
- Check browser console (F12)

## 📄 License

© 2024 Zaw Hein Aung. All rights reserved.

---

Built with ❤️ using React, Three.js, and modern web technologies.
