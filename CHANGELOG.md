# Changelog

All notable changes to the Tayler.id Portfolio project.

## [2025-08-28] - Latest Updates

### Added
- ✅ **Special URL Bypass for Password Protection**
  - Added `?access=preview2025` URL parameter for direct access
  - Maintains password protection for main route
  - Easy to customize bypass key in `password-protection.tsx`

- ✅ **React App Demo Viewer Enhancements**
  - Complete browser chrome simulation with traffic lights
  - Device switching (desktop/tablet/mobile)
  - Server status monitoring
  - Interactive credentials modal
  - Features overlay highlighting

### Fixed
- 🐛 **Light Mode Text Visibility Issues**
  - Fixed white text on white backgrounds in floating cards
  - Updated FloatingCard component to use theme-aware backgrounds
  - Corrected hero section stats card backgrounds
  - Fixed about section floating badges text colors
  - Maintained white text for dark overlay contexts (Watch My Story)

- 🐛 **Netlify Deployment Configuration**
  - Updated Node.js version from 18 to 20 for compatibility
  - Fixed Next.js static export configuration
  - Added debugging output for build process verification
  - Resolved asset path issues in production

- 🐛 **Navigation and UX Improvements**
  - Added working scroll navigation to hero section buttons
  - Fixed z-index hierarchy for modal overlays
  - Improved skill badge layout and text fitting
  - Enhanced typography hierarchy and spacing

### Changed
- 🔄 **Component Theme Adaptation**
  - FloatingCard: `bg-white/10` → `bg-card/80`
  - Text colors: `text-white` → `text-foreground` (where appropriate)
  - Borders: `border-white/20` → `border-border`
  - Hero stats: Updated background and border classes

- 🔄 **Build Configuration**
  - Updated `next.config.js` for proper static export
  - Improved `netlify.toml` with Node 20 and debugging
  - Enhanced package.json scripts for deployment

## [Previous] - Initial Development

### Added
- ⭐ **Core Portfolio Structure**
  - Next.js 14 with App Router and TypeScript
  - Password protection system
  - Responsive design with Tailwind CSS
  - Framer Motion animations throughout

- ⭐ **Custom Animate UI Components**
  - FloatingCard with tilt and float animations
  - MagneticButton with hover effects
  - TypewriterText animation
  - GradientBlob backgrounds
  - ScrollReveal animations

- ⭐ **Portfolio Sections**
  - Hero section with animated stats
  - About section with personal story
  - Projects section with case studies
  - Skills showcase with interactive elements
  - Contact form and information

- ⭐ **Project Case Studies**
  - Detailed modal system for projects
  - Interactive project detail templates
  - UX/UI showcase components
  - Comprehensive project documentation

### Technical Features
- 🔧 **Development Setup**
  - TypeScript configuration
  - ESLint and code quality tools
  - Tailwind CSS with custom configuration
  - Framer Motion integration

- 🔧 **Deployment Pipeline**
  - Netlify static hosting
  - GitHub integration
  - Automated build process
  - Environment configuration

---

## Development Notes

### Breaking Changes
None in recent updates - all changes are backward compatible.

### Deprecations
- Removed deprecated `next export` command in favor of `output: 'export'` config
- Updated viewport metadata to use Next.js 14 recommended approach

### Migration Guide
No migration required for existing installations. Simply pull latest changes and rebuild.

### Known Issues
None currently tracked.

---

For detailed commit history, see Git log or GitHub repository.