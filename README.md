# Tayler.id Portfolio - Next.js 14 with Animate UI

Modern portfolio website built with Next.js 14, TypeScript, and custom Animate UI components. Features password protection, React app demos, and responsive design.

## 🚀 Features

- **Next.js 14** with App Router and TypeScript
- **Password Protection** with special URL bypass
- **Interactive React App Demo Viewer** with browser chrome simulation
- **Responsive Design** with Tailwind CSS and Framer Motion
- **Theme Support** - Light/Dark mode with proper text contrast
- **Floating UI Components** with 3D animations and hover effects
- **Project Case Studies** with detailed modals
- **Static Export** for Netlify deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.32
- **Language**: TypeScript 5.2.0
- **Styling**: Tailwind CSS 3.3.0
- **Animation**: Framer Motion 10.16.0
- **Icons**: Lucide React 0.292.0
- **Deployment**: Netlify (Static Export)
- **Node Version**: 20.x

## 🏃‍♂️ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔐 Password Protection

### Default Access
- Main site: `https://yoursite.com` → Password required
- Password: `portfolio2025`

### Bypass Access
- Special URL: `https://yoursite.com?access=preview2025` → Direct access
- Bypass key can be changed in `components/password-protection.tsx`

### Toggle Protection
Change `enablePasswordProtection` in `app/layout.tsx` to disable entirely.

## 🎨 Key Components

### Animate UI Components
- **FloatingCard**: Animated cards with tilt and float effects
- **MagneticButton**: Buttons with magnetic hover animation
- **TypewriterText**: Typewriter animation for text
- **GradientBlob**: Animated gradient backgrounds
- **ScrollReveal**: Scroll-triggered animations

### Core Sections
- **Hero Section**: Animated introduction with floating stats
- **About Section**: Personal story with floating badges
- **Projects Section**: Portfolio with case study modals
- **Skills Section**: Technical expertise showcase
- **Contact Section**: Contact form and information

### Special Features
- **React App Demo Viewer**: Full browser chrome with device switching
- **Project Case Study Modals**: Detailed project breakdowns
- **Password Protection**: Secure access with bypass option

## 🎯 React App Demo Viewer

Interactive demo viewer with:
- **Browser Chrome**: Traffic lights, address bar, system tray
- **Device Switching**: Desktop, tablet, mobile viewports
- **Server Status**: Live/offline monitoring
- **Credentials Modal**: Demo login information
- **Features Overlay**: Highlighted functionality

Usage:
```typescript
<ReactAppDemoTemplate 
  demoConfig={{
    title: "OnboardIQ Platform",
    url: "https://demo.onboardiq.com",
    // ... configuration
  }}
/>
```

## 🚀 Deployment

### Netlify Configuration
The project is configured for Netlify deployment with static export:

```toml
# netlify.toml
[build]
  publish = "out"
  command = "npm ci && npm run build"
  
[build.environment]
  NODE_VERSION = "20"
```

### Build Process
1. **Static Export**: Next.js generates static files to `/out`
2. **Asset Copying**: Public assets copied to `/out/assets`
3. **Deployment**: Netlify serves from `/out` directory

### Environment Variables
- `NODE_ENV=production` for production builds
- No additional environment variables required

## 🎨 Theme System

### Light/Dark Mode Support
All components properly adapt between themes:

```css
/* Theme-aware classes */
text-foreground     /* Adapts to theme */
text-muted-foreground  /* Muted text */
bg-card/80         /* Card backgrounds */
border-border      /* Border colors */
```

### Common Issues Fixed
- ✅ White text on white backgrounds in light mode
- ✅ Floating card visibility across themes
- ✅ Proper contrast ratios maintained
- ✅ Icons and overlays with correct colors

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Key Features
- Mobile-first design approach
- Touch-friendly interactions
- Responsive typography scaling
- Adaptive layouts for all screen sizes

## 🔧 Development

### File Structure
```
├── app/                 # Next.js App Router
├── components/         # React components
│   ├── animate-ui/    # Custom animation components  
│   ├── ui/           # Base UI components
│   └── *.tsx         # Page sections
├── lib/               # Utilities
├── public/           # Static assets
├── styles/           # Global styles
└── types/            # TypeScript definitions
```

### Adding New Components
1. Create in appropriate `/components` subfolder
2. Follow existing naming conventions
3. Ensure theme compatibility
4. Add proper TypeScript types

### Custom Animations
Built on Framer Motion with consistent patterns:

```typescript
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.div variants={fadeIn}>Content</motion.div>
```

## 🐛 Troubleshooting

### Common Issues

**Assets not loading in production:**
- Check `/out/assets` directory exists after build
- Verify asset paths start with `/assets/` not `./assets/`
- Ensure `next.config.js` has correct static export settings

**White text visibility in light mode:**
- Use `text-foreground` for adaptive text
- Keep `text-white` only for dark overlays
- Check FloatingCard backgrounds use `bg-card/80`

**Password protection not working:**
- Verify localStorage is accessible
- Check browser console for errors
- Ensure bypass URL format: `?access=preview2025`

### Development Server Issues
```bash
# Clear Next.js cache
rm -rf .next

# Restart development server
npm run dev

# Check for port conflicts
lsof -ti:3000 | xargs kill -9
```

## 📊 Performance

### Optimization Features
- **Static Generation**: Pre-built HTML for fast loading
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **Font Optimization**: Google Fonts with Next.js font loading

### Bundle Analysis
```bash
# Analyze bundle size
npm run build && npx @next/bundle-analyzer
```

## 🔄 Recent Updates

- ✅ Fixed light mode text visibility issues
- ✅ Added special URL bypass for password protection  
- ✅ Improved React App Demo Viewer functionality
- ✅ Enhanced floating card theme adaptation
- ✅ Optimized Netlify deployment configuration
- ✅ Updated Node.js version to 20 for compatibility

## 📞 Support

For issues or questions:
1. Check this documentation first
2. Review component code for implementation details
3. Test in both development and production environments
4. Verify all dependencies are up to date

## 📄 License

Private project - All rights reserved.

---

Built with ❤️ using Next.js 14, TypeScript, and modern web technologies.