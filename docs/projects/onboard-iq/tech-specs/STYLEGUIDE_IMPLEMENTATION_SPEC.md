# Styleguide Implementation Specification
## Pebble Templates + jQuery + Tailwind CSS 4 for Java Spring Boot

> **Target Tech Stack**: Java Spring Boot + Pebble Template Engine + jQuery + Tailwind CSS 4  
> **Generated**: 2025-01-18  
> **Purpose**: Complete implementation guide for building UI components from existing styleguide

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Color System](#color-system)
3. [Typography & Spacing](#typography--spacing)
4. [Component Patterns](#component-patterns)
5. [Pebble Template Structure](#pebble-template-structure)
6. [jQuery Integration](#jquery-integration)
7. [Spring Boot Configuration](#spring-boot-configuration)
8. [Implementation Examples](#implementation-examples)

---

## Architecture Overview

### File Structure
```
src/main/resources/
├── static/
│   ├── css/
│   │   ├── tailwind.css (compiled output)
│   │   └── components.css (custom component styles)
│   ├── js/
│   │   ├── common.js (jQuery components initialization)
│   │   └── components/ (individual component JS)
│   └── assets/
│       ├── fonts/
│       └── icons/
├── templates/
│   ├── layouts/
│   │   └── base-layout.peb (main layout template)
│   ├── components/
│   │   ├── cards/
│   │   ├── forms/
│   │   ├── navigation/
│   │   └── status/
│   └── pages/
└── application.yml (Pebble + static resource config)
```

### Technology Integration Pattern
```
Spring Boot Controller → Pebble Template → Tailwind CSS + jQuery Components
```

---

## Color System

### Tailwind CSS 4 Configuration
```javascript
// tailwind.config.js for Spring Boot static resources
module.exports = {
  content: [
    "./src/main/resources/templates/**/*.peb",
    "./src/main/resources/static/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: "#8E6FF7",
        secondary: "#6366f1",
        'brand-blue': '#3b82f6',
        
        // Layout Colors
        'sidebar-active-bg': 'hsl(210 40% 96.1%)',
        'text-dark': 'hsl(222.2 47.4% 11.2%)',
        'text-grey': 'hsl(215.4 16.3% 46.9%)',
        'text-lightgrey': '#6b7280',
        'border-grey': 'hsl(214.3 31.8% 91.4%)',
        'background-grey': 'hsl(220 14.3% 95.9%)',
        
        // Card System
        'card-border': '#e5e7eb',
        'card-bg': '#ffffff',
        
        // Status System
        'status-completed-bg': '#1f2937',
        'status-completed-text': '#ffffff',
        'status-in-process-bg': '#fef3c7',
        'status-in-process-text': '#a16207',
        'status-blocked-bg': '#fef2f2',
        'status-blocked-text': '#b91c1c',
        'status-waiting-bg': '#f3f4f6',
        'status-waiting-text': '#6b7280',
        
        // Status Pills
        'pill-blocked-bg': '#fee2e2',
        'pill-blocked-text': '#dc2626',
        'pill-inprogress-bg': '#e5e7eb',
        'pill-inprogress-text': '#4b5563',
        'pill-completed-bg': '#dcfce7',
        'pill-completed-text': '#16a34a',
        'pill-pending-bg': '#ffedd5',
        'pill-pending-text': '#f97316',
        
        // Task Status
        'task-completed-bg': '#dcfce7',
        'task-completed-icon': '#16a34a',
        'task-inprogress-bg': '#bfdbfe',
        'task-inprogress-icon': '#2563eb',
        'task-blocked-bg': '#fee2e2',
        'task-blocked-icon': '#dc2626',
        
        // Charts & Progress
        'chart-bar': '#7b8ba4',
        'chart-grid': '#e5e7eb',
        'chart-label': '#6b7280',
        'progress-bar-value-color': '#7b8ba4',
        
        // Miscellaneous
        'trend-green': '#22c55e',
        'trend-grey': '#9ca3af',
        'audit-message-box-bg': '#f9fafb',
        'audit-message-box-border': '#e5e7eb',
        'audit-dot': '#000000'
      },
      borderRadius: {
        'button': '6px',
        'card': '8px',
        'pill': '9999px'
      },
      spacing: {
        '15': '3.75rem', // Sidebar width
        '72': '18rem'    // Quick Actions width (lg screens)
      },
      fontSize: {
        'xxs': '0.625rem'
      },
      boxShadow: {
        'card': '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04)'
      }
    }
  }
}
```

### Spring Boot Static Resource Serving
```yaml
# application.yml
spring:
  web:
    resources:
      static-locations: classpath:/static/
      cache:
        period: 31536000 # 1 year for production
  pebble:
    suffix: .peb
    cache: true # false for development
```

---

## Typography & Spacing

### Font Configuration
```html
<!-- In base-layout.peb -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Typography Classes
```css
/* components.css - Custom typography utilities */
body {
  font-family: 'Inter', sans-serif;
  color: theme('colors.text-dark');
}

.heading-1 { @apply text-3xl font-bold; }
.heading-2 { @apply text-2xl font-semibold; }
.heading-3 { @apply text-xl font-semibold; }
.heading-4 { @apply text-lg font-semibold; }
.body-text { @apply text-base; }
.small-text { @apply text-sm; }
.tiny-text { @apply text-xs; }
.micro-text { @apply text-xxs; }
```

---

## Component Patterns

### Status Pill System
```css
/* Status pill base classes */
.status-pill {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-medium;
}

.status-pill-small {
  @apply inline-flex items-center px-2 py-0.5 rounded-pill text-xs font-medium;
}

.status-summary-pill {
  @apply inline-flex items-center px-4 py-1.5 rounded-pill text-sm font-medium gap-2;
}
```

### Progress Bar System
```css
/* Progress bar variants */
.progress-bar-container {
  @apply h-2 bg-border-grey rounded-sm overflow-hidden;
}

.progress-bar-table {
  @apply h-1.5 bg-border-grey rounded-sm overflow-hidden;
}

.progress-bar-card {
  @apply h-1.5 bg-border-grey rounded-sm overflow-hidden w-full;
}

.progress-bar-value {
  @apply h-full bg-progress-bar-value-color transition-all duration-300;
}
```

### Card System
```css
.card-base {
  @apply bg-card-bg rounded-card shadow-card border border-card-border;
}

.metric-card {
  @apply card-base p-4;
}

.status-card {
  @apply card-base p-6 space-y-4;
}

.progress-card {
  @apply card-base p-6;
}
```

---

## Pebble Template Structure

### Base Layout Template
```html
{# templates/layouts/base-layout.peb #}
{% macro base_layout(title, show_sidebar, active_page, user, show_header, header_config, content) %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title | default("Merchant Onboarding Dashboard") }}</title>
    
    <!-- Tailwind CSS -->
    <link href="/css/tailwind.css" rel="stylesheet">
    <link href="/css/components.css" rel="stylesheet">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- RemixIcon -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet">
</head>
<body class="bg-white flex h-screen">
    {% if show_sidebar | default(true) %}
        {% include "components/navigation/sidebar.peb" with {"active_page": active_page | default('dashboard'), "user": user} %}
    {% endif %}
    
    <div class="flex-1 flex flex-col overflow-hidden">
        {% if show_header | default(true) %}
            {% include "components/layout/header.peb" with header_config %}
        {% endif %}
        
        <main class="flex-1 overflow-auto p-6 bg-white space-y-6">
            {{ content | raw }}
        </main>
    </div>
    
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <!-- Common JS -->
    <script src="/js/common.js"></script>
</body>
</html>
{% endmacro %}
```

### Component Macro Example - Status Card
```html
{# templates/components/cards/status-card.peb #}
{% macro status_card(config) %}
<div class="status-card">
    {% if config.title or config.status %}
    <div class="flex justify-between items-center">
        {% if config.title %}
        <h3 class="text-lg font-semibold text-gray-900">{{ config.title }}</h3>
        {% endif %}
        {% if config.status %}
        <span class="status-pill-small bg-pill-{{ config.status.type }}-bg text-pill-{{ config.status.type }}-text">
            <i class="{{ config.status.icon }} mr-1 text-xs"></i>
            {{ config.status.text }}
        </span>
        {% endif %}
    </div>
    {% endif %}
    
    {% if config.timestamp %}
    <div class="flex items-center text-sm text-text-lightgrey">
        <i class="ri-time-line mr-1 text-base"></i>
        <span>{{ config.timestamp }}</span>
    </div>
    {% endif %}
    
    {% if config.progress %}
    <div>
        <div class="flex justify-between text-sm text-text-grey mb-1">
            <span>Progress</span>
            <span class="text-text-lightgrey">{{ config.progress.percentage }}%</span>
        </div>
        <div class="progress-bar-card">
            <div class="progress-bar-value" style="width: {{ config.progress.percentage }}%;"></div>
        </div>
        <div class="flex justify-between items-center text-xs text-text-lightgrey mt-2">
            <span>{{ config.progress.completed }}/{{ config.progress.total }} Tasks Complete</span>
            {% if config.progress.details_url %}
            <a href="{{ config.progress.details_url }}" class="text-sm font-medium text-text-lightgrey hover:underline">
                View Details
            </a>
            {% endif %}
        </div>
    </div>
    {% endif %}
    
    {% if config.content %}
    <div class="mt-4">
        {{ config.content | raw }}
    </div>
    {% endif %}
</div>
{% endmacro %}
```

---

## jQuery Integration

### Component Initialization Pattern
```javascript
// static/js/common.js
$(document).ready(function() {
    // Initialize all components
    initializeSubmenuToggles();
    initializeProgressAnimations();
    initializeStatusCards();
    initializeTables();
    initializeModals();
});

// Submenu Toggle (Intelligence menu example)
function initializeSubmenuToggles() {
    $('.submenu-toggle').on('click', function(e) {
        e.preventDefault();
        const $this = $(this);
        const $submenu = $this.next('.submenu');
        const $arrow = $this.find('.arrow-icon');
        const isOpen = $submenu.hasClass('show');
        
        if (isOpen) {
            $submenu.removeClass('show');
            $arrow.css('transform', 'rotate(0deg)');
            sessionStorage.removeItem('submenu-' + $this.data('menu'));
        } else {
            $submenu.addClass('show');
            $arrow.css('transform', 'rotate(180deg)');
            sessionStorage.setItem('submenu-' + $this.data('menu'), 'open');
        }
    });
    
    // Restore submenu states from session storage
    $('.submenu-toggle').each(function() {
        const $this = $(this);
        const menuKey = 'submenu-' + $this.data('menu');
        if (sessionStorage.getItem(menuKey) === 'open') {
            const $submenu = $this.next('.submenu');
            const $arrow = $this.find('.arrow-icon');
            $submenu.addClass('show');
            $arrow.css('transform', 'rotate(180deg)');
        }
    });
}

// Progress Bar Animations
function initializeProgressAnimations() {
    $('.progress-bar-value').each(function() {
        const $bar = $(this);
        const targetWidth = $bar.data('width') + '%';
        
        // Animate on scroll into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $bar.animate({ width: targetWidth }, 1000, 'swing');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe($bar[0]);
    });
}

// Table Enhancements
function initializeTables() {
    // Row hover effects
    $('tbody tr').hover(
        function() { $(this).addClass('bg-audit-message-box-bg'); },
        function() { $(this).removeClass('bg-audit-message-box-bg'); }
    );
    
    // Status pill tooltips
    $('.status-pill').each(function() {
        const $pill = $(this);
        if ($pill.data('tooltip')) {
            $pill.attr('title', $pill.data('tooltip'));
        }
    });
}
```

### Component-Specific JavaScript
```javascript
// static/js/components/status-cards.js
function initializeStatusCards() {
    // Auto-refresh status cards
    $('.status-card[data-auto-refresh]').each(function() {
        const $card = $(this);
        const refreshUrl = $card.data('refresh-url');
        const interval = $card.data('refresh-interval') || 30000;
        
        if (refreshUrl) {
            setInterval(() => {
                $.get(refreshUrl)
                    .done(function(data) {
                        $card.find('.progress-percentage').text(data.progress.percentage + '%');
                        $card.find('.progress-bar-value').css('width', data.progress.percentage + '%');
                        $card.find('.progress-tasks').text(
                            data.progress.completed + '/' + data.progress.total + ' Tasks Complete'
                        );
                    })
                    .fail(function() {
                        console.log('Failed to refresh status card:', refreshUrl);
                    });
            }, interval);
        }
    });
}
```

---

## Spring Boot Configuration

### Controller Pattern
```java
// Java Spring Boot Controller
@Controller
@RequestMapping("/dashboard")
public class DashboardController {
    
    @GetMapping
    public String dashboard(Model model) {
        // Prepare data for templates
        Map<String, Object> headerConfig = new HashMap<>();
        headerConfig.put("title", "Dashboard");
        headerConfig.put("subtitle", "Merchant Onboarding Overview");
        headerConfig.put("show_breadcrumbs", true);
        headerConfig.put("breadcrumbs", Arrays.asList(
            Map.of("text", "Home", "url", "/"),
            Map.of("text", "Dashboard", "url", "/dashboard")
        ));
        
        model.addAttribute("page_title", "Merchant Onboarding Dashboard");
        model.addAttribute("active_page", "dashboard");
        model.addAttribute("header_config", headerConfig);
        model.addAttribute("status_cards", prepareStatusCards());
        
        return "pages/dashboard";
    }
    
    private List<Map<String, Object>> prepareStatusCards() {
        return Arrays.asList(
            Map.of(
                "title", "Acima Configuration",
                "status", Map.of(
                    "type", "blocked",
                    "text", "Blocked",
                    "icon", "ri-error-warning-line"
                ),
                "timestamp", "1 day ago",
                "progress", Map.of(
                    "percentage", 30,
                    "completed", 4,
                    "total", 12,
                    "details_url", "/providers/acima/details"
                )
            ),
            Map.of(
                "title", "Synchrony Setup",
                "status", Map.of(
                    "type", "inprogress",
                    "text", "In Progress",
                    "icon", "ri-time-line"
                ),
                "timestamp", "3 hours ago",
                "progress", Map.of(
                    "percentage", 90,
                    "completed", 9,
                    "total", 10,
                    "details_url", "/providers/synchrony/details"
                )
            )
        );
    }
    
    @GetMapping("/api/status-card/{id}")
    @ResponseBody
    public Map<String, Object> getStatusCardData(@PathVariable String id) {
        // Return JSON data for AJAX updates
        return Map.of(
            "progress", Map.of(
                "percentage", 45,
                "completed", 6,
                "total", 12
            ),
            "status", Map.of(
                "type", "inprogress",
                "text", "In Progress"
            )
        );
    }
}
```

### Page Template Usage
```html
{# templates/pages/dashboard.peb #}
{% extends "layouts/base-layout.peb" %}

{% block content %}
<div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-start">
        <div>
            <h1 class="text-3xl font-bold text-text-dark">Dashboard Overview</h1>
            <p class="text-text-grey mt-1">Monitor your merchant onboarding progress</p>
        </div>
    </div>
    
    <!-- Status Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {% for card in status_cards %}
        {% import "components/cards/status-card.peb" %}
        {{ status_card(card) }}
        {% endfor %}
    </div>
    
    <!-- Additional dashboard content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Progress Overview -->
        <div class="lg:col-span-2">
            {% import "components/cards/progress-card.peb" %}
            {{ progress_card({
                "title": "Overall Progress",
                "progress": {
                    "percentage": 47,
                    "completed": 7,
                    "total": 15,
                    "description": "tasks completed"
                }
            }) }}
        </div>
        
        <!-- Quick Actions -->
        <div>
            {% import "components/common/quick-actions.peb" %}
            {{ quick_actions({
                "title": "Quick Actions",
                "actions": [
                    {"icon": "ri-add-line", "text": "Add Provider", "url": "/providers/new"},
                    {"icon": "ri-file-line", "text": "View Reports", "url": "/reports"},
                    {"icon": "ri-settings-line", "text": "Settings", "url": "/settings"}
                ]
            }) }}
        </div>
    </div>
</div>
{% endblock %}
```

---

## Implementation Examples

### Complete Status Card Implementation

#### 1. Pebble Template
```html
{# templates/components/cards/status-card.peb #}
{% macro status_card(config) %}
<div class="status-card{% if config.auto_refresh %} auto-refresh{% endif %}" 
     {% if config.auto_refresh %}data-refresh-url="{{ config.refresh_url }}" data-refresh-interval="{{ config.refresh_interval }}"{% endif %}>
    
    <!-- Header with title and status -->
    {% if config.title or config.status %}
    <div class="flex justify-between items-center">
        {% if config.title %}
        <h3 class="text-lg font-semibold text-gray-900">{{ config.title }}</h3>
        {% endif %}
        {% if config.status %}
        <span class="status-pill-small bg-pill-{{ config.status.type }}-bg text-pill-{{ config.status.type }}-text"
              {% if config.status.tooltip %}data-tooltip="{{ config.status.tooltip }}"{% endif %}>
            <i class="{{ config.status.icon }} mr-1 text-xs"></i>
            {{ config.status.text }}
        </span>
        {% endif %}
    </div>
    {% endif %}
    
    <!-- Timestamp -->
    {% if config.timestamp %}
    <div class="flex items-center text-sm text-text-lightgrey">
        <i class="ri-time-line mr-1 text-base"></i>
        <span>{{ config.timestamp }}</span>
    </div>
    {% endif %}
    
    <!-- Progress section -->
    {% if config.progress %}
    <div>
        <div class="flex justify-between text-sm text-text-grey mb-1">
            <span>Progress</span>
            <span class="text-text-lightgrey progress-percentage">{{ config.progress.percentage }}%</span>
        </div>
        <div class="progress-bar-card">
            <div class="progress-bar-value" data-width="{{ config.progress.percentage }}" 
                 style="width: 0%;"></div>
        </div>
        <div class="flex justify-between items-center text-xs text-text-lightgrey mt-2">
            <span class="progress-tasks">{{ config.progress.completed }}/{{ config.progress.total }} Tasks Complete</span>
            {% if config.progress.details_url %}
            <a href="{{ config.progress.details_url }}" 
               class="text-sm font-medium text-text-lightgrey hover:underline">
                View Details
            </a>
            {% endif %}
        </div>
    </div>
    {% endif %}
    
    <!-- Additional content -->
    {% if config.content %}
    <div class="mt-4">
        {{ config.content | raw }}
    </div>
    {% endif %}
    
    <!-- Action buttons -->
    {% if config.actions %}
    <div class="flex space-x-3 mt-4">
        {% for action in config.actions %}
        <button class="btn-{{ action.variant | default('primary') }}"
                onclick="{{ action.onclick | default('') }}">
            {% if action.icon %}<i class="{{ action.icon }} mr-1"></i>{% endif %}
            {{ action.text }}
        </button>
        {% endfor %}
    </div>
    {% endif %}
</div>
{% endmacro %}
```

#### 2. CSS Styles
```css
/* components.css - Status card specific styles */
.status-card {
    @apply bg-card-bg rounded-card shadow-card border border-card-border p-6 space-y-4 transition-all duration-200;
}

.status-card:hover {
    @apply shadow-lg transform translate-y-[-1px];
}

.status-card.auto-refresh::after {
    content: "";
    @apply absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
```

#### 3. Spring Boot Controller Method
```java
@GetMapping("/provider/{id}/status")
public String providerStatus(@PathVariable String id, Model model) {
    Provider provider = providerService.findById(id);
    
    Map<String, Object> statusCard = Map.of(
        "title", provider.getName() + " Configuration",
        "status", Map.of(
            "type", provider.getStatus().toLowerCase(),
            "text", provider.getStatus(),
            "icon", getStatusIcon(provider.getStatus()),
            "tooltip", "Last updated: " + provider.getLastUpdated()
        ),
        "timestamp", formatTimestamp(provider.getLastUpdated()),
        "progress", Map.of(
            "percentage", provider.getCompletionPercentage(),
            "completed", provider.getCompletedTasks(),
            "total", provider.getTotalTasks(),
            "details_url", "/provider/" + id + "/details"
        ),
        "auto_refresh", true,
        "refresh_url", "/api/provider/" + id + "/status",
        "refresh_interval", 30000,
        "actions", Arrays.asList(
            Map.of("text", "Configure", "variant", "primary", 
                   "onclick", "window.location='/provider/" + id + "/configure'"),
            Map.of("text", "View Logs", "variant", "secondary", 
                   "onclick", "showLogs('" + id + "')")
        )
    );
    
    model.addAttribute("status_card", statusCard);
    return "components/cards/status-card";
}
```

This comprehensive specification provides everything needed to implement the styleguide using Pebble templates, jQuery, and Tailwind CSS 4 in a Java Spring Boot application. The structure maintains the existing design patterns while providing clear integration points for the Spring Boot backend.