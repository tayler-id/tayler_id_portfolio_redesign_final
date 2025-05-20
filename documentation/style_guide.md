# Style Guide for Tayler.id Portfolio Redesign

## Brand Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary | `#ff4d5a` | Call-to-action buttons, highlights, accent elements |
| Secondary | `#00e5ff` | Secondary accents, gradients, interactive elements |
| Background | `#0a0a0a` | Main background color |
| Text | `#ffffff` | Primary text color |
| Dark | `#121212` | Secondary background, cards, panels |
| Light | `#f5f5f5` | Text on dark backgrounds, subtle highlights |

## Typography

### Fonts

- **Primary Font**: Space Grotesk
  - Used for: Headings, navigation, buttons, and important UI elements
  - Weights: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)

- **Secondary Font**: Inter
  - Used for: Body text, paragraphs, and smaller UI elements
  - Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold)

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|------------|
| Hero Title | `clamp(3rem, 8vw, 6rem)` | 700 | 1.2 |
| H1 | `3rem` | 700 | 1.2 |
| H2 | `2.5rem` | 700 | 1.2 |
| H3 | `2rem` | 600 | 1.3 |
| H4 | `1.5rem` | 600 | 1.3 |
| Body | `1rem` | 400 | 1.6 |
| Small | `0.875rem` | 400 | 1.5 |

## Animation

### Transitions

- **Default Easing**: `cubic-bezier(0.65, 0, 0.35, 1)`
- **Default Duration**: `0.3s` for UI elements, `0.8s` for page transitions
- **Hover Effects**: Scale transforms (1.05x) with subtle shadow increases

### 3D Particle Avatar

- **Particle Count**: 15,000
- **Particle Size**: 2px (base size, varies slightly)
- **Color Gradient**: Primary to Secondary color
- **Animation Speed**: Smooth, fluid motion with 0.02 interpolation factor
- **Interaction**: Responds to mouse movement with 0.05 smoothing factor

## UI Components

### Buttons

- **Primary Button**:
  - Background: Linear gradient from Primary to Secondary
  - Text: White
  - Padding: 1rem 2rem
  - Border Radius: 50px
  - Hover: Subtle scale (1.05x) with inner highlight

- **Secondary Button**:
  - Background: Transparent
  - Border: 2px solid Primary color
  - Text: Primary color
  - Padding: 1rem 2rem
  - Border Radius: 50px
  - Hover: Subtle scale (1.05x) with inner highlight

### Navigation

- **Desktop**: Horizontal menu with underline hover effect
- **Mobile**: Hamburger menu with slide-in animation
- **Active State**: Gradient underline

### AI Assistant

- **Toggle Button**:
  - Size: 60px diameter
  - Background: Gradient from Primary to Secondary
  - Position: Fixed bottom-right
  - Hover: Scale up (1.1x)

- **Chat Panel**:
  - Width: 350px (desktop), 100% - 4rem (mobile)
  - Height: 500px
  - Background: Dark color
  - Border Radius: 16px
  - Shadow: 0 10px 30px rgba(0, 0, 0, 0.5)

- **Messages**:
  - User: Primary color background, white text, right-aligned
  - Assistant: Light background (10% white), left-aligned
  - Border Radius: 16px with 4px on bottom-right/left

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Animation Guidelines

1. **Loading Animations**:
   - Smooth fade-ins with staggered timing
   - Progress indicators should use the Primary to Secondary gradient

2. **Scroll Animations**:
   - Elements should fade and slide in from bottom or sides
   - Parallax effects for depth on background elements
   - Trigger point: When element is 20% in viewport

3. **Hover States**:
   - Subtle scale transforms (1.05x - 1.1x)
   - Color shifts using the defined palette
   - Transition duration: 0.3s

4. **Page Transitions**:
   - Smooth fade between pages
   - Content slides in from bottom
   - Duration: 0.8s

5. **3D Particle Effects**:
   - Respond to user interaction (mouse/touch)
   - Morph between states with fluid animation
   - Maintain performance with optimized rendering

## Accessibility Guidelines

- **Color Contrast**: Maintain minimum 4.5:1 contrast ratio for text
- **Focus States**: Visible focus indicators for keyboard navigation
- **Text Size**: Minimum 16px for body text
- **Interactive Elements**: Minimum touch target size of 44x44px
- **Animation**: Provide reduced motion option for vestibular disorders

## Code Standards

- **CSS**: Use CSS variables for colors, spacing, and typography
- **JavaScript**: Follow modern ES6+ standards
- **Animation**: Use requestAnimationFrame for smooth animations
- **Performance**: Optimize for 60fps, avoid layout thrashing
- **Responsive**: Mobile-first approach with progressive enhancement
