# Contextual Animation System - Developer Guide

## Overview

The Contextual Animation System provides a comprehensive set of CSS classes and JavaScript utilities for adding subtle, user-aware animations to UI components. Built with accessibility, performance, and user experience in mind.

## Quick Start

### 1. CSS Classes Available

The system provides ready-to-use CSS classes for common animation needs:

```css
/* Status Change Animations */
.status-change-smooth        /* Smooth transitions for color, background, border */
.status-highlight           /* Brief highlight animation for status changes */

/* List Item Animations */
.list-item-enter            /* Subtle slide-in for new list items */
.list-item-stagger          /* Staggered entrance for multiple items */

/* Error Feedback Animations */
.error-attention            /* Gentle attention-drawing pulse */
.error-gentle-bounce        /* Subtle bounce for validation errors */
.error-shake-gentle         /* Light shake for form errors */

/* Success Celebrations */
.success-checkmark          /* Checkmark animation */
.success-pulse-color        /* Color pulse for success states */
.celebration-brief          /* Gentle fade for positive feedback */

/* Toast Notifications */
.toast-slide-in-right       /* Slide in from right */
.toast-slide-out-right      /* Slide out to right */

/* Tooltips */
.tooltip-fade-in            /* Fade in with slight upward movement */
.tooltip-fade-out           /* Fade out with slight downward movement */
```

### 2. JavaScript API

Access the animation system through global objects:

```javascript
// Core animation functions
ContextualAnimations.animateStatusChange($element)
ContextualAnimations.animateListItemEntrance($element, delay)
ContextualAnimations.showErrorFeedback($element, type)
ContextualAnimations.celebrateSuccess($element, type)

// Toast notifications
ToastManager.success(message, title)
ToastManager.error(message, title)
ToastManager.warning(message, title)
ToastManager.info(message, title)

// Tooltips
TooltipManager.show($element, content, position)
TooltipManager.hide($element)

// Animated form validation
AnimatedFormValidation.showError($field, message)
AnimatedFormValidation.clearError($field)
AnimatedFormValidation.celebrateSuccess($form)
```

## Implementation Examples

### 1. Adding Subtle Animations to Form Elements

```html
<!-- Add smooth transitions to inputs -->
<input type="text" class="form-input status-change-smooth" />

<!-- Add container for automatic list animations -->
<div class="list-container">
    <div class="badge">Role 1</div>
    <div class="badge">Role 2</div>
</div>
```

### 2. Success Feedback for Actions

```javascript
// When user completes an action
function handleSuccess() {
    // Add gentle celebration
    $('#container').addClass('celebration-brief');
    setTimeout(() => $('#container').removeClass('celebration-brief'), 200);
    
    // Show toast notification
    ToastManager.success('Action completed successfully!', 'Success');
}
```

### 3. Error Handling with Animation

```javascript
// Form validation with animated feedback
function validateField($field) {
    if (!isValid($field.val())) {
        // Add error styling and animation
        $field.addClass('error-shake-gentle');
        AnimatedFormValidation.showError($field, 'This field is required');
        
        // Remove animation class after completion
        setTimeout(() => $field.removeClass('error-shake-gentle'), 300);
        return false;
    }
    return true;
}
```

### 4. Dynamic List Updates

```javascript
// When adding new items to a list
function addListItem(content) {
    const $newItem = $('<div class="list-item">' + content + '</div>');
    
    // Add to DOM and trigger entrance animation
    $('#list-container').append($newItem);
    $newItem.addClass('list-item-enter');
    
    // Auto-remove animation class
    setTimeout(() => $newItem.removeClass('list-item-enter'), 150);
}
```

### 5. Status Changes with Smooth Transitions

```html
<!-- Status pills with automatic smooth transitions -->
<span class="status-pill status-change-smooth" id="status-indicator">
    In Progress
</span>
```

```javascript
// Update status with smooth transition
function updateStatus(newStatus, newClass) {
    const $status = $('#status-indicator');
    
    // Add highlight animation
    $status.addClass('status-highlight');
    
    // Update content and classes
    setTimeout(() => {
        $status.text(newStatus)
               .removeClass('status-in-progress status-completed')
               .addClass(newClass);
    }, 100);
    
    // Remove highlight class
    setTimeout(() => $status.removeClass('status-highlight'), 500);
}
```

## Advanced Usage

### 1. Custom Toast Notifications

```javascript
// Create custom toast with specific timing
ToastManager.show({
    type: 'info',
    title: 'Processing',
    message: 'Your request is being processed...',
    duration: 3000,
    showProgress: true
});
```

### 2. Context-Sensitive Tooltips

```html
<!-- Add tooltip attributes to elements -->
<button 
    data-tooltip="Save your changes"
    data-tooltip-position="top"
    class="btn-primary">
    Save
</button>
```

```javascript
// Programmatically show tooltip
TooltipManager.show($('#help-button'), 'Click for more information', 'bottom');
```

### 3. Staggered List Animations

```css
/* In your CSS */
.my-list-item {
    animation-delay: calc(var(--stagger-index) * 100ms);
}
```

```javascript
// Apply staggered animation to multiple items
$('.my-list-item').each(function(index) {
    $(this).css('--stagger-index', index)
           .addClass('list-item-enter');
});
```

## Automatic Features

### 1. Mutation Observer for Lists

The system automatically detects new elements added to containers with these classes:
- `.card-container`
- `.list-container`  
- `.main-content`

New elements automatically get entrance animations without additional JavaScript.

### 2. Form Validation Integration

Elements with these classes get automatic validation feedback:
- `.form-input`
- `.form-select`
- `.form-control`

## Accessibility Features

### 1. Reduced Motion Support

All animations respect the `prefers-reduced-motion: reduce` media query:

```css
@media (prefers-reduced-motion: reduce) {
    .list-item-enter,
    .celebration-brief,
    .status-highlight {
        animation: none !important;
    }
}
```

### 2. Screen Reader Support

Toast notifications include appropriate ARIA attributes:

```html
<div class="toast" role="alert" aria-live="assertive">
    <div class="toast-content">Message content</div>
</div>
```

### 3. Keyboard Navigation

Tooltips work with keyboard focus:

```javascript
// Tooltips show on focus for keyboard users
$('[data-tooltip]').on('focus', function() {
    TooltipManager.show($(this), $(this).data('tooltip'));
});
```

## Performance Guidelines

### 1. CSS Animation Optimization

```css
/* Use transform and opacity for smooth 60fps animations */
.my-animation {
    transform: translateX(0);
    opacity: 1;
    transition: transform 150ms ease-out, opacity 150ms ease-out;
}
```

### 2. JavaScript Best Practices

```javascript
// Batch DOM updates
function updateMultipleElements() {
    // Group DOM reads
    const $elements = $('.my-elements');
    const count = $elements.length;
    
    // Group DOM writes
    $elements.each(function(index) {
        $(this).css('--stagger-index', index);
    });
    
    // Trigger animations in next frame
    requestAnimationFrame(() => {
        $elements.addClass('list-item-enter');
    });
}
```

## Integration with Existing Components

### 1. Adding to Forms

```html
<!-- Enhance existing forms -->
<form id="my-form" class="enhanced-form">
    <input type="text" class="form-input status-change-smooth" required />
    <button type="submit" class="btn-primary">Submit</button>
</form>
```

```javascript
// Initialize form animations
$(document).ready(function() {
    $('#my-form').on('submit', function(e) {
        if (validateForm()) {
            $(this).addClass('celebration-brief');
            ToastManager.info('Submitting...', 'Please wait');
        }
    });
});
```

### 2. Enhancing Existing Lists

```javascript
// Add to existing list functionality
function addItemToExistingList(item) {
    const $list = $('#existing-list');
    const $newItem = $('<li>' + item + '</li>');
    
    // Add list-container class if not present
    if (!$list.hasClass('list-container')) {
        $list.addClass('list-container');
    }
    
    // Add item with animation
    $list.append($newItem);
    $newItem.addClass('list-item-enter');
}
```

## Debugging and Testing

### 1. Animation Debugging

```javascript
// Enable animation debugging
ContextualAnimations.debug = true;

// This will log animation triggers to console
ContextualAnimations.animateListItemEntrance($element);
// Console: "Animating list item entrance for:", $element
```

### 2. Testing Animations

```javascript
// Test animation system availability
if (typeof ContextualAnimations !== 'undefined') {
    // Animation system loaded
    ContextualAnimations.celebrateSuccess($('#test-element'), 'brief');
} else {
    console.warn('Contextual animation system not loaded');
}
```

### 3. Performance Monitoring

```javascript
// Monitor animation performance
const startTime = performance.now();
$element.addClass('list-item-enter');

setTimeout(() => {
    const endTime = performance.now();
    console.log(`Animation completed in ${endTime - startTime}ms`);
}, 150);
```

## Browser Compatibility

### Supported Browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallbacks:
```css
/* Fallback for older browsers */
@supports not (animation: none) {
    .list-item-enter {
        opacity: 1;
        transform: translateX(0);
    }
}
```

## Common Patterns

### 1. Loading State with Animation

```javascript
function showLoading($button) {
    $button.addClass('loading')
           .find('.btn-text').addClass('celebration-brief');
    
    // Show loading toast
    ToastManager.info('Processing...', 'Please wait');
}
```

### 2. Multi-Step Form Progress

```javascript
function advanceFormStep($currentStep, $nextStep) {
    // Celebrate current step completion
    $currentStep.addClass('success-pulse-color');
    
    // Animate next step entrance
    setTimeout(() => {
        $nextStep.addClass('list-item-enter').removeClass('hidden');
    }, 200);
}
```

### 3. Search Results Animation

```javascript
function displaySearchResults(results) {
    const $container = $('#search-results').addClass('list-container');
    
    results.forEach((result, index) => {
        const $item = createResultItem(result);
        $item.css('--stagger-index', index);
        $container.append($item);
    });
    
    // Trigger staggered entrance
    $('#search-results .result-item').addClass('list-item-stagger');
    
    // Show success toast
    ToastManager.success(`Found ${results.length} results`, 'Search Complete');
}
```

## Customization

### 1. Custom Animation Timing

```css
:root {
    --anim-duration-custom: 200ms;
    --anim-delay-custom: 50ms;
}

.my-custom-animation {
    animation-duration: var(--anim-duration-custom);
    animation-delay: var(--anim-delay-custom);
}
```

### 2. Theme-Specific Colors

```css
.celebration-brief.theme-dark {
    background-color: rgba(34, 197, 94, 0.1);
}

.celebration-brief.theme-light {
    background-color: rgba(34, 197, 94, 0.05);
}
```

## Troubleshooting

### Common Issues:

1. **Animations not working**: Check if CSS files are loaded in correct order
2. **JavaScript errors**: Ensure jQuery 3.6.0+ is loaded before animation system
3. **Performance issues**: Verify hardware acceleration is enabled for transform animations
4. **Accessibility complaints**: Ensure `prefers-reduced-motion` is respected

### Debug Commands:
```javascript
// Check system status
console.log(ContextualAnimations.isReady());
console.log(ToastManager.getActiveToasts());
console.log(TooltipManager.getActiveTooltips());
```

## Migration from Other Animation Systems

### From CSS Animations:
```javascript
// Old way
$element.animate({opacity: 1}, 300);

// New way  
$element.addClass('fade-in');
```

### From Custom Solutions:
```javascript
// Replace custom toast with system
// Old:
showCustomNotification('Success!');

// New:
ToastManager.success('Success!', 'Operation Complete');
```

This animation system provides a comprehensive, accessible, and performant foundation for all UI animations in the application. Use these patterns and APIs to create consistent, delightful user experiences across all components.