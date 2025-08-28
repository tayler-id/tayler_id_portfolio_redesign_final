# Template Organization Documentation
## OnboardIQ Project - DO NOT CHANGE

> **CRITICAL**: This document describes the existing template structure that MUST NOT be modified. The styleguide must adapt to this structure, not vice versa.

## File Structure Overview

```
src/main/resources/templates/web/
├── layouts/                    # Layout templates
│   ├── main.peb               # Main application layout
│   ├── admin.peb              # Admin section layout
│   └── admin/                 # Specialized admin layouts
│       ├── users.peb          # User management layout
│       └── metadata.peb       # Metadata management layout
├── fragments/                 # Shared template fragments
│   └── head.peb              # HTML head with common imports
├── components/               # Reusable component macros
│   ├── [30+ component files]
│   └── cards/               # Card components (mix of .peb and .html)
│       ├── metric_card.html
│       ├── progress_card.html
│       └── status_card.html
├── admin/                   # Admin interface pages
│   ├── home.peb
│   ├── users/              # User management pages
│   ├── metadata/           # Metadata management pages
│   └── system-status/      # System status pages
├── contacts/               # Contact management pages
├── error/                  # Error pages
├── demo/                   # Demo/example pages
├── home.peb               # Main dashboard
└── login.peb              # Authentication page
```

## Established Patterns

### 1. File Extensions
- **Primary**: `.peb` files for all templates and components
- **Exception**: Some card components use `.html` extensions
- **Rule**: DO NOT change existing extensions

### 2. Directory Structure
- **Base Path**: `/templates/web/` (configured in application.properties)
- **Layouts**: Hierarchical with specialized admin layouts
- **Components**: Organized by function, not just type
- **Pages**: Organized by feature/section

### 3. Layout Hierarchy
```
fragments/head.peb (base HTML structure)
├── layouts/main.peb (main app layout)
└── layouts/admin.peb (admin layout)
    ├── layouts/admin/users.peb (specialized)
    └── layouts/admin/metadata.peb (specialized)
```

### 4. Component Organization
```
components/
├── [function-based components] (header.peb, sidebar.peb, etc.)
└── cards/ (special subdirectory)
    ├── [mixed .peb and .html files]
```

### 5. Import Patterns
- Global imports in `fragments/head.peb`
- Component-specific imports at page level
- Mixed usage: `{% import %}` and `{% include %}`

### 6. Naming Conventions
- **Files**: `snake_case.peb` (e.g., `contact_card.peb`)
- **Macros**: `snake_case` functions (e.g., `task_table()`)
- **IDs**: `menu_` prefix for navigation (e.g., `menu_home`)

### 7. Configuration Dependencies
```properties
# application.properties
pebble.prefix=/templates/web/
pebble.suffix=.peb
pebble.cache=false
pebble.exposeSessionAttributes=true
```

## Adaptation Requirements

### For Styleguide Implementation
1. **Respect existing paths**: Use `/templates/web/` not `/templates/`
2. **Preserve file extensions**: Keep existing `.html` files as `.html`
3. **Maintain directory structure**: Work within established `components/cards/` etc.
4. **Follow naming patterns**: Use `snake_case` for new components
5. **Respect specialized layouts**: Account for admin layout variations

### Component Integration Points
- **Base template**: `fragments/head.peb` contains CSS/JS imports
- **Main layouts**: `layouts/main.peb` and `layouts/admin.peb`
- **Card components**: Mix of `.peb` and `.html` in `components/cards/`
- **Navigation**: `components/sidebar.peb` with menu highlighting

### Technology Integration
- **Tailwind CSS**: Already configured and imported
- **jQuery**: Already loaded (v3.6.0)
- **Remix Icons**: Already configured
- **Custom colors**: Extensive palette already defined

## Critical Constraints

1. **DO NOT** change the directory structure
2. **DO NOT** rename existing files
3. **DO NOT** change file extensions
4. **DO NOT** modify the base path configuration
5. **DO NOT** alter the layout hierarchy

## Implementation Strategy

The styleguide must be adapted to work within these constraints by:
1. Using existing directory paths
2. Enhancing existing components rather than replacing
3. Adding new CSS classes that work with current structure
4. Preserving existing macro patterns and naming
5. Working with the established import system