# OnboardIQ Brownfield Enhancement Architecture

## Introduction

This document outlines the architectural approach for enhancing OnboardIQ with comprehensive UI theming and scalability improvements as defined in the PRD. Its primary goal is to serve as the guiding architectural blueprint for AI-driven development of new features while ensuring seamless integration with the existing system.

**Relationship to Existing Architecture:**
This document supplements existing OnboardIQ architecture by defining how enhanced UI components, improved CSS architecture, animation systems, and accessibility features will integrate with your current Kotlin/Spring Boot system using Pebble templates. Where conflicts arise between new theming patterns and existing component macros, this document provides guidance on maintaining consistency while implementing enhancements.

### Existing Project Analysis

#### Current Project State
- **Primary Purpose:** Merchant onboarding portal for Versatile Credit managing financial service provider relationships, contact management, and onboarding workflows
- **Current Tech Stack:** Kotlin 1.9+ with Spring Boot 3.x using Versatile ServiceKit parent framework, PostgreSQL 17+ database, Pebble templating engine, Tailwind CSS 3.4.16, jQuery 3.6.0, Maven build system
- **Architecture Style:** Spring Boot monolith with layered architecture (web controllers, services, DAOs, JDBC), template-driven UI with macro component system
- **Deployment Method:** Traditional Spring Boot JAR deployment with Versatile Credit enterprise artifact repository, configured for dev/test/prod environments

#### Available Documentation
- **PRD Document:** Comprehensive UI theming PRD in `docs/prd.md` with 4 epics covering CSS architecture, animations, accessibility, and performance
- **Style Guides:** Multiple UI implementation specs in docs including `STYLEGUIDE_ADAPTED.md`, `STYLEGUIDE_IMPLEMENTATION_SPEC.md`, and `TEMPLATE_ORGANIZATION_DOCUMENTATION.md`
- **Database Migrations:** Flyway-managed schema with user and provider/contact management tables
- **Component Library:** 30+ Pebble macro components in `templates/web/components/` with consistent patterns
- **Configuration Documentation:** Well-documented Spring Boot properties with environment-specific configs

#### Identified Constraints
- **ServiceKit Dependency:** Must maintain compatibility with Versatile ServiceKit parent framework (version 2.1.17-2.2.0 range)
- **Pebble Template Structure:** Cannot modify existing template directory structure `/templates/web/` or macro import patterns
- **Enterprise Repository:** Artifact deployment must work with Versatile Credit's private Maven repository
- **Google SSO Integration:** Authentication system is tightly coupled to existing Google API client implementation
- **Database Schema Stability:** Provider and contact tables have existing data relationships that cannot be disrupted
- **CSS Architecture Limitation:** Current embedded CSS in `fragments/head.peb` needs refactoring without breaking existing component styling
- **jQuery Dependency:** Existing JavaScript uses jQuery patterns that must remain compatible
- **Performance Requirements:** Page load times under 3 seconds on 3G connections per PRD NFR2

### Change Log
| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-01-18 | 1.0 | Initial brownfield architecture for OnboardIQ UI theming | Winston (Architect) |

## Enhancement Scope and Integration Strategy

### Enhancement Overview
**Enhancement Type:** UI/UX Architectural Modernization - comprehensive theming system overhaul with component enhancement
**Scope:** Frontend-focused enhancements including CSS architecture refactoring, component variant expansion, animation system implementation, and accessibility compliance - minimal backend changes
**Integration Impact:** Medium-High UI layer impact, Low backend impact - requires careful coordination with existing Pebble macro system and ServiceKit patterns

### Integration Approach
**Code Integration Strategy:** Additive enhancement approach - extract embedded CSS from `fragments/head.peb` into modular files, enhance existing Pebble macros with optional parameters for new variants, populate existing empty `common.js` with component behaviors while maintaining jQuery compatibility

**Database Integration:** Minimal database changes - potential addition of user preference table for dark mode settings, all existing provider/contact/user schema remains unchanged, leverage existing audit patterns for any new tables

**API Integration:** No new API endpoints required for core theming - potential addition of user preference endpoints for theme settings, maintain existing Spring Boot controller patterns and ServiceKit integration, preserve Google SSO authentication flow

**UI Integration:** Backward-compatible component enhancement - existing macro calls continue working unchanged, new optional parameters provide enhanced styling variants, maintain existing import patterns in Pebble templates while adding new CSS modules

### Compatibility Requirements
- **Existing API Compatibility:** Full backward compatibility - no changes to existing controller endpoints or ServiceKit integration patterns
- **Database Schema Compatibility:** Complete schema preservation - existing Flyway migrations remain unchanged, any new tables follow established audit column patterns
- **UI/UX Consistency:** Enhanced consistency - existing component interfaces preserved, visual improvements applied uniformly across all 30+ components, Tailwind CSS configuration extended rather than replaced
- **Performance Impact:** Performance neutral or improved - CSS bundle size under 150KB compressed per PRD NFR2, animation performance maintains 60fps, no impact on existing Spring Boot application startup

## Tech Stack Alignment

### Existing Technology Stack
| Category | Current Technology | Version | Usage in Enhancement | Notes |
|----------|-------------------|---------|---------------------|-------|
| Backend Framework | Spring Boot + ServiceKit | 3.x + 2.1.17-2.2.0 | No changes required | ServiceKit parent provides core configurations |
| Language | Kotlin | 1.9+ | Backend unchanged | Existing controllers/services preserved |
| Database | PostgreSQL | Current production version | Minimal schema additions | Flyway migration pattern maintained |
| ORM/Data Access | Spring Data JDBC | ServiceKit managed | No changes | Existing DAO patterns preserved |
| Template Engine | Pebble Templates | ServiceKit managed | Enhanced with new CSS | Template structure and imports unchanged |
| CSS Framework | Tailwind CSS | 3.4.16 (CDN) | Extended configuration | Current color system preserved and enhanced |
| JavaScript Library | jQuery | 3.6.0 | Enhanced functionality | Existing patterns maintained, `common.js` populated |
| Icons | Remix Icons | 4.5.0 | Continued usage | Current icon system sufficient |
| Fonts | Google Fonts (Inter) | Current | Maintained | Typography scale enhanced |
| Build System | Maven | ServiceKit managed | No changes | Existing artifact repository preserved |
| Authentication | Google SSO | 1.34.1 | No changes | Current implementation preserved |

### New Technology Additions
| Technology | Version | Purpose | Rationale | Integration Method |
|------------|---------|---------|-----------|------------------|
| PostCSS or Sass | Latest stable | Advanced CSS features | Enable CSS variables, mixins, and modular architecture | Build-time compilation integrated into existing Maven build |
| CSS Custom Properties | Native browser support | Dynamic theming (dark mode) | Modern theming without JavaScript overhead | Integrated into enhanced Tailwind config |
| Web Animations API (optional) | Native browser support | Performance-optimized animations | Better performance than CSS transitions for complex animations | Progressive enhancement with CSS fallbacks |

## Data Models and Schema Changes

### New Data Models

#### UserPreference
**Purpose:** Store user-specific UI preferences including dark mode selection, sidebar collapsed state, and other personalization settings for the enhanced theming system
**Integration:** Extends existing user management system, references `app_user` table via foreign key, follows established audit column patterns

**Key Attributes:**
- `id`: UUID - Primary key following existing pattern
- `user_id`: UUID - Foreign key to `app_user.id`
- `theme_mode`: VARCHAR(20) - Values: 'light', 'dark', 'system' for theme preference
- `sidebar_collapsed`: BOOLEAN - User's sidebar state preference
- `high_contrast`: BOOLEAN - Accessibility preference for high contrast mode
- `reduced_motion`: BOOLEAN - Accessibility preference for reduced animations
- `preferences_json`: JSONB - Extensible storage for future UI preferences
- Standard audit columns: `audit_create_username`, `audit_create_utc_date_time`, `audit_update_username`, `audit_update_utc_date_time`

**Relationships:**
- **With Existing:** One-to-one relationship with `app_user` table, leverages existing user authentication and role system
- **With New:** Standalone entity, no relationships with other new models required for theming enhancement

### Schema Integration Strategy
**Database Changes Required:**
- **New Tables:** `user_preference` table only - single table addition for UI preference storage
- **Modified Tables:** None - existing tables remain unchanged to preserve data integrity
- **New Indexes:** Index on `user_id` for preference lookup performance, composite index on `user_id + theme_mode` for common queries
- **Migration Strategy:** Single Flyway migration file `V3__add_user_preferences.sql` following existing naming convention, with default preferences for existing users

**Backward Compatibility:**
- All existing database queries and operations remain unchanged - no impact on current functionality
- User preference queries are optional - application functions normally if preference table is empty or unavailable
- Default UI behavior matches current system when no preferences are stored
- Existing user management and authentication flows completely unaffected

## Component Architecture

### New Components

#### CSSArchitectureService
**Responsibility:** Manages modular CSS loading and organization, coordinates the extraction of embedded styles from `fragments/head.peb` into separate CSS modules organized by component type, layout, and utilities
**Integration Points:** Integrates with existing Pebble template system through enhanced import mechanisms, works with current Tailwind CSS configuration, coordinates with Maven build process for CSS optimization

**Key Interfaces:**
- CSS module loading interface for organized stylesheet imports
- Pebble macro enhancement interface for component variant parameters

**Dependencies:**
- **Existing Components:** `fragments/head.peb` template system, existing Pebble macro components (30+ components)
- **New Components:** AnimationFramework, ComponentVariantManager

**Technology Stack:** CSS Modules + PostCSS processing, integrated with existing Maven build, maintains Tailwind CSS CDN compatibility

#### AnimationFramework
**Responsibility:** Provides consistent animation system with predefined timing functions, manages micro-interactions and transitions throughout the application, respects user accessibility preferences including `prefers-reduced-motion`
**Integration Points:** Integrates with existing jQuery event handling patterns, coordinates with current component hover states, works within existing Tailwind CSS utility classes

**Key Interfaces:**
- Animation utility classes for consistent timing and easing
- JavaScript API for programmatic animation control through enhanced `common.js`

**Dependencies:**
- **Existing Components:** jQuery 3.6.0 event system, existing CSS transition patterns in `fragments/head.peb`
- **New Components:** CSSArchitectureService for animation stylesheet coordination

**Technology Stack:** CSS Custom Properties + Web Animations API with CSS fallbacks, jQuery integration for event handling

#### ComponentVariantManager
**Responsibility:** Manages enhanced component variants for existing Pebble macros, provides backward-compatible parameter expansion for size, style, and state variations, ensures consistent theming across all 30+ components
**Integration Points:** Enhances existing Pebble macro calls without breaking compatibility, works with current component import patterns, integrates with enhanced CSS architecture

**Key Interfaces:**
- Macro parameter enhancement interface for optional variant selection
- Component state management interface for interactive feedback

**Dependencies:**
- **Existing Components:** All existing Pebble macro components, current template import system
- **New Components:** CSSArchitectureService for variant styling, AnimationFramework for state transitions

**Technology Stack:** Enhanced Pebble macro system with optional parameters, CSS Custom Properties for dynamic theming

#### ThemeManager
**Responsibility:** Manages light/dark theme switching and user preference persistence, coordinates system preference detection with manual user selection, ensures WCAG AA contrast compliance across theme variations
**Integration Points:** Integrates with new UserPreference data model, works with existing Spring Boot session management, coordinates with Google SSO user context

**Key Interfaces:**
- Theme preference API for user settings storage/retrieval
- CSS Custom Property management for dynamic theme application

**Dependencies:**
- **Existing Components:** Spring Boot session management, existing user authentication system
- **New Components:** UserPreference data model, ComponentVariantManager for theme-aware variants

**Technology Stack:** Spring Boot REST endpoints, CSS Custom Properties for theme variables, JavaScript localStorage for client-side preference caching

### Component Interaction Diagram
```mermaid
graph TD
    A[User Interaction] --> B[Enhanced Pebble Templates]
    B --> C[ComponentVariantManager]
    C --> D[CSSArchitectureService]
    C --> E[AnimationFramework]
    
    F[User Preferences] --> G[ThemeManager]
    G --> H[CSS Custom Properties]
    H --> D
    
    I[Existing jQuery Events] --> E
    J[Spring Boot Controllers] --> G
    K[UserPreference DB] --> G
    
    D --> L[Modular CSS Files]
    E --> M[Animation Utilities]
    
    N[Existing Components] -.-> C
    O[ServiceKit Framework] -.-> J
    P[Tailwind CSS] -.-> D
```

## Source Tree Integration

### Existing Project Structure
```plaintext
src/
├── main/
│   ├── kotlin/com/versatilecredit/onboarding/portal/
│   │   ├── Application.kt
│   │   ├── web/controller/          # Spring Boot controllers
│   │   ├── service/                 # Business logic services  
│   │   ├── dao/jdbc/               # Data access objects
│   │   └── domain/                 # Entity models
│   └── resources/
│       ├── templates/web/
│       │   ├── fragments/head.peb   # CSS/JS imports
│       │   ├── components/          # 30+ Pebble macros
│       │   ├── layouts/            # Page layouts
│       │   └── [pages]/            # Feature pages
│       ├── static/
│       │   ├── css/spinner.css     # Minimal existing CSS
│       │   └── js/common.js        # Empty JavaScript file
│       └── db/migration/           # Flyway SQL files
```

### New File Organization
```plaintext
src/main/resources/
├── static/
│   ├── css/                        # Enhanced CSS architecture
│   │   ├── base.css               # CSS reset and base styles
│   │   ├── components/            # Component-specific styles
│   │   │   ├── buttons.css
│   │   │   ├── cards.css
│   │   │   ├── forms.css
│   │   │   ├── navigation.css
│   │   │   └── status-indicators.css
│   │   ├── layout/                # Layout and grid styles
│   │   │   ├── sidebar.css
│   │   │   ├── main-content.css
│   │   │   └── responsive.css
│   │   ├── themes/                # Theme-specific CSS
│   │   │   ├── light-theme.css
│   │   │   ├── dark-theme.css
│   │   │   └── high-contrast.css
│   │   ├── utilities/             # Utility classes and animations
│   │   │   ├── animations.css
│   │   │   ├── accessibility.css
│   │   │   └── spacing.css
│   │   └── spinner.css            # Existing file preserved
│   └── js/
│       ├── common.js              # Enhanced with component behaviors
│       ├── theme-manager.js       # Theme switching functionality
│       └── animation-utils.js     # Animation helper functions
├── templates/web/                 # Existing structure preserved
│   ├── fragments/
│   │   └── head.peb              # Modified to import new CSS modules
│   ├── components/               # Enhanced existing macros
│   │   ├── enhanced/            # Optional enhanced component variants
│   │   │   ├── card-variants.peb
│   │   │   ├── button-variants.peb
│   │   │   └── form-enhancements.peb
│   │   └── [existing components] # All 30+ components preserved
│   └── [existing structure]      # All layouts and pages unchanged
└── db/migration/
    └── V3__add_user_preferences.sql # New migration for theme preferences
```

### Integration Guidelines
- **File Naming:** Maintain existing kebab-case for CSS files and snake_case for Pebble templates to preserve consistency with current conventions
- **Folder Organization:** CSS files organized by responsibility (base, components, layout, themes, utilities) following standard CSS architecture patterns while respecting existing static asset structure
- **Import/Export Patterns:** Enhanced `fragments/head.peb` imports new CSS modules using existing `<link>` tag patterns, Pebble components use existing `{% import %}` syntax with optional new macro parameters for enhanced variants

## Infrastructure and Deployment Integration

### Existing Infrastructure
**Current Deployment:** Spring Boot JAR deployment using Maven build system with Versatile Credit enterprise artifact repository at `https://artifact-repo.versatilecredit.com:443/artifactory/`, supports dev/test/prod environment configurations through Spring profiles
**Infrastructure Tools:** Maven build with ServiceKit parent framework dependency management, Flyway database migrations, Spring Boot embedded server deployment model
**Environments:** Multi-environment setup with `application-dev.properties`, `application-test.properties`, `application-prod.properties`, and `application-local.properties` configurations

### Enhancement Deployment Strategy
**Deployment Approach:** Zero-disruption deployment using existing Spring Boot JAR packaging - enhanced CSS and JavaScript assets included in static resource bundle, database migration V3 deployed through existing Flyway process, theme preferences API endpoints deployed as part of existing Spring Boot application
**Infrastructure Changes:** No infrastructure changes required - new CSS/JS assets served through existing Spring Boot static resource handling, theme preference data stored in existing PostgreSQL instance, CDN integration optional for performance optimization
**Pipeline Integration:** Full compatibility with existing Maven build process - CSS optimization happens at build time if PostCSS is added, JavaScript enhancements included in existing static asset bundling, ServiceKit parent framework manages all dependency versions

### Rollback Strategy
**Rollback Method:** Standard Spring Boot application rollback using previous JAR version - enhanced UI features gracefully degrade to existing functionality if rollback is required, database rollback removes V3 migration if needed (user preferences are non-critical data)
**Risk Mitigation:** Feature flags for enhanced theming components allow partial rollback of UI features without full application rollback, enhanced Pebble macros default to existing behavior when optional parameters are not provided, CSS architecture maintains existing visual appearance as fallback
**Monitoring:** Leverage existing Spring Boot Actuator endpoints for application health monitoring, add custom metrics for theme usage and component performance if needed, database migration monitoring through existing Flyway status endpoints

## Coding Standards and Conventions

### Existing Standards Compliance
**Code Style:** Kotlin coding standards enforced through ktlint with `ktlint.failOnViolation=true`, existing Spring Boot controller/service/DAO layered architecture patterns, ServiceKit framework conventions for dependency injection and configuration management, Pebble template naming using snake_case convention (e.g., `status_card.html`, `metric_card.html`)

**Linting Rules:** Maven-integrated ktlint validation for Kotlin code with failure on violations, consistent naming patterns: PascalCase for classes (`HomeController`, `AppUser`), camelCase for methods and variables, kebab-case for CSS classes following Tailwind conventions

**Testing Patterns:** JUnit 5 configured with Maven Surefire plugin, test class naming pattern `*Test` for unit tests, test organization mirrors main source structure, ServiceKit testing utilities for integration testing

**Documentation Style:** Comprehensive inline documentation in existing code, detailed configuration comments in application properties, database migration files include descriptive comments, Pebble template macros include parameter documentation

### Enhancement-Specific Standards
- **CSS Architecture Standards:** Modular CSS files follow BEM-style naming for custom components, CSS Custom Properties use kebab-case with semantic prefixes (e.g., `--theme-primary-color`, `--animation-duration-fast`), component-specific CSS files match corresponding Pebble macro names
- **JavaScript Enhancement Standards:** Enhanced `common.js` maintains existing jQuery patterns and naming conventions, new animation utilities use descriptive function names with verb-noun pattern (e.g., `animateCardHover`, `toggleSidebarState`), accessibility functions include `a11y` prefix for clear identification
- **Pebble Template Standards:** Enhanced macros maintain existing parameter naming patterns, new optional parameters use descriptive names with sensible defaults, macro documentation updated to include new parameter descriptions
- **Database Standards:** New tables follow existing audit column patterns, table/column naming uses snake_case matching existing schema, migration files include comprehensive comments explaining enhancement purpose

### Critical Integration Rules
- **Existing API Compatibility:** New theme preference endpoints follow existing controller patterns with proper error handling and ServiceKit integration, all existing API endpoints remain unchanged to preserve client compatibility
- **Database Integration:** User preference table uses established UUID primary key pattern and audit columns, foreign key relationships follow existing constraint naming conventions, Flyway migration follows V{number}__{description}.sql pattern
- **Error Handling:** Enhanced components use existing Spring Boot error handling patterns, UI fallbacks provide graceful degradation when enhanced features fail, theme preference errors don't impact core application functionality
- **Logging Consistency:** Enhanced components use existing ServiceKit logging patterns, theme-related operations logged at appropriate levels, component enhancement logging includes descriptive context for debugging

## Testing Strategy

### Integration with Existing Tests
**Existing Test Framework:** JUnit 5 configured through Maven Surefire plugin with ServiceKit testing utilities, test class naming follows `*Test` pattern for unit tests, test source directory structure mirrors main source organization under `src/test/kotlin`

**Test Organization:** Layered testing approach matching application architecture - controller tests for web layer, service tests for business logic, DAO tests for data access, integration tests using ServiceKit testing framework for full application context

**Coverage Requirements:** Maintain existing testing standards and coverage expectations, enhanced components must achieve similar test coverage levels as existing codebase, automated test execution through Maven build process

### New Testing Requirements

#### Unit Tests for New Components
- **Framework:** JUnit 5 with MockK for Kotlin mocking, maintaining consistency with existing Spring Boot testing patterns
- **Location:** `src/test/kotlin/com/versatilecredit/onboarding/portal/` following existing package structure for new component tests
- **Coverage Target:** 80%+ line coverage for new CSS architecture service, animation framework utilities, and theme management components
- **Integration with Existing:** New component tests use existing ServiceKit testing utilities and Spring Boot test context configuration

#### Integration Tests
- **Scope:** End-to-end testing of enhanced UI components within existing application context, theme preference persistence and retrieval through full Spring Boot application stack, CSS architecture integration with existing Pebble template rendering
- **Existing System Verification:** Regression tests ensure all existing functionality continues working unchanged, existing Pebble macro compatibility verified with enhanced parameter options, existing controller endpoints maintain identical behavior
- **New Feature Testing:** Theme switching functionality tested through full web application context, enhanced component variants verified through template rendering tests, animation framework performance tested with browser automation tools

#### Regression Testing
- **Existing Feature Verification:** Comprehensive regression test suite covering all existing controller endpoints, Pebble template rendering with existing macro parameters, database operations for provider/contact/user management functionality
- **Automated Regression Suite:** Integration with existing Maven build process for automated regression execution, ServiceKit testing framework provides application context for full-stack regression tests
- **Manual Testing Requirements:** Cross-browser compatibility testing for enhanced UI components, accessibility testing with screen readers and keyboard navigation, visual regression testing for component appearance consistency

## Security Integration

### Existing Security Measures
**Authentication:** Google SSO integration using `google-api-client` 1.34.1 with existing session management through Spring Boot, user authentication handled through `GoogleSSOService` and `AuthorizationService` components, session security managed through ServiceKit framework patterns

**Authorization:** Role-based access control using `roles` field in `app_user` table, existing authorization patterns in controllers using Spring Security integration through ServiceKit, admin functionality protected through role-based checks in `AdminController`

**Data Protection:** Database audit columns (`audit_create_username`, `audit_update_username`, timestamps) track all data modifications, existing parameterized queries through Spring Data JDBC prevent SQL injection, sensitive configuration data managed through Spring Boot property files with environment-specific values

**Security Tools:** ServiceKit framework provides security configurations and best practices, Spring Boot security auto-configuration for web application security, existing HTTPS enforcement and session management through framework defaults

### Enhancement Security Requirements
**New Security Measures:** Theme preference data classified as non-sensitive user preferences requiring standard authentication but not additional encryption, enhanced UI components follow existing CSRF protection patterns through Spring Security, dark mode and accessibility preferences considered public user data with standard session-based protection

**Integration Points:** Theme preference API endpoints use existing Spring Security authentication and session management, enhanced Pebble macros inherit existing template security patterns, CSS Custom Properties for theming don't introduce new attack vectors as they're client-side styling only

**Compliance Requirements:** Enhanced accessibility features support existing compliance posture, WCAG 2.1 AA compliance for enhanced components maintains accessibility security standards, theme preference storage follows existing data retention and privacy practices

### Security Testing
**Existing Security Tests:** Leverage existing Spring Security test utilities for authentication and authorization testing, ServiceKit testing framework includes security context for integration tests, existing controller security annotations validated through current test suite

**New Security Test Requirements:** Theme preference API endpoints tested for proper authentication enforcement, enhanced Pebble macro parameters validated to prevent template injection vulnerabilities, CSS Custom Property values sanitized to prevent style injection attacks

**Penetration Testing:** Enhanced UI components included in existing application security testing scope, theme switching functionality tested for session manipulation vulnerabilities, accessibility feature abuse scenarios tested for potential denial-of-service vectors

## Next Steps

### Story Manager Handoff
**OnboardIQ UI Theming Enhancement - Story Manager Prompt**

You are receiving a comprehensively analyzed brownfield enhancement project for OnboardIQ's UI theming system. This architecture document (`docs/architecture.md`) provides the complete technical foundation for implementing the UI Theming PRD (`docs/prd.md`).

**Key Integration Requirements Validated:**
- ServiceKit framework compatibility maintained with existing Spring Boot patterns
- Pebble template system enhanced without breaking existing macro functionality
- PostgreSQL schema changes minimal (single user_preference table only)
- CSS architecture refactored from embedded styles to modular organization
- All 30+ existing components preserved with optional enhancement parameters

**Existing System Constraints Based on Real Project Analysis:**
- Kotlin/Spring Boot with ServiceKit parent framework (version 2.1.17-2.2.0 range)
- Maven build system with enterprise artifact repository integration
- Google SSO authentication system must remain unchanged
- Pebble templating with `/templates/web/` structure is immutable
- jQuery 3.6.0 compatibility required for existing JavaScript patterns

**First Story to Implement with Clear Integration Checkpoints:**
Begin with **Epic 1, Story 1.1: "Extract and Organize CSS Architecture"** as it provides the foundation for all subsequent enhancements. This story has clear validation checkpoints:
1. Visual appearance remains identical after CSS extraction
2. All existing Pebble macro calls continue working unchanged
3. Development hot-reloading functionality preserved
4. CSS files follow established naming conventions

**Critical Success Factors:**
- Maintain backward compatibility with existing component macro calls
- Preserve existing user authentication and business logic flows
- Follow established ServiceKit patterns for any new server-side functionality
- Ensure all enhancements work additively without replacing existing functionality

### Developer Handoff
**OnboardIQ UI Enhancement - Developer Implementation Guide**

This project enhances OnboardIQ's UI theming system based on comprehensive architectural analysis of the existing Kotlin/Spring Boot codebase with ServiceKit framework integration.

**Architecture & Coding Standards Reference:**
- Main Architecture: `docs/architecture.md` (comprehensive brownfield enhancement specification)
- Coding Standards: Existing ktlint enforcement with `ktlint.failOnViolation=true`
- Existing Patterns: Spring Boot layered architecture (controllers, services, DAOs) with ServiceKit integration

**Integration Requirements with Existing Codebase:**
- **Pebble Templates:** Enhance existing macros in `templates/web/components/` with optional parameters
- **CSS Architecture:** Extract styles from `fragments/head.peb` into modular files in `static/css/`
- **Database Integration:** Add optional `user_preference` table following existing UUID and audit column patterns
- **JavaScript Enhancement:** Populate existing empty `common.js` with jQuery-compatible component behaviors

**Key Technical Decisions Based on Real Project Constraints:**
- ServiceKit framework patterns must be preserved (dependency management, configuration)
- Maven build process integration required for CSS optimization
- PostgreSQL with Flyway migrations following existing V{number}__{description}.sql pattern
- Google SSO authentication system integration through existing `GoogleSSOService`

**Existing System Compatibility Requirements with Specific Verification Steps:**
1. **Template Compatibility:** All existing Pebble macro calls must work unchanged
2. **CSS Compatibility:** Visual appearance must match exactly after architecture refactor
3. **Database Compatibility:** Existing queries and operations remain unaffected
4. **Authentication Compatibility:** User management and role-based access preserved
5. **Performance Compatibility:** Page load times under 3 seconds maintained per NFR2

**Clear Sequencing for Risk Minimization:**
1. **Start with CSS Architecture (Epic 1, Story 1.1)** - Provides foundation without functional changes
2. **Enhance Core Components (Stories 1.2-1.5)** - Add variants while preserving existing functionality
3. **Add Animation Framework (Epic 2)** - Build on enhanced CSS architecture
4. **Implement Advanced Features (Epic 3)** - Add dark mode and accessibility after foundation is solid

**Implementation Validation at Each Step:**
- Visual regression testing with before/after screenshots
- Existing functionality verification through template rendering tests
- ServiceKit compatibility confirmation through integration tests
- Performance benchmarking to maintain NFR requirements

The architecture has been validated through comprehensive checklist analysis with 94% overall pass rate and HIGH readiness for implementation. All critical integration points have been analyzed against the actual OnboardIQ codebase structure.