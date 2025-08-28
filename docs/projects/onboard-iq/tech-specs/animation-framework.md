# Animation Framework Documentation

## Overview

The OnboardIQ Animation Framework provides a comprehensive, performance-optimized animation system built on CSS animations with JavaScript utilities. The framework follows accessibility best practices, respects user preferences, and integrates seamlessly with the existing component architecture.

## Core Features

- **Consistent timing functions and duration scales**
- **Hardware-accelerated animations for 60fps performance**  
- **Accessibility compliance with `prefers-reduced-motion` support**
- **Promise-based JavaScript API for animation sequencing**
- **Performance monitoring and debugging utilities**
- **Seamless integration with existing Pebble macros and components**

---

## CSS Animation Classes

### Duration Classes
Apply custom animation durations:
```css
.anim-fast       /* 150ms - Quick interactions */
.anim-normal     /* 300ms - Standard transitions */  
.anim-slow       /* 500ms - Deliberate animations */
.anim-extra-slow /* 700ms - Dramatic effects */
```

### Timing Function Classes  
Control animation easing:
```css
.anim-ease-in-out /* Smooth start and end */
.anim-ease-out    /* Quick start, smooth end */
.anim-ease-in     /* Smooth start, quick end */
.anim-bounce      /* Playful bounce effect */
.anim-sharp       /* Sharp, precise timing */
```

### Animation Delay Classes
Stagger animation timing:
```css
.anim-delay-short  /* 50ms delay */
.anim-delay-medium /* 100ms delay */
.anim-delay-long   /* 200ms delay */
```

---

## Animation Types

### Fade Animations
```css
.fade-in      /* Simple fade in */
.fade-out     /* Simple fade out */
.fade-in-up   /* Fade in with upward motion */
.fade-in-down /* Fade in with downward motion */
```

### Slide Animations
```css
.slide-in-right  /* Slide in from right */
.slide-in-left   /* Slide in from left */
.slide-in-up     /* Slide in from bottom */
.slide-in-down   /* Slide in from top */
.slide-out-right /* Slide out to right */
.slide-out-left  /* Slide out to left */
.slide-out-up    /* Slide out to top */
.slide-out-down  /* Slide out to bottom */
```

### Scale Animations
```css
.scale-in        /* Scale up with fade in */
.scale-out       /* Scale down with fade out */
.scale-bounce-in /* Scale in with bounce effect */
```

### Rotate Animations
```css
.rotate-in  /* Rotate in with fade */
.rotate-out /* Rotate out with fade */
```

### Utility Animations
```css
.pulse        /* Continuous pulse (normal speed) */
.pulse-slow   /* Slow pulse for emphasis */
.pulse-fast   /* Fast pulse for urgency */
.bounce-subtle /* Subtle bounce for interactions */
.bounce-in    /* Full bounce entrance */
.shake        /* Error indication shake */
.spin         /* Loading spinner */
.spin-slow    /* Slow spinning effect */
.wiggle       /* Playful wiggle effect */
.heartbeat    /* Heartbeat pulse pattern */
```

---

## JavaScript API

### AnimationManager

Core animation control system with Promise-based API:

```javascript
// Simple animation
AnimationManager.animate('.my-element', 'fade-in-up')
  .then($element => {
    console.log('Animation completed');
  });

// Custom timing options
AnimationManager.animate('.my-element', 'scale-in', {
  duration: 500,
  delay: 100
});

// Staggered animations
AnimationManager.staggerIn('.card', 'fade-in-up', 100);

// Animation chains
AnimationManager.chain([
  { element: '.header', animation: 'slide-in-down' },
  { element: '.content', animation: 'fade-in-up', options: { delay: 200 } },
  () => console.log('Sequence complete')
]);
```

### AnimationSequences

Pre-built animation patterns for common use cases:

```javascript
// Page load sequence
AnimationSequences.pageLoad();

// Card reveal animation
AnimationSequences.revealCards('.metric-card');

// Button feedback
AnimationSequences.buttonPress('#submit-btn');

// Form validation error
AnimationSequences.validationError('#email-field');

// Success indication
AnimationSequences.successPulse('.success-message');
```

### AnimationUtils

Utilities for conditional and safe animations:

```javascript
// Check user motion preference
if (!AnimationUtils.prefersReducedMotion()) {
  // Safe to use full animations
}

// Respect motion preferences
AnimationUtils.safeAnimate('.element', 'bounce-in');

// Viewport-based animations
AnimationUtils.animateOnView('.lazy-animate', 'fade-in-up');

// Toggle animations
AnimationUtils.toggle('.modal', 'scale-in', 'scale-out', isVisible);
```

### AnimationPerformance

Development performance monitoring:

```javascript
// Enable monitoring (automatic on localhost)
AnimationPerformance.enable();

// Measure animation performance
AnimationPerformance.measureAnimation('card-reveal', () => {
  return AnimationManager.staggerIn('.card', 'scale-in', 80);
});

// Get performance report
const report = AnimationPerformance.getReport();
console.log(report);
// {
//   totalAnimations: 15,
//   averageDuration: 285.4,
//   slowAnimations: 2,
//   metrics: [...]
// }
```

---

## Usage Examples

### Pebble Template Integration

Add animations directly in templates:

```html
<!-- Staggered button entrance -->
<div class="flex space-x-3">
  <button class="btn-base btn-primary fade-in-up anim-delay-short">
    Import CSV
  </button>
  <button class="btn-base btn-success fade-in-up anim-delay-medium">
    Add Contact
  </button>
</div>

<!-- Card grid with reveal animation -->
<div class="grid grid-cols-3 gap-6">
  {% for item in items %}
    <div class="card scale-in anim-delay-{{ loop.index0 * 100 }}ms">
      {{ card_content }}
    </div>
  {% endfor %}
</div>
```

### Interactive Form Animations

```javascript
// Form validation with animation feedback
$('#contact-form').on('submit', function(e) {
  const isValid = validateForm($(this));
  
  if (!isValid) {
    e.preventDefault();
    $('.form-field--error').each(function() {
      AnimationSequences.validationError(this);
    });
  } else {
    AnimationSequences.successPulse('.form-submit-btn');
  }
});

// Button loading state with animation
$('.btn-async').on('click', function() {
  const $btn = $(this);
  
  // Bounce feedback then loading state
  AnimationSequences.buttonPress($btn).then(() => {
    ButtonLoadingManager.setLoading($btn);
    
    // Simulate async operation
    setTimeout(() => {
      ButtonLoadingManager.clearLoading($btn);
      AnimationSequences.successPulse($btn);
    }, 2000);
  });
});
```

### Page Transition Animations

```javascript
// Page load with staggered content reveal
$(document).ready(function() {
  AnimationManager.chain([
    () => AnimationManager.animate('.page-header', 'slide-in-down'),
    () => AnimationManager.staggerIn('.metric-card', 'scale-in', 100),
    () => AnimationManager.staggerIn('.contact-card', 'fade-in-up', 50)
  ]);
});

// Modal entrance/exit
function showModal() {
  $('#modal').removeClass('hidden');
  AnimationManager.animate('#modal .modal-content', 'scale-in');
}

function hideModal() {
  AnimationManager.animate('#modal .modal-content', 'scale-out')
    .then(() => {
      $('#modal').addClass('hidden');
    });
}
```

---

## Performance Guidelines

### Best Practices

1. **Use transform and opacity** for animations when possible (hardware accelerated)
2. **Limit simultaneous animations** to maintain 60fps
3. **Respect `prefers-reduced-motion`** accessibility preference
4. **Use `will-change` sparingly** and remove after animation
5. **Test on target devices** to ensure performance goals

### CSS Variables

The framework uses CSS custom properties for consistent theming:

```css
:root {
  --anim-duration-fast: 150ms;
  --anim-duration-normal: 300ms;
  --anim-duration-slow: 500ms;
  --anim-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --anim-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### Accessibility

- All animations respect `prefers-reduced-motion: reduce`
- Essential state changes have static fallbacks
- Loading spinners continue at reduced speed for accessibility
- Focus states remain visible during animations

---

## Browser Support

The animation framework supports:
- Chrome 90+ ✅
- Firefox 88+ ✅  
- Safari 14+ ✅
- Edge 90+ ✅

Graceful degradation for older browsers with basic transitions only.

---

## Troubleshooting

### Common Issues

**Animations not working:**
- Check CSS class spelling and imports
- Verify elements are visible and not `display: none`
- Test without `prefers-reduced-motion` enabled

**Performance problems:**
- Enable `AnimationPerformance.enable()` for debugging
- Reduce concurrent animations
- Check for layout thrashing with DevTools

**Accessibility concerns:**
- Test with screen readers enabled
- Verify reduced motion preference is respected
- Ensure interactive elements remain accessible during animation

### Development Tools

```javascript
// Debug animation performance
AnimationPerformance.enable();

// Log all animation events
AnimationManager.animate = (function(originalAnimate) {
  return function(element, animationClass, options) {
    console.log(`Animating ${element} with ${animationClass}`);
    return originalAnimate.call(this, element, animationClass, options);
  };
})(AnimationManager.animate);
```

---

## Migration Guide

### From Previous Animation System

The framework maintains backward compatibility with existing animations:

```css
/* Old (still works) */
.fade-in { animation: fadeIn 0.3s ease-out; }

/* New (enhanced) */
.fade-in { animation: fadeIn var(--anim-duration-normal) var(--anim-ease-out); }
```

### Updating Existing Components

1. Replace hardcoded animation durations with CSS custom properties
2. Add animation classes to templates for enhanced effects
3. Use JavaScript API for complex animation sequences
4. Test with `prefers-reduced-motion` enabled

---

## Future Roadmap

- Scroll-triggered animations (Story 2.2)
- Component-specific micro-interactions (Story 2.3) 
- Loading state animations (Story 2.4)
- Contextual hover and focus effects (Story 2.5)

The animation framework provides the foundation for all Epic 2 stories, ensuring consistent, performant, and accessible animations throughout the OnboardIQ application.