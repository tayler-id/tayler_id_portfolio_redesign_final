# OnboardIQ Styleguide Implementation
## Adapted for Existing Pebble Template Structure

> **Adapted**: 2025-01-18  
> **Target**: OnboardIQ's existing template structure in `/templates/web/`  
> **Tech Stack**: Java Spring Boot + Pebble Templates + jQuery + Tailwind CSS  
> **Note**: This styleguide adapts to the existing project structure - NO template reorganization required

## Table of Contents

1. [Project-Specific Architecture](#project-specific-architecture)
2. [Existing Structure Integration](#existing-structure-integration)
3. [Color System (Enhanced)](#color-system-enhanced)
4. [Component Enhancement Patterns](#component-enhancement-patterns)
5. [Template Usage Patterns](#template-usage-patterns)
6. [jQuery Integration (Current)](#jquery-integration-current)
7. [Implementation Guidelines](#implementation-guidelines)

---

## Project-Specific Architecture

### Current File Structure (DO NOT CHANGE)
```
src/main/resources/
├── static/
│   ├── css/ (for additional component styles)
│   ├── js/ (jQuery components - already exists)
│   └── assets/
├── templates/web/ (EXISTING - base path configured)
│   ├── layouts/
│   │   ├── main.peb (EXISTING - main layout)
│   │   ├── admin.peb (EXISTING - admin layout)
│   │   └── admin/ (EXISTING - specialized layouts)
│   ├── fragments/
│   │   └── head.peb (EXISTING - CSS/JS imports)
│   ├── components/ (EXISTING - 30+ components)
│   │   └── cards/ (EXISTING - mixed .peb/.html)
│   ├── admin/ (EXISTING - admin pages)
│   ├── contacts/ (EXISTING - contact pages)
│   └── [other existing directories]
└── application.properties (EXISTING - Pebble config)
```

### Integration Points
```
Spring Boot Controller → Existing Pebble Templates → Enhanced Tailwind + jQuery
```

---

## Existing Structure Integration

### Base Configuration (Already Configured)
```properties
# application.properties (EXISTING)
pebble.prefix=/templates/web/
pebble.suffix=.peb
pebble.cache=false
pebble.exposeSessionAttributes=true
```

### Head Template Enhancement (Update existing fragments/head.peb)
The existing `fragments/head.peb` already includes:
- Tailwind CSS configuration with custom colors
- jQuery 3.6.0
- Remix Icons
- Component imports

**Enhancement**: Add custom component CSS to existing structure:
```html
<!-- Add to existing fragments/head.peb -->
<link href="/css/enhanced-components.css" rel="stylesheet">
```

---

## Color System (Enhanced)

### Current Colors (Already Defined)
Your project already has these colors defined in `fragments/head.peb`:
```css
/* EXISTING color palette - DO NOT CHANGE */
:root {
  --primary: #8E6FF7;
  --secondary: #6366f1;
  --brand-blue: #3b82f6;
  --sidebar-active-bg: hsl(210 40% 96.1%);
  --text-dark: hsl(222.2 47.4% 11.2%);
  --text-grey: hsl(215.4 16.3% 46.9%);
  --text-lightgrey: #6b7280;
  /* ... extensive existing palette ... */
}
```

### Enhancement Strategy
Instead of changing existing colors, create additional utility classes:
```css
/* enhanced-components.css - NEW FILE */
/* Enhance existing color system without breaking current usage */
.status-enhanced {
  /* Enhanced status variations that complement existing ones */
}

.card-enhanced {
  /* Enhanced card variations that work with existing card-bg, card-border */
}
```

---

## Component Enhancement Patterns

### Working with Existing Components

#### 1. Card Components (components/cards/)
**Current Structure**: Mix of `.peb` and `.html` files
- `metric_card.html`
- `progress_card.html` 
- `status_card.html`

**Enhancement Approach**:
```html
<!-- Enhance existing cards by adding classes to current HTML -->
<!-- Example: Existing progress_card.html -->
<div class="card-base progress-enhanced"> <!-- Add enhanced classes -->
  <!-- Keep existing structure, add enhanced styling -->
</div>
```

#### 2. Macro-Based Components (components/*.peb)
**Current Pattern**:
```pebble
{% macro header(title, subtitle, breadcrumbs, search, user_info) %}
<!-- Existing macro structure -->
{% endmacro %}
```

**Enhancement Approach**:
```pebble
{% macro header(title, subtitle, breadcrumbs, search, user_info, enhanced_variant) %}
<div class="header-base {{ enhanced_variant | default('') }}">
  <!-- Keep existing structure, conditionally add enhancements -->
  {% if enhanced_variant %}
  <div class="enhanced-header-features">
    <!-- Additional enhanced features -->
  </div>
  {% endif %}
  <!-- Existing header content unchanged -->
</div>
{% endmacro %}
```

### Layout Integration

#### 1. Main Layout (layouts/main.peb)
**Current**: Contains sidebar navigation and main content area
**Enhancement**: Add optional enhanced classes without breaking existing pages
```pebble
<body class="bg-white flex h-screen {{ layout_variant | default('') }}">
  {% if show_sidebar | default(true) %}
    {{ sidebar(active_menu_id, appSession.user, enhanced_sidebar | default(false)) }}
  {% endif %}
  <!-- Existing structure preserved -->
</body>
```

#### 2. Admin Layout (layouts/admin.peb)
**Current**: Specialized admin interface
**Enhancement**: Work within existing admin structure
```pebble
<!-- Enhance existing admin layout without structural changes -->
<div class="admin-container {{ admin_variant | default('') }}">
  <!-- Existing admin navigation and content -->
</div>
```

---

## Template Usage Patterns

### Page Template Integration
**Current Pattern**:
```pebble
<!-- Existing page structure -->
{% extends "layouts/main" %}
{% block content %}
<div class="container-fluid">
  {{ header("Page Title", "Subtitle", breadcrumbs, search, user_info) }}
  <!-- Page content -->
</div>
{% endblock %}
```

**Enhanced Pattern**:
```pebble
{% extends "layouts/main" %}
{% block content %}
<div class="container-fluid {{ page_variant | default('') }}">
  {{ header("Page Title", "Subtitle", breadcrumbs, search, user_info, "enhanced") }}
  <!-- Enhanced components while maintaining existing structure -->
  {{ enhanced_status_card(config) }}
</div>
{% endblock %}
```

### Component Usage (Working with Existing)
```pebble
<!-- Use existing components with optional enhancements -->
{{ task_table(data, columns, "enhanced-table") }}
{{ contact_card(contact, "enhanced-contact") }}
{{ badge(status, type, "enhanced-badge") }}
```

---

## jQuery Integration (Current)

### Existing jQuery Setup
Your project already has:
- jQuery 3.6.0 loaded
- Component initialization in common.js
- Interactive elements (sidebar toggles, progress bars)

### Enhancement Strategy
**Add to existing common.js**:
```javascript
// Enhance existing initialization
$(document).ready(function() {
    // EXISTING initializations
    initializeSubmenuToggles();
    initializeProgressAnimations();
    initializeStatusCards();
    initializeTables();
    
    // NEW enhancements
    initializeEnhancedComponents();
    initializeAccessibilityFeatures();
});

// NEW: Enhanced component behaviors
function initializeEnhancedComponents() {
    // Enhanced status cards
    $('.status-card.enhanced').each(function() {
        const $card = $(this);
        // Add enhanced interactions without breaking existing ones
    });
    
    // Enhanced progress bars
    $('.progress-enhanced .progress-bar-value').each(function() {
        // Enhance existing progress bar animations
    });
}
```

---

## Implementation Guidelines

### Phase 1: Non-Breaking Enhancements
1. **Create new CSS file**: `static/css/enhanced-components.css`
2. **Add optional parameters** to existing macros
3. **Enhance existing jQuery** without changing current behavior
4. **Add new utility classes** that complement existing ones

### Phase 2: Component Enhancements
1. **Status cards**: Add enhanced variants to existing `components/cards/`
2. **Navigation**: Enhance existing sidebar without structural changes
3. **Forms**: Add enhanced form components alongside existing ones
4. **Tables**: Enhance existing table components

### Phase 3: Advanced Features
1. **Accessibility improvements** to existing components
2. **Animation enhancements** to existing interactions
3. **Responsive improvements** within existing layouts

### CSS Integration Strategy
```css
/* enhanced-components.css - Work with existing styles */

/* Enhance existing card system */
.card-base.enhanced {
  /* Additional enhancements that work with existing card-base */
  @apply transition-all duration-300 hover:shadow-lg;
}

/* Enhance existing status system */
.status-pill.enhanced {
  /* Work with existing status-pill classes */
  @apply transform hover:scale-105 transition-transform;
}

/* Enhance existing progress bars */
.progress-enhanced .progress-bar-value {
  /* Work with existing progress-bar-value */
  @apply transition-all duration-500 ease-out;
}
```

### Spring Boot Controller Integration
```java
// Work with existing controller patterns
@Controller
public class DashboardController {
    
    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        // EXISTING model attributes
        model.addAttribute("active_menu_id", "menu_home");
        model.addAttribute("page_title", "Dashboard");
        
        // NEW: Optional enhanced variants
        model.addAttribute("layout_variant", "enhanced");
        model.addAttribute("enhanced_sidebar", true);
        
        return "home"; // Existing template name
    }
}
```

### Component Enhancement Examples

#### Enhanced Status Card
```pebble
{# components/cards/enhanced_status_card.peb - NEW FILE #}
{% macro enhanced_status_card(config) %}
<div class="status-card enhanced {{ config.variant | default('') }}"
     data-enhanced="true">
    
    <!-- Use existing status card structure -->
    {{ status_card_content(config) }}
    
    <!-- Add enhanced features -->
    {% if config.enhanced_features %}
    <div class="enhanced-features">
        {{ config.enhanced_features | raw }}
    </div>
    {% endif %}
</div>
{% endmacro %}

{# Reuse existing status card macro #}
{% macro status_card_content(config) %}
    <!-- Copy existing status card implementation -->
    <!-- This maintains consistency with current cards -->
{% endmacro %}
```

---

## Migration Strategy

### Step 1: Foundation
- [ ] Create `enhanced-components.css`
- [ ] Add CSS link to existing `fragments/head.peb`
- [ ] Test that nothing breaks

### Step 2: Component Enhancements
- [ ] Add optional enhanced parameters to 3-5 key macros
- [ ] Create enhanced variants of existing components
- [ ] Test enhanced and non-enhanced versions work together

### Step 3: Page Integration
- [ ] Update 2-3 key pages to use enhanced variants
- [ ] Verify existing pages still work unchanged
- [ ] Update controller methods to pass enhanced options

### Step 4: JavaScript Enhancements
- [ ] Add enhanced behaviors to existing common.js
- [ ] Ensure existing jQuery functionality is preserved
- [ ] Test all interactive elements

### Final Result
- **Existing templates**: Continue working without changes
- **Enhanced templates**: New variants available for enhanced features  
- **Backward compatibility**: 100% maintained
- **CSS**: Additive-only, no existing classes modified
- **JavaScript**: Enhanced existing behaviors, no breaking changes

This approach ensures that your styleguide implementation works within your established project structure while providing a clear path for enhancement without disruption.