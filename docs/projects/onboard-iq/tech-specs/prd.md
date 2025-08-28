# OnboardIQ UI Theming Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Enhance OnboardIQ UI with a cohesive, modern design system that improves usability and visual hierarchy
- Reorganize CSS architecture from embedded styles to maintainable, modular stylesheets  
- Expand component variants and interactive states to create more engaging user experiences
- Add animations and micro-interactions that provide visual feedback without compromising performance
- Ensure accessibility compliance while maintaining the existing Pebble template structure
- Create a scalable theming system that supports future design iterations and component additions

### Background Context

OnboardIQ is Versatile Credit's merchant onboarding portal built with Kotlin/Spring Boot and Pebble templates. The application currently has a functional UI with Tailwind CSS, comprehensive color palette, and 30+ reusable macro components, but the styling system needs enhancement. CSS styles are embedded in template files, component variants are limited, and interactive feedback is minimal. The existing architecture provides a solid foundation with consistent patterns, but lacks the polish and engagement expected of modern web applications. This PRD addresses theming improvements while preserving the robust template structure and component system already in place.

### Change Log
| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-01-18 | 1.0 | Initial PRD for OnboardIQ UI Theming | Mary (Business Analyst) |

## Requirements

### Functional

**FR1:** The system shall move all embedded CSS from `fragments/head.peb` to separate, modular CSS files organized by component type and functionality.

**FR2:** The system shall enhance existing Pebble macro components with additional variant parameters (size, style, state) while maintaining backward compatibility.

**FR3:** The system shall implement a comprehensive animation system with smooth transitions for component state changes, page navigation, and user interactions.

**FR4:** The system shall provide enhanced interactive states (hover, focus, active, disabled) for all actionable components including buttons, cards, and navigation elements.

**FR5:** The system shall implement a responsive typography scale that enhances readability across device sizes while maintaining the Inter font family.

**FR6:** The system shall create enhanced status visualization components with improved color coding, icons, and progress indicators for onboarding workflows.

**FR7:** The system shall implement accessible navigation patterns including keyboard navigation, ARIA labels, and screen reader support for all interactive elements.

**FR8:** The system shall provide a dark mode toggle capability with appropriate color scheme variations for all components.

**FR9:** The system shall enhance form components with improved validation feedback, input states, and error messaging that integrates with the existing backend validation.

**FR10:** The system shall implement loading states and skeleton screens for data-heavy components like provider lists and dashboard metrics.

### Non Functional

**NFR1:** All theming enhancements must maintain the existing Pebble template structure and file naming conventions without requiring configuration changes.

**NFR2:** CSS bundle size must not exceed 150KB compressed to maintain page load performance under 3 seconds on 3G connections.

**NFR3:** All animations and transitions must complete within 300ms to ensure perceived performance remains snappy.

**NFR4:** The theming system must achieve WCAG 2.1 AA compliance for contrast ratios, keyboard accessibility, and screen reader compatibility.

**NFR5:** All component variants must be backward compatible with existing macro calls to prevent breaking changes during rollout.

**NFR6:** The enhanced UI must maintain visual consistency across all browsers supporting the existing browser matrix (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).

**NFR7:** CSS architecture must support component-level maintainability with clear separation of concerns between layout, theming, and behavior.

**NFR8:** Interactive elements must provide haptic or visual feedback within 100ms of user interaction to maintain responsive feel.

## User Interface Design Goals

### Overall UX Vision

Create a polished, professional interface that transforms OnboardIQ from a functional tool into an engaging platform that merchant onboarding teams actively enjoy using. The enhanced UI should reduce cognitive load through improved visual hierarchy, provide clear feedback for all user actions, and streamline complex workflows with intuitive navigation patterns. The design should feel modern and trustworthy, reflecting Versatile Credit's professional brand while making data-heavy tasks like provider management and progress tracking feel effortless.

### Key Interaction Paradigms

- **Progressive Disclosure**: Complex forms and data views reveal details on-demand rather than overwhelming users with information
- **Contextual Actions**: Primary actions are prominently placed where users expect them, with secondary actions accessible but not distracting
- **Status-Driven Design**: Visual elements clearly communicate system state, progress, and next steps throughout onboarding workflows
- **Responsive Feedback**: Every user interaction provides immediate visual or haptic feedback to confirm actions were received
- **Smart Defaults**: Forms and filters remember user preferences and pre-populate common selections to reduce repetitive input

### Core Screens and Views

- **Login Screen**: Clean, branded authentication with Google SSO integration
- **Main Dashboard**: Enhanced metrics cards with improved data visualization and quick-action access
- **Provider Management**: Streamlined provider listing with advanced filtering, sorting, and bulk actions
- **Provider Detail**: Comprehensive provider profile with tabbed organization and inline editing capabilities
- **Contact Management**: Role-based contact organization with communication history and assignment tracking
- **User Administration**: System user management with role-based permissions and activity monitoring
- **System Status**: Real-time system health monitoring with alert management and performance metrics
- **Onboarding Progress**: Visual workflow tracking with milestone indicators and task management

### Accessibility: WCAG AA

The enhanced UI will achieve WCAG 2.1 AA compliance including:
- Minimum 4.5:1 contrast ratios for normal text, 3:1 for large text
- Full keyboard navigation with visible focus indicators
- Screen reader compatibility with proper ARIA labels and semantic markup
- Alternative text for all informational graphics and status indicators
- Consistent navigation patterns and predictable interface behavior

### Branding

Leverage OnboardIQ's existing comprehensive color palette while enhancing visual hierarchy:
- Primary brand colors (#8E6FF7, #6366f1, #3b82f6) for key actions and navigation
- Extended status color system for workflow states and progress indicators  
- Inter typography with enhanced weight and sizing scale for improved readability
- Consistent use of Remix Icons with potential for custom iconography where needed
- Professional, clean aesthetic that reinforces trust and reliability for financial services context

### Target Device and Platforms: Web Responsive

Web responsive design optimized for:
- **Primary**: Desktop browsers (1440px+ viewports) for power users managing complex workflows
- **Secondary**: Tablet devices (768px-1200px) for mobile access to key information
- **Tertiary**: Mobile phones (375px+) for essential functions like status checking and basic provider lookup
- Cross-browser compatibility maintained for Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Technical Assumptions

### Repository Structure: Monorepo

The enhanced theming will be implemented within the existing OnboardIQ monorepo structure, maintaining the current Maven-based Kotlin/Spring Boot project organization. All CSS, JavaScript, and template enhancements will be integrated into the existing `src/main/resources/templates/web/` and static asset directories without requiring separate repositories or build processes.

### Service Architecture

**CRITICAL DECISION** - The theming enhancements will integrate with the existing Spring Boot monolith architecture using:
- **Backend**: Existing Kotlin/Spring Boot with Pebble template engine (no changes to server-side architecture)
- **Frontend Enhancement**: Enhanced CSS/JavaScript within existing Pebble macro system
- **Asset Management**: Leverage existing static resource handling with potential CDN integration for performance
- **Template Structure**: Maintain current Pebble template hierarchy and macro system while enhancing with additional CSS classes and JavaScript behaviors

### Testing Requirements

**CRITICAL DECISION** - Theming enhancements will include:
- **Visual Regression Testing**: Screenshot-based testing for component variants across browsers
- **Accessibility Testing**: Automated WCAG compliance validation integrated into existing test pipeline
- **Performance Testing**: CSS bundle size monitoring and page load performance benchmarks
- **Cross-browser Testing**: Manual testing convenience methods for verifying theming across supported browser matrix
- **Component Testing**: Unit tests for any JavaScript enhancement behaviors and CSS utility classes

### Additional Technical Assumptions and Requests

- **CSS Architecture**: Implement PostCSS or Sass compilation for advanced CSS features while maintaining Tailwind CSS foundation
- **JavaScript Enhancement**: Populate existing empty `common.js` with component interaction behaviors, maintaining jQuery compatibility where used
- **Asset Optimization**: Implement CSS/JS minification and compression in production builds
- **Template Compatibility**: All enhancements must work with existing Pebble macro parameter patterns and naming conventions
- **Performance Budget**: Maintain existing page load metrics while enhancing visual capabilities
- **Deployment Integration**: Theming assets must integrate with existing CI/CD pipeline without requiring additional deployment steps
- **Browser Support**: Enhanced features must gracefully degrade for older browsers within supported matrix
- **Development Experience**: Maintain existing development workflow with hot reloading for template and CSS changes

## Epic List

**Epic 1: CSS Architecture Foundation & Component Enhancement**: Establish modular CSS architecture, extract embedded styles, and enhance core components with improved variants and interactive states.

**Epic 2: Animation System & Visual Feedback**: Implement comprehensive animation framework, micro-interactions, and loading states that provide smooth user feedback throughout the application.

**Epic 3: Advanced Component Features & Accessibility**: Add sophisticated component capabilities including dark mode, enhanced form states, and full WCAG AA accessibility compliance.

**Epic 4: Performance Optimization & Cross-Browser Polish**: Optimize theming assets, implement visual regression testing, and ensure consistent experience across all supported browsers.

## Epic 1: CSS Architecture Foundation & Component Enhancement

**Goal:** Establish a maintainable, modular CSS architecture while enhancing OnboardIQ's existing components with improved visual hierarchy, interactive states, and variant options. This epic transforms the current embedded CSS approach into a scalable system and provides immediate visual improvements to core user interface elements.

### Story 1.1: Extract and Organize CSS Architecture

As a developer,
I want to extract all embedded CSS from `fragments/head.peb` into organized, modular CSS files,
so that styles are maintainable, cacheable, and follow modern CSS architecture patterns.

#### Acceptance Criteria
1. All CSS currently in `fragments/head.peb` is moved to separate files organized by component type (layout, components, utilities)
2. CSS file structure follows logical organization: `base.css`, `components/`, `layout/`, `utilities/`
3. Import statements in `head.peb` reference the new modular CSS files
4. All existing visual appearance remains identical after refactoring
5. CSS files are minified and optimized for production deployment
6. Development hot-reloading continues to work with new CSS file structure

### Story 1.2: Enhance Core Navigation Components

As a user,
I want improved navigation with better visual hierarchy and interactive feedback,
so that I can more easily navigate between sections and understand my current location.

#### Acceptance Criteria
1. Sidebar navigation includes enhanced hover states with smooth transitions
2. Active navigation items have improved visual distinction with background and text color changes
3. Navigation icons integrate seamlessly with text labels using consistent spacing
4. Submenu items display with clear hierarchy through indentation and styling
5. Navigation components work consistently across all viewport sizes
6. Focus states for keyboard navigation meet WCAG AA contrast requirements

### Story 1.3: Enhance Status Card Components

As a user viewing dashboard metrics,
I want status cards with improved visual hierarchy and data presentation,
so that I can quickly understand key information and system status at a glance.

#### Acceptance Criteria
1. Status cards include enhanced typography scale with clear primary/secondary information hierarchy
2. Metric values use prominent sizing and positioning for quick scanning
3. Card hover states provide subtle visual feedback without disrupting layout
4. Status indicators use consistent color coding with improved contrast ratios
5. Card layouts remain responsive and accessible on mobile devices
6. Loading states display skeleton placeholders while data loads

### Story 1.4: Enhance Form Input Components

As a user filling out forms,
I want form inputs with clear visual states and improved feedback,
so that I can efficiently complete data entry with confidence in my actions.

#### Acceptance Criteria
1. Input fields include distinct visual states: default, focus, filled, error, and disabled
2. Focus states use consistent outline styling that meets accessibility standards
3. Error states integrate with existing backend validation to show clear feedback messages
4. Input labels and placeholder text use optimal typography and contrast ratios
5. Form components maintain consistent spacing and alignment across different input types
6. Form validation feedback appears immediately and clearly indicates required actions

### Story 1.5: Enhance Button and Action Components

As a user taking actions throughout the application,
I want buttons with clear visual hierarchy and interactive feedback,
so that I can confidently identify and execute primary and secondary actions.

#### Acceptance Criteria
1. Button variants (primary, secondary, tertiary) have distinct visual styling with appropriate contrast
2. Button states (default, hover, active, disabled, loading) provide clear feedback through color and animation
3. Button sizing follows consistent scale (small, medium, large) with appropriate padding and typography
4. Icon buttons maintain accessibility with proper ARIA labels and focus states
5. Action buttons integrate seamlessly with existing Pebble macro parameters
6. Destructive actions (delete, remove) use appropriate warning colors and confirmation patterns

## Epic 2: Animation System & Visual Feedback

**Goal:** Implement a comprehensive animation framework that provides smooth, purposeful visual feedback throughout OnboardIQ. This epic focuses on micro-interactions, transitions, and loading states that enhance user experience by providing clear system response and creating a more engaging, professional interface feel.

### Story 2.1: Implement Core Animation Framework

As a developer,
I want a consistent animation system with predefined timing functions and transitions,
so that all interface animations follow consistent patterns and maintain optimal performance.

#### Acceptance Criteria
1. CSS animation framework defines consistent timing functions (ease-in-out, bounce, fade) for all transitions
2. Animation durations follow standard scale (fast: 150ms, normal: 300ms, slow: 500ms) with consistent application
3. Reduced motion preferences are respected with `prefers-reduced-motion` media queries
4. Animation framework integrates with existing Tailwind CSS utilities without conflicts
5. Performance testing confirms animations maintain 60fps on target devices
6. Animation classes can be easily applied to existing Pebble macro components

### Story 2.2: Add Page and View Transitions

As a user navigating between pages,
I want smooth transitions that provide visual continuity,
so that the interface feels cohesive and I maintain context during navigation.

#### Acceptance Criteria
1. Page transitions include fade-in effects for main content areas with 300ms duration
2. Navigation between provider details and listing includes smooth transitions
3. Modal dialogs and overlays appear with slide-up or fade-in animations
4. Page loading states display with skeleton screens for data-heavy views
5. Back navigation maintains transition direction consistency
6. Transitions work consistently across all supported browsers without performance degradation

### Story 2.3: Enhance Interactive Component Feedback

As a user interacting with buttons, cards, and controls,
I want immediate visual feedback that confirms my actions,
so that I feel confident the system is responding to my interactions.

#### Acceptance Criteria
1. Button clicks include subtle scale or color transition feedback (100ms response time)
2. Card hover states include smooth elevation changes with shadow transitions
3. Form input focus states animate smoothly between default and focused appearance
4. Dropdown menus and selects include smooth expand/collapse animations
5. Status changes (like task completion) include celebration micro-animations
6. All interactive feedback maintains accessibility compliance and respects reduced motion preferences

### Story 2.4: Implement Progress and Loading States

As a user waiting for data to load or actions to complete,
I want clear visual indicators of system activity and progress,
so that I understand the system is working and have realistic expectations for completion.

#### Acceptance Criteria
1. Data-heavy components (provider lists, dashboard metrics) display skeleton loading screens
2. Form submissions show loading states on buttons with spinner animations
3. Progress bars for onboarding workflows include smooth animation between states
4. Long-running operations display estimated completion time with animated progress indicators
5. Loading states provide appropriate messaging about what's happening
6. Timeout handling includes clear messaging and retry options with smooth transitions

### Story 2.5: Add Contextual Animation Enhancements

As a user working with dynamic content and status changes,
I want animations that draw attention to important updates and changes,
so that I notice critical information without feeling overwhelmed by motion.

#### Acceptance Criteria
1. Status pill changes animate smoothly between different states (blocked to in-progress, etc.)
2. New data appearing in lists includes subtle slide-in animations
3. Error messages appear with gentle bounce or shake animations to draw attention
4. Success confirmations include brief celebration animations (checkmarks, color pulses)
5. Notification toasts slide in and auto-dismiss with smooth timing
6. Context-sensitive help tooltips appear with smooth fade-in and positioning

## Epic 3: Advanced Component Features & Accessibility

**Goal:** Implement sophisticated component capabilities including dark mode support, enhanced form validation feedback, advanced accessibility features, and specialized components for complex data workflows. This epic elevates OnboardIQ to enterprise-grade usability standards while maintaining the existing template architecture.

### Story 3.1: Implement Dark Mode Theme Support

As a user working long hours with OnboardIQ,
I want a dark mode option that reduces eye strain,
so that I can comfortably use the application during extended work sessions.

#### Acceptance Criteria
1. Dark mode toggle in user preferences switches between light and dark color schemes
2. All components adapt to dark mode using CSS custom properties for color theming
3. Dark mode maintains WCAG AA contrast ratios for all text and interactive elements
4. User's dark mode preference persists across browser sessions
5. System preference detection automatically sets initial theme based on OS settings
6. Color transitions between modes are smooth and don't cause jarring visual changes

### Story 3.2: Enhance Form Validation and Error States

As a user entering provider and contact information,
I want comprehensive form validation with clear, helpful error messaging,
so that I can efficiently correct mistakes and successfully complete data entry.

#### Acceptance Criteria
1. Real-time validation provides immediate feedback as users type in form fields
2. Error messages appear contextually near relevant fields with clear, actionable guidance
3. Field-level validation integrates seamlessly with existing backend validation system
4. Success states confirm valid input with subtle visual indicators (checkmarks, green borders)
5. Form submission prevents with comprehensive error summary if any fields are invalid
6. Error states maintain accessibility with proper ARIA attributes and screen reader support

### Story 3.3: Implement Advanced Data Table Features

**Prerequisites:** Story 3.0 (Fix Contact Filtering System) must be completed first

As a user managing large lists of providers and contacts,
I want enhanced table functionality with sorting, filtering, and bulk actions,
so that I can efficiently work with large datasets and perform common operations.

#### Acceptance Criteria
1. Sortable column headers provide visual indicators and smooth state transitions
2. Advanced filtering options build upon the fixed base filtering system with contextual overlays, search and selection controls
3. Row selection enables bulk actions with clear feedback about selected items
4. Pagination controls include smooth transitions and keyboard navigation support  
5. Column resizing maintains table layout stability with drag handles and visual feedback
6. Export functionality provides clear progress indication and download confirmation
7. All advanced features integrate seamlessly with the corrected Partner, Vertical, Status, and Response filtering from Story 3.0

### Story 3.4: Complete WCAG AA Accessibility Compliance

As a user with accessibility needs,
I want full keyboard navigation and screen reader support throughout OnboardIQ,
so that I can effectively use all features regardless of my interaction method.

#### Acceptance Criteria
1. All interactive elements support keyboard navigation with visible focus indicators
2. Screen readers receive complete, accurate information through proper ARIA labeling
3. Color is never the only means of conveying information (status, errors, etc.)
4. Focus management maintains logical tab order throughout complex workflows
5. Alternative text describes all informational graphics, charts, and status indicators
6. Form labels and instructions are programmatically associated with their controls

### Story 3.5: Implement Advanced Status and Progress Visualization

As a user tracking merchant onboarding progress,
I want sophisticated progress indicators and status visualizations,
so that I can quickly understand workflow states and identify bottlenecks or issues.

#### Acceptance Criteria
1. Multi-step progress indicators show current position with completion percentages
2. Status timelines display historical changes with timestamps and responsible parties
3. Progress cards include visual indicators for blocked, at-risk, or overdue items
4. Interactive status changes provide confirmation dialogs with transition animations
5. Workflow visualization includes estimated completion times and milestone tracking
6. Status dashboard provides filtering and grouping options with smooth transitions

## Epic 4: Performance Optimization & Cross-Browser Polish

**Goal:** Optimize theming assets for production performance, implement comprehensive testing infrastructure, and ensure consistent visual quality across all supported browsers and devices. This epic ensures the enhanced UI meets enterprise performance standards and provides a reliable experience for all users.

### Story 4.1: Optimize CSS and JavaScript Asset Performance

As a user accessing OnboardIQ from various network conditions,
I want fast-loading pages with optimized assets,
so that the enhanced UI doesn't compromise application performance or usability.

#### Acceptance Criteria
1. CSS bundle size remains under 150KB compressed with all theming enhancements included
2. JavaScript enhancements are minified and compressed for production deployment
3. Critical CSS is inlined for above-the-fold content to minimize render-blocking resources
4. Non-critical animations and interactions are loaded asynchronously after page render
5. Asset versioning and cache-busting ensure users receive updated styles without browser cache issues
6. Performance monitoring confirms page load times remain under 3 seconds on 3G connections

### Story 4.2: Implement Visual Regression Testing

As a developer maintaining UI consistency,
I want automated visual testing that catches unintended styling changes,
so that component appearance remains consistent across code changes and browser updates.

#### Acceptance Criteria
1. Screenshot-based testing captures visual states for all major components and page layouts
2. Visual diff testing identifies changes in component appearance across code deployments
3. Testing covers multiple viewport sizes (desktop, tablet, mobile) for responsive behavior
4. Browser matrix testing includes Chrome, Firefox, Safari, and Edge on supported versions
5. Test suite integrates with existing CI/CD pipeline for automated execution
6. Visual regression reports provide clear before/after comparisons for review

### Story 4.3: Cross-Browser Compatibility and Graceful Degradation

As a user accessing OnboardIQ from different browsers and devices,
I want consistent appearance and functionality regardless of my browser choice,
so that I can rely on the application working properly in my preferred environment.

#### Acceptance Criteria
1. All theming enhancements work consistently across Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
2. Advanced features gracefully degrade in older browsers without breaking core functionality
3. CSS feature queries ensure modern enhancements don't interfere with baseline experience
4. Animation and interaction fallbacks provide static alternatives when features aren't supported
5. Font loading strategies ensure text remains readable during font download
6. Color scheme preferences work correctly across different operating systems

### Story 4.4: Accessibility Testing and Compliance Validation

As a user with accessibility needs,
I want assurance that all interface enhancements meet accessibility standards,
so that I can confidently use OnboardIQ with assistive technologies.

#### Acceptance Criteria
1. Automated accessibility testing validates WCAG 2.1 AA compliance for all enhanced components
2. Screen reader testing confirms proper navigation and content announcement
3. Keyboard navigation testing validates focus management and interaction patterns
4. Color contrast analysis ensures all text meets minimum contrast ratios in both light and dark modes
5. High contrast mode compatibility maintains usability with system accessibility settings
6. Accessibility audit reports integrate with CI/CD pipeline for continuous monitoring

### Story 4.5: Production Deployment and Monitoring

As a system administrator deploying OnboardIQ enhancements,
I want reliable deployment processes and monitoring for the enhanced UI,
so that users receive a stable, high-quality experience in production.

#### Acceptance Criteria
1. Deployment pipeline includes asset optimization and integrity verification
2. CSS and JavaScript assets are served from CDN with appropriate caching headers
3. Real user monitoring tracks performance metrics for theming-related resources
4. Error monitoring captures and reports any client-side issues related to enhanced components
5. Feature flags allow gradual rollout of theming enhancements to user groups
6. Rollback procedures enable quick reversion to previous UI state if issues arise

## Next Steps

### UX Expert Prompt

Review the OnboardIQ UI Theming PRD and create detailed design specifications for the enhanced component system, including comprehensive style guides, interaction patterns, and responsive layouts that align with the technical requirements and existing Pebble template architecture.

### Architect Prompt

Using this PRD as foundation, create the technical architecture specification for implementing OnboardIQ's enhanced theming system, including CSS organization strategy, component enhancement approach, animation framework design, and integration patterns that maintain compatibility with the existing Kotlin/Spring Boot and Pebble template infrastructure.