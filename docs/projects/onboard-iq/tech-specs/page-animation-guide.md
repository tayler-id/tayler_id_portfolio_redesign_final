# Universal Page Animation System - Developer Guide

## Overview

The Universal Page Animation System provides consistent, coordinated animations across all pages in the OnboardIQ application. It automatically detects and animates common UI elements with proper timing and sequencing.

## How It Works

The system is automatically initialized on every page load via `common.js` and uses a coordinated 5-step animation sequence:

1. **Page Header Actions** (0ms delay) - Action buttons in page headers
2. **Filter Sections** (100ms delay) - Filter panels and search areas  
3. **Metric/Status Cards** (200ms + 50ms stagger) - Dashboard metrics and status indicators
4. **Main Content Cards** (400ms + 100ms stagger) - Primary content cards (contacts, providers, etc.)
5. **Other Content Areas** (600ms delay) - Additional content sections

## Using the System

### Standard Usage (Automatic)

Simply use the predefined CSS classes on your elements:

```html
<!-- Page header actions will animate automatically -->
<div class="page-header-actions">
    <button class="btn-primary">Add Contact</button>
    <button class="btn-secondary">Import CSV</button>
</div>

<!-- Filters section will animate automatically -->
<div id="filters-section" class="bg-white rounded-lg shadow-sm">
    <!-- Filter content -->
</div>

<!-- Metric cards will animate with stagger -->
<div class="metric-card-wrapper">
    {{ metricCard(...) }}
</div>

<!-- Contact/Provider cards will animate with stagger -->
<div class="contact-card-wrapper">
    {{ contactCard(...) }}
</div>
<div class="provider-card-wrapper">
    {{ providerCard(...) }}
</div>

<!-- Manual content areas -->
<div class="main-content animatable">
    <!-- Content that needs manual animation trigger -->
</div>
```

### Supported Element Classes

The system automatically detects and animates these elements:

- `.page-header-actions` - Header action buttons
- `#filters-section` or `.filters-section` - Filter panels
- `.metric-card-wrapper` - Metric dashboard cards
- `.status-card-wrapper` - Status indicator cards  
- `.contact-card-wrapper` - Contact cards
- `.provider-card-wrapper` - Provider cards
- `.main-content.animatable` - Manual content areas
- `.page-content.animatable` - Manual page sections

### Card Consistency

All card wrappers automatically get:
- Minimum height of 280px for visual consistency
- `height: 100%` for proper flex behavior
- Smooth opacity transitions

### Browser Compatibility

- **Modern Browsers**: Full animation effects with hardware acceleration
- **Reduced Motion**: Respects `prefers-reduced-motion` accessibility preference
- **Fallback**: Gracefully shows content without animation if JavaScript fails

## Adding New Page Types

For new pages, follow this pattern:

1. **Use Standard Wrappers**: Apply the predefined classes above
2. **Header Actions**: Wrap action buttons in `.page-header-actions`
3. **Filter Sections**: Use `#filters-section` ID or `.filters-section` class
4. **Card Content**: Wrap cards in appropriate `*-card-wrapper` classes
5. **Special Content**: Add `.animatable` class to `.main-content` or `.page-content` for manual timing

### Example New Page Structure:

```html
<!-- Page Header -->
<div class="bg-white border-b border-gray-200 mb-6">
    <div class="px-6 py-8">
        <h1>Page Title</h1>
        <div class="page-header-actions">
            <button class="btn-primary">Primary Action</button>
        </div>
    </div>
</div>

<!-- Filters (optional) -->
<div id="filters-section" class="bg-white rounded-lg shadow-sm border mb-6">
    <!-- Filter controls -->
</div>

<!-- Metrics (optional) -->
<div class="grid grid-cols-4 gap-6 mb-8">
    <div class="metric-card-wrapper">
        {{ metricCard(...) }}
    </div>
    <!-- More metric cards... -->
</div>

<!-- Main Content Cards -->
<div class="grid grid-cols-3 gap-6">
    <div class="provider-card-wrapper">
        {{ providerCard(...) }}
    </div>
    <!-- More content cards... -->
</div>
```

## Manual Control (Advanced)

If you need custom animation timing, you can disable automatic animations and use manual control:

```javascript
// Disable automatic animations for specific elements
$('.my-special-content').addClass('no-auto-animate');

// Use manual animation after page load
setTimeout(() => {
    AnimationManager.animate('.my-special-content', 'page-enter-fade');
}, 1000);
```

## Performance Notes

- All animations use hardware acceleration (`transform` and `opacity`)
- Animations respect the 300ms duration standard from Story 2.1
- Elements start hidden (`opacity: 0`) and animate to visible
- Fallback ensures content is always accessible even without animations

## Accessibility

- Full `prefers-reduced-motion` support
- Semantic HTML structure maintained during animations  
- Focus management preserved
- Screen reader compatible

This system ensures all pages in the application have consistent, professional animations without requiring page-specific animation code.