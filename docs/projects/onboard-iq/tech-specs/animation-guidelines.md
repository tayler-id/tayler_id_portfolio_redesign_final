# Animation Development Guidelines

## OnboardIQ Animation Framework Development Standards

This document provides team guidelines for consistent animation application across the OnboardIQ application.

---

## Animation Philosophy

### Core Principles

1. **Purposeful**: Every animation should serve a clear UX purpose
2. **Consistent**: Use the same animation patterns for similar interactions
3. **Performant**: Maintain 60fps and respect user preferences
4. **Accessible**: Always provide reduced-motion alternatives

### When to Use Animations

**✅ Use animations for:**
- **Feedback**: Confirming user actions (button clicks, form submissions)
- **Guidance**: Directing user attention to important elements
- **Transitions**: Smoothing state changes and page navigation
- **Loading**: Indicating progress and system status
- **Hierarchy**: Revealing content in logical order

**❌ Avoid animations for:**
- Pure decoration without UX purpose
- Essential information that must be immediately visible
- Repeated actions that become annoying
- Complex sequences that slow down workflows

---

## Animation Classification System

### Entrance Animations
**When to use**: Page load, content reveal, new element appearance

```css
/* Gentle content reveal */
.fade-in-up        /* Primary choice for most content */
.fade-in           /* Simple fade for subtle reveals */
.scale-in          /* Cards and important elements */

/* Dynamic content arrival */
.slide-in-right    /* Navigation, sidebars */
.slide-in-down     /* Headers, notifications */
.bounce-in         /* Success states, celebrations */
```

### Exit Animations  
**When to use**: Element removal, navigation away, dismissing content

```css
/* Gentle content removal */
.fade-out          /* Standard fade for most exits */
.scale-out         /* Cards, modal dismissals */

/* Directional exits */
.slide-out-left    /* Navigation, dismissing panels */
.slide-out-up      /* Notifications, alerts */
```

### Feedback Animations
**When to use**: User interaction confirmation, state changes

```css
/* Interaction feedback */
.bounce-subtle     /* Button clicks, selections */
.pulse             /* Loading states, emphasis */
.shake             /* Error states, validation failures */

/* State transitions */
.wiggle            /* Playful confirmations */
.heartbeat         /* Favorites, likes */
```

### Utility Animations
**When to use**: Loading states, ongoing processes

```css
/* Loading indicators */
.spin              /* Progress spinners */
.pulse-slow        /* Skeleton loading */
.pulse-fast        /* Urgent loading states */
```

---

## Animation Timing Guidelines

### Duration Standards

```css
/* Standard durations - use CSS custom properties */
--anim-duration-fast: 150ms;      /* Quick feedback, micro-interactions */
--anim-duration-normal: 300ms;    /* Standard transitions, most animations */
--anim-duration-slow: 500ms;      /* Deliberate animations, important changes */
--anim-duration-extra-slow: 700ms; /* Loading states, dramatic effects */
```

### Timing Function Selection

```css
/* Easing guidelines */
--anim-ease-out:    /* Best for entrances, user-initiated actions */
--anim-ease-in:     /* Best for exits, system-initiated actions */  
--anim-ease-in-out: /* Best for transitions, loops */
--anim-bounce:      /* Playful feedback, success states */
--anim-sharp:       /* Precise interactions, professional feel */
```

### Staggering Rules

```css
/* Stagger delays for multiple elements */
anim-delay-short:  50ms;   /* Subtle sequence, 3-5 elements */
anim-delay-medium: 100ms;  /* Standard sequence, 5-8 elements */
anim-delay-long:   200ms;  /* Dramatic sequence, emphasis */
```

---

## Component-Specific Guidelines

### Buttons

**Standard Pattern:**
```html
<!-- Default button behavior -->
<button class="btn-base btn-primary" onclick="buttonFeedback(this)">
  Save Changes
</button>

<script>
function buttonFeedback(btn) {
  AnimationManager.animate(btn, 'bounce-subtle');
}
</script>
```

**Loading States:**
```html
<!-- Button with loading animation -->
<button class="btn-base btn-primary" onclick="submitWithLoading(this)">
  <span class="btn-text">Submit</span>
</button>

<script>
function submitWithLoading(btn) {
  ButtonLoadingManager.setLoading($(btn));
  // ... async operation ...
  ButtonLoadingManager.clearLoading($(btn));
}
</script>
```

### Cards and Panels

**Entrance Pattern:**
```html
<!-- Staggered card reveal -->
<div class="cards-container">
  <div class="card scale-in anim-delay-short">Card 1</div>
  <div class="card scale-in anim-delay-medium">Card 2</div>
  <div class="card scale-in anim-delay-long">Card 3</div>
</div>
```

**Hover Pattern:**
```css
/* Subtle hover enhancement */
.card {
  transition: transform var(--anim-duration-fast) var(--anim-ease-out);
}

.card:hover {
  transform: translateY(-2px) scale(1.02);
}
```

### Forms

**Field Focus:**
```html
<input class="form-input" 
       onfocus="fieldFocus(this)" 
       onblur="fieldBlur(this)">

<script>
function fieldFocus(input) {
  $(input).addClass('form-input--focus');
  AnimationManager.animate(input, 'scale-102');
}
</script>
```

**Validation Errors:**
```html
<div class="form-field">
  <input type="email" id="email">
  <div class="form-error">Invalid email format</div>
</div>

<script>
function showValidationError(fieldId) {
  const $error = $(`#${fieldId}`).siblings('.form-error');
  $error.removeClass('hidden');
  AnimationManager.animate($error, 'shake');
}
</script>
```

### Modals and Dialogs

**Standard Modal Pattern:**
```html
<div class="modal" id="modal">
  <div class="modal-backdrop"></div>
  <div class="modal-content scale-in">
    <!-- modal content -->
  </div>
</div>

<script>
function showModal() {
  $('#modal').removeClass('hidden');
  AnimationManager.animate('.modal-content', 'scale-in');
}

function hideModal() {
  AnimationManager.animate('.modal-content', 'scale-out').then(() => {
    $('#modal').addClass('hidden');
  });
}
</script>
```

### Navigation

**Menu Items:**
```html
<nav class="nav-menu">
  <a href="#" class="nav-item slide-in-right anim-delay-short">Home</a>
  <a href="#" class="nav-item slide-in-right anim-delay-medium">Contacts</a>
  <a href="#" class="nav-item slide-in-right anim-delay-long">Analytics</a>
</nav>
```

**Active State Feedback:**
```javascript
$('.nav-item').on('click', function() {
  $('.nav-item').removeClass('active');
  $(this).addClass('active');
  AnimationManager.animate(this, 'bounce-subtle');
});
```

---

## Development Workflow

### 1. Planning Animations

**Before implementing:**
- Identify the UX purpose of each animation
- Check if similar patterns exist in the codebase
- Consider performance impact on target devices
- Plan for reduced-motion users

### 2. Implementation Checklist

```markdown
- [ ] Uses standard CSS custom properties for timing
- [ ] Respects prefers-reduced-motion preference  
- [ ] Provides fallback for essential state changes
- [ ] Tested on target devices for 60fps performance
- [ ] Follows established pattern for similar interactions
- [ ] Includes proper ARIA labels where needed
```

### 3. Code Review Guidelines

**Animation code reviews should check:**
- Consistent timing across similar interactions
- Proper use of hardware-accelerated properties (`transform`, `opacity`)
- Accessibility considerations implemented
- No unnecessary animations that slow down workflows
- Performance impact documented if complex

### 4. Testing Requirements

**Manual Testing:**
```markdown
- [ ] Enable reduced motion preference and verify fallbacks
- [ ] Test on slowest target device for performance
- [ ] Verify animations don't interfere with screen readers
- [ ] Check animation timing feels natural for the interaction
- [ ] Test with keyboard navigation
```

**Performance Testing:**
```javascript
// Enable performance monitoring in development
AnimationPerformance.enable();

// Test animation performance
AnimationPerformance.measureAnimation('card-reveal', () => {
  return AnimationManager.staggerIn('.card', 'scale-in', 100);
});

// Review performance report
console.log(AnimationPerformance.getReport());
```

---

## Team Standards

### CSS Organization

**File Structure:**
```
src/main/resources/static/css/
├── utilities/
│   └── animations.css          # Core animation framework
├── components/
│   ├── buttons.css            # Button-specific animations
│   ├── cards.css              # Card hover and reveal animations
│   └── forms.css              # Form interaction animations
```

**Naming Conventions:**
```css
/* Animation utility classes follow pattern: */
.{action}-{direction}-{modifier}

/* Examples: */
.fade-in-up                    /* Action: fade, Direction: in-up */
.slide-out-right              /* Action: slide, Direction: out-right */
.scale-in                     /* Action: scale, Direction: in */
.bounce-subtle                /* Action: bounce, Modifier: subtle */
```

### JavaScript Standards

**Animation Functions:**
```javascript
// Use descriptive function names
function buttonClickFeedback(element) { /* ... */ }
function cardHoverAnimation(element) { /* ... */ }
function modalEntranceSequence() { /* ... */ }

// Always handle reduced motion
function safeAnimate(element, animation) {
  if (!AnimationUtils.prefersReducedMotion()) {
    return AnimationManager.animate(element, animation);
  }
  return Promise.resolve();
}
```

**Promise Handling:**
```javascript
// Always handle animation completion
AnimationManager.animate('.modal', 'scale-out')
  .then(() => {
    // Clean up after animation
    $('.modal').addClass('hidden');
  })
  .catch((error) => {
    console.warn('Animation failed:', error);
    // Provide fallback behavior
  });
```

### Documentation Standards

**Comment Requirements:**
```css
/* Animation purpose and context required */
.card-entrance {
  /* Used for: Card reveal on dashboard load */
  /* Context: Staggered with 100ms delays */
  animation: scale-in var(--anim-duration-normal) var(--anim-ease-out);
}
```

```javascript
/**
 * Animates form submission feedback
 * @param {HTMLElement} form - Form element being submitted
 * @param {Function} callback - Called after animation completes
 * @returns {Promise} Animation completion promise
 */
function animateFormSubmission(form, callback) {
  // Implementation
}
```

---

## Performance Guidelines

### Hardware Acceleration

**Preferred Properties:**
```css
/* Use these properties for best performance */
transform: translateX() translateY() scale() rotate();
opacity: 0 to 1;
filter: blur() brightness();
```

**Avoid These Properties:**
```css
/* These cause layout/paint - use sparingly */
width, height, top, left, margin, padding;
background-color (use opacity on overlay instead);
box-shadow (use transform: translateZ() for depth);
```

### Performance Budget

**Animation Limits:**
- Maximum 5 simultaneous animations on mobile
- Maximum 10 simultaneous animations on desktop  
- Animation duration < 500ms for interactions
- Stagger delays < 200ms for sequences

**Monitoring:**
```javascript
// Set performance budget alerts
AnimationPerformance.setBudget({
  maxDuration: 500,
  maxConcurrent: 5,
  fpsThreshold: 55
});
```

---

## Accessibility Requirements

### Reduced Motion Compliance

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all non-essential animations */
  .fade-in, .scale-in, .bounce-subtle {
    animation: none !important;
  }
  
  /* Provide instant state changes */
  .fade-in { opacity: 1 !important; }
  .scale-in { transform: scale(1) !important; }
}
```

**JavaScript Handling:**
```javascript
function respectMotionPreference(element, animation) {
  if (AnimationUtils.prefersReducedMotion()) {
    // Provide immediate state change
    $(element).addClass('final-state');
    return Promise.resolve();
  } else {
    return AnimationManager.animate(element, animation);
  }
}
```

### Screen Reader Compatibility

**ARIA Labels:**
```html
<!-- Loading state with screen reader support -->
<button class="btn-base btn-primary" 
        aria-busy="false" 
        onclick="submitWithLoading(this)">
  <span class="btn-text">Submit</span>
  <span class="sr-only loading-text" aria-live="polite"></span>
</button>

<script>
function submitWithLoading(btn) {
  $(btn).attr('aria-busy', 'true');
  $(btn).find('.loading-text').text('Submitting...');
  // ... animation and submission logic ...
}
</script>
```

---

## Common Patterns Library

### Page Load Sequence
```javascript
const PAGE_LOAD_SEQUENCE = [
  { element: '.page-header', animation: 'slide-in-down' },
  { element: '.nav-menu', animation: 'fade-in', options: { delay: 100 } },
  () => AnimationManager.staggerIn('.content-card', 'scale-in', 80)
];

$(document).ready(() => {
  AnimationManager.chain(PAGE_LOAD_SEQUENCE);
});
```

### Form Validation Pattern
```javascript
function validateFieldWithAnimation(fieldId, isValid, message) {
  const $field = $(`#${fieldId}`);
  const $error = $field.siblings('.form-error');
  
  if (!isValid) {
    $error.text(message).removeClass('hidden');
    AnimationManager.animate($field, 'shake');
  } else {
    $error.addClass('hidden');
    AnimationManager.animate($field, 'pulse');
  }
}
```

### Success Confirmation Pattern
```javascript
function showSuccessMessage(message, element) {
  const $success = $(`
    <div class="success-message fade-in-up">
      <i class="success-icon pulse">✓</i>
      <span>${message}</span>
    </div>
  `);
  
  $(element).append($success);
  
  setTimeout(() => {
    AnimationManager.animate($success, 'fade-out').then(() => {
      $success.remove();
    });
  }, 3000);
}
```

---

## Migration and Adoption

### Existing Code Migration

**Step 1: Audit existing animations**
```bash
# Find existing animation usage
grep -r "animate\|transition" src/main/resources/static/
grep -r "@keyframes" src/main/resources/static/css/
```

**Step 2: Replace with framework classes**
```css
/* Before */
.old-fade {
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* After */
.new-fade {
  /* Use framework class instead */
  @extend .fade-in;
}
```

### Team Training Checklist

```markdown
- [ ] Review animation philosophy and guidelines
- [ ] Practice using CSS custom properties for timing
- [ ] Learn JavaScript API for complex sequences  
- [ ] Understand accessibility requirements
- [ ] Set up development performance monitoring
```

---

## Troubleshooting

### Common Issues

**Problem**: Animation feels too fast/slow
**Solution**: Use CSS custom properties and standard timing scale

**Problem**: Animations causing performance issues  
**Solution**: Enable performance monitoring, check concurrent animation count

**Problem**: Animations not working for some users
**Solution**: Check `prefers-reduced-motion` implementation

**Problem**: Screen reader compatibility issues
**Solution**: Add proper ARIA labels and live regions

### Debug Tools

```javascript
// Enable debug mode
AnimationPerformance.enable();
AnimationManager.debugMode = true;

// Performance analysis
console.log(AnimationPerformance.getReport());

// Animation timing analysis  
AnimationPerformance.measureAnimation('test', () => {
  return AnimationManager.animate('.element', 'fade-in');
});
```

This comprehensive guideline ensures consistent, performant, and accessible animations across the OnboardIQ application while providing clear standards for the development team.