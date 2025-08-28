# Animation Framework Examples

## Component-Specific Animation Examples

This document provides practical examples of how to apply the OnboardIQ Animation Framework across different component types and contexts.

---

## Button Animations

### Basic Button Interactions
```html
<!-- Standard button with hover bounce -->
<button class="btn-base btn-primary bounce-subtle-on-hover">
  Save Changes
</button>

<!-- Loading button with spin animation -->
<button class="btn-base btn-secondary" id="submit-btn">
  <span class="btn-text">Submit</span>
  <span class="spinner spin hidden"></span>
</button>

<script>
// Add loading state with animation
$('#submit-btn').on('click', function() {
  const $btn = $(this);
  $btn.find('.btn-text').addClass('fade-out');
  $btn.find('.spinner').removeClass('hidden').addClass('fade-in');
});
</script>
```

### Button Groups with Staggered Entrance
```html
<!-- Staggered button appearance -->
<div class="btn-group">
  <button class="btn-base btn-primary fade-in-up anim-delay-short">Import</button>
  <button class="btn-base btn-secondary fade-in-up anim-delay-medium">Export</button>
  <button class="btn-base btn-tertiary fade-in-up anim-delay-long">Cancel</button>
</div>
```

---

## Card Animations

### Status Card Entrance Animations
```html
<!-- Metrics dashboard with staggered card reveal -->
<div class="metrics-grid">
  <div class="status-card scale-in anim-delay-short">
    <h3>Total Contacts</h3>
    <div class="metric-value">247</div>
  </div>
  <div class="status-card scale-in anim-delay-medium">
    <h3>Active Projects</h3>
    <div class="metric-value">12</div>
  </div>
  <div class="status-card scale-in anim-delay-long">
    <h3>Success Rate</h3>
    <div class="metric-value">94%</div>
  </div>
</div>

<script>
// JavaScript alternative for dynamic card loading
AnimationManager.staggerIn('.status-card', 'scale-in', 100);
</script>
```

### Contact Card Hover Animations
```html
<!-- Contact cards with hover effects -->
<div class="contact-card" onmouseenter="cardHoverIn(this)" onmouseleave="cardHoverOut(this)">
  <div class="card-content">
    <h4>John Smith</h4>
    <p>Technical Lead</p>
  </div>
  <div class="card-actions fade-in-up" style="opacity: 0;">
    <button class="btn-sm btn-primary">Edit</button>
    <button class="btn-sm btn-secondary">View</button>
  </div>
</div>

<script>
function cardHoverIn(card) {
  $(card).addClass('scale-105');
  $(card).find('.card-actions').removeClass('fade-out').addClass('fade-in-up');
}

function cardHoverOut(card) {
  $(card).removeClass('scale-105');
  $(card).find('.card-actions').removeClass('fade-in-up').addClass('fade-out');
}
</script>
```

---

## Form Animations

### Form Field Focus and Error States
```html
<div class="form-field">
  <label for="email">Email Address</label>
  <input 
    type="email" 
    id="email" 
    class="form-input"
    onfocus="fieldFocusAnimation(this)"
    onblur="fieldBlurAnimation(this)"
  >
  <div class="form-error shake hidden">Invalid email format</div>
</div>

<script>
function fieldFocusAnimation(input) {
  $(input).addClass('scale-102 shadow-focus');
}

function fieldBlurAnimation(input) {
  $(input).removeClass('scale-102 shadow-focus');
}

// Show validation error with shake
function showFieldError(fieldId, message) {
  const $error = $(`#${fieldId}`).siblings('.form-error');
  $error.text(message).removeClass('hidden').addClass('shake');
  
  setTimeout(() => {
    $error.removeClass('shake');
  }, 600);
}
</script>
```

### Form Submission with Loading States
```html
<form id="contact-form" onsubmit="submitWithAnimation(event)">
  <div class="form-fields fade-in-up">
    <!-- form fields -->
  </div>
  
  <div class="form-actions">
    <button type="submit" class="btn-base btn-primary">
      <span class="btn-text">Save Contact</span>
      <div class="btn-loading-spinner spin hidden">⟳</div>
    </button>
  </div>
  
  <div class="form-success scale-in hidden">
    <i class="success-icon pulse-slow">✓</i>
    <p>Contact saved successfully!</p>
  </div>
</form>

<script>
function submitWithAnimation(event) {
  event.preventDefault();
  const $form = $(event.target);
  const $btn = $form.find('button[type="submit"]');
  
  // Show loading animation
  AnimationManager.animate($btn, 'bounce-subtle').then(() => {
    $btn.find('.btn-text').addClass('fade-out');
    $btn.find('.btn-loading-spinner').removeClass('hidden').addClass('fade-in');
    
    // Simulate form submission
    setTimeout(() => {
      // Hide loading, show success
      $btn.find('.btn-loading-spinner').addClass('fade-out');
      $form.find('.form-success').removeClass('hidden').addClass('scale-in');
      AnimationManager.animate('.success-icon', 'pulse-slow');
    }, 2000);
  });
}
</script>
```

---

## Modal and Dialog Animations

### Modal Entrance and Exit
```html
<div id="contact-modal" class="modal hidden">
  <div class="modal-backdrop" onclick="closeModal()"></div>
  <div class="modal-content scale-in">
    <div class="modal-header slide-in-down">
      <h3>Contact Details</h3>
      <button class="btn-icon rotate-in" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body fade-in-up anim-delay-short">
      <!-- modal content -->
    </div>
  </div>
</div>

<script>
function showModal() {
  const $modal = $('#contact-modal');
  $modal.removeClass('hidden');
  
  AnimationManager.chain([
    { element: '.modal-content', animation: 'scale-in' },
    { element: '.modal-header', animation: 'slide-in-down', options: { delay: 100 } },
    { element: '.modal-body', animation: 'fade-in-up', options: { delay: 200 } }
  ]);
}

function closeModal() {
  AnimationManager.animate('.modal-content', 'scale-out').then(() => {
    $('#contact-modal').addClass('hidden');
  });
}
</script>
```

---

## Navigation Animations

### Sidebar Navigation
```html
<nav class="sidebar">
  <div class="nav-header fade-in-down">
    <h2>OnboardIQ</h2>
  </div>
  
  <ul class="nav-menu">
    <li class="nav-item slide-in-right anim-delay-short">
      <a href="/home">Home</a>
    </li>
    <li class="nav-item slide-in-right anim-delay-medium">
      <a href="/contacts">Contacts</a>
    </li>
    <li class="nav-item slide-in-right anim-delay-long">
      <a href="/analytics">Analytics</a>
    </li>
  </ul>
</nav>

<script>
// Dynamic navigation item highlighting
$('.nav-item a').on('click', function() {
  const $item = $(this).parent();
  $('.nav-item').removeClass('active');
  $item.addClass('active');
  AnimationManager.animate($item, 'bounce-subtle');
});
</script>
```

### Dropdown Menu Animations
```html
<div class="dropdown">
  <button class="dropdown-trigger" onclick="toggleDropdown(this)">
    Options
    <span class="dropdown-arrow">▼</span>
  </button>
  
  <div class="dropdown-menu slide-out-up hidden">
    <a href="#" class="dropdown-item fade-in-up anim-delay-short">Edit</a>
    <a href="#" class="dropdown-item fade-in-up anim-delay-medium">Duplicate</a>
    <a href="#" class="dropdown-item fade-in-up anim-delay-long">Delete</a>
  </div>
</div>

<script>
function toggleDropdown(trigger) {
  const $menu = $(trigger).siblings('.dropdown-menu');
  const $arrow = $(trigger).find('.dropdown-arrow');
  
  if ($menu.hasClass('hidden')) {
    $menu.removeClass('hidden slide-out-up').addClass('slide-in-down');
    AnimationManager.animate($arrow, 'rotate-180');
    AnimationManager.staggerIn('.dropdown-item', 'fade-in-up', 50);
  } else {
    AnimationManager.animate($menu, 'slide-out-up').then(() => {
      $menu.addClass('hidden');
    });
    AnimationManager.animate($arrow, 'rotate-0');
  }
}
</script>
```

---

## Data Loading and Progress Animations

### Loading Skeletons
```html
<div class="data-container" id="contacts-container">
  <!-- Loading state -->
  <div class="loading-skeleton pulse">
    <div class="skeleton-card">
      <div class="skeleton-text skeleton-title"></div>
      <div class="skeleton-text skeleton-subtitle"></div>
      <div class="skeleton-text skeleton-content"></div>
    </div>
  </div>
</div>

<script>
function loadContactData() {
  const $container = $('#contacts-container');
  
  // Show loading skeleton
  $container.html(`
    <div class="loading-skeleton pulse">
      <div class="skeleton-card">
        <div class="skeleton-text skeleton-title"></div>
        <div class="skeleton-text skeleton-subtitle"></div>
      </div>
    </div>
  `);
  
  // Simulate data loading
  setTimeout(() => {
    $container.html(`
      <div class="contact-card fade-in-up">
        <h4>John Smith</h4>
        <p>Technical Lead</p>
      </div>
    `);
    AnimationManager.animate('.contact-card', 'fade-in-up');
  }, 1500);
}
</script>
```

### Progress Indicators
```html
<div class="progress-container">
  <div class="progress-bar">
    <div class="progress-fill slide-in-right" style="width: 0%"></div>
  </div>
  <div class="progress-text fade-in-up">Loading...</div>
</div>

<script>
function animateProgress(targetPercent) {
  const $fill = $('.progress-fill');
  const $text = $('.progress-text');
  
  // Animate progress bar
  $fill.css('width', '0%');
  $fill.animate({ width: targetPercent + '%' }, {
    duration: 2000,
    progress: function(animation, progress) {
      const currentPercent = Math.round(targetPercent * progress);
      $text.text(`Loading... ${currentPercent}%`);
    }
  });
  
  // Pulse effect when complete
  if (targetPercent === 100) {
    setTimeout(() => {
      AnimationManager.animate($fill, 'pulse');
      $text.text('Complete!').addClass('fade-in');
    }, 2000);
  }
}
</script>
```

---

## Page Transition Animations

### Full Page Transitions
```html
<div class="page-container">
  <div class="page-content fade-in-up">
    <!-- page content -->
  </div>
</div>

<script>
// Page entrance animation
$(document).ready(function() {
  AnimationManager.chain([
    { element: '.page-header', animation: 'slide-in-down' },
    { element: '.page-content', animation: 'fade-in-up', options: { delay: 200 } },
    () => AnimationManager.staggerIn('.metric-card', 'scale-in', 100)
  ]);
});

// Page exit animation for navigation
function navigateToPage(url) {
  AnimationManager.chain([
    { element: '.page-content', animation: 'fade-out' },
    { element: '.page-header', animation: 'slide-out-up', options: { delay: 100 } }
  ]).then(() => {
    window.location.href = url;
  });
}
</script>
```

---

## Performance-Optimized Patterns

### Viewport-Based Animations
```html
<div class="content-section">
  <div class="lazy-animate" data-animation="fade-in-up">Section 1</div>
  <div class="lazy-animate" data-animation="slide-in-right">Section 2</div>
  <div class="lazy-animate" data-animation="scale-in">Section 3</div>
</div>

<script>
// Animate elements when they enter the viewport
const observeAnimations = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const animation = entry.target.dataset.animation;
      AnimationManager.animate(entry.target, animation);
      observeAnimations.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

$('.lazy-animate').each((index, element) => {
  observeAnimations.observe(element);
});
</script>
```

### Conditional Animation Based on User Preferences
```html
<div class="content-card" onclick="interactiveCard(this)">
  <h4>Interactive Card</h4>
  <p>Click for animation feedback</p>
</div>

<script>
function interactiveCard(card) {
  // Check user motion preference
  if (AnimationUtils.prefersReducedMotion()) {
    // Simple state change without animation
    $(card).addClass('active-state');
  } else {
    // Full animation sequence
    AnimationManager.chain([
      { element: card, animation: 'bounce-subtle' },
      { element: card, animation: 'pulse', options: { duration: 300 } }
    ]);
  }
}
</script>
```

---

## Best Practices Summary

### 1. **Consistent Timing**
- Use CSS custom properties for consistent duration scales
- Apply standard delays for staggered animations (50-100ms)

### 2. **Performance Optimization**
- Use `transform` and `opacity` for hardware acceleration
- Limit simultaneous animations to maintain 60fps
- Use `will-change` sparingly and remove after animation

### 3. **Accessibility**
- Always respect `prefers-reduced-motion` preference
- Provide static alternatives for essential state changes
- Ensure animations don't interfere with screen readers

### 4. **User Experience**
- Use entrance animations to guide attention
- Provide feedback animations for user actions
- Keep loading animations subtle but informative

### 5. **Development Workflow**
- Test animations across different devices and browsers
- Use performance monitoring in development
- Document animation choices for team consistency