# OnboardIQ - Wireframe AI Generation Prompts

## IMPORTANT: Aspect Ratio & Dimensions
- **Aspect Ratio: 16:9** (widescreen)
- **Recommended Size: 1920x1080px** (or 2x retina: 3840x2160px)
- **File Format: PNG** with transparency or solid background

## Style Guide for All Wireframes:
- Clean, minimal wireframe style with gray/black lines on white background
- Left sidebar navigation (dark/shaded)
- Card-based content layouts
- Status badges and pills throughout
- Include annotations with arrows pointing to key UI elements
- Desktop viewport (16:9 aspect ratio)
- Enterprise B2B SaaS aesthetic

---

## 1. Workflow Designer Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for an enterprise workflow designer/builder interface.

Layout:
- Left sidebar (dark, 200px):
  - Logo "OnboardIQ" at top
  - Navigation: Home, Deployments, Enrollments, Programs, Analytics, Contacts, Platform Features, Workflows (active), Workflow Designer, Admin
  - User profile at bottom

- Step Library panel (250px, left of canvas):
  - "Step Library" header with search
  - Sections: INPUT, PROCESSING, CONFIGURATION
  - Draggable step cards:
    - "Collect Data" - Gather information from user input
    - "Upload Documents" - Upload and verify required docs
    - "Upload Contract" - Upload contract documents
    - "Select Features" - Select deployment features
    - "Provision Entity" - Create and configure system entities
    - "Provision NetSuite" - Set up NetSuite integration

- Main canvas area:
  - Header: Workflow name input, Owner dropdown, Status badge (Draft), Save/Publish buttons
  - Description textarea
  - Configuration row: Default Notification Policy, Normal Priority, Default SLA Notification, Normal Priority, Default SLA Days

  - Visual workflow:
    - "Start" node (purple, top)
    - Connected steps flowing down with lines:
      - Step 1: "Collect Data" card with status, assignee, escalation fields
      - Step 2: "Upload Documents" card
      - Step 3: "Select Features" card
    - "End" node (red, bottom)
  - Each step card shows: Name, Status badge, Role, Assignee, Escalation Assignee, Escalation Days

Annotations:
- Arrow to step library: "Drag-drop step types"
- Arrow to workflow canvas: "Visual step sequencing"
- Arrow to status badges: "Per-step configuration"
- Arrow to configuration row: "Cascading defaults from workflow level"

Wireframe style: Enterprise SaaS, card-based steps, connection lines between nodes.
```

---

## 2. Workflow Instance Detail Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a workflow instance detail view with progress tracking.

Layout:
- Left sidebar: Standard OnboardIQ navigation

- Main content:
  - Header row:
    - Workflow name: "test" with breadcrumb
    - Description: "Simple Linear Provider Onboarding #1"
    - Action buttons: Active toggle, Pause, Cancel (red)

  - Progress metrics row (4 cards):
    - Total Steps: 4 (icon)
    - Completed: 2 (green checkmark)
    - In Progress: 0 (blue spinner)
    - Progress: 50% with circular progress chart

  - Two-column layout:

    Left column - "Workflow Steps" list:
    - Step cards with:
      - Step name + "Completed" badge (green)
      - Description text
      - Critical Path indicator (red)
      - Escalated To badge
      - Row: Assigned To | Started | Completed | Duration | SLA
      - Escalation row
      - "Done" button (green), "Add Comment", "Activity" toggle
      - Comments section (expandable)

    Right column - Sidebar:
      - "Timeline" section with event list
      - "Notes" section with "New Note" button
      - "Context Data" expandable
      - "Details" section: Instance ID, Workflow name, Version
      - "Activity Log" section with entries

Annotations:
- Arrow to progress cards: "Real-time status tracking"
- Arrow to Critical Path badge: "SLA risk indicators"
- Arrow to Timeline: "Complete audit trail"
- Arrow to step cards: "Per-step status and assignment"

Wireframe style: Dashboard layout, progress indicators, expandable sections.
```

---

## 3. Analytics Dashboard Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a workflow analytics dashboard with charts and metrics.

Layout:
- Left sidebar: Standard OnboardIQ navigation

- Main content:
  - Header: "Analytics Dashboard" title
  - Date range picker and filter controls

  - Top metrics row (4 cards):
    - Total Workflows: 156
    - Completed This Month: 89
    - Average Duration: 4.2 days
    - SLA Compliance: 94%

  - Two charts side by side:
    Left chart:
    - "Workflow Volume Over Time" title
    - Line/area chart showing trends
    - X-axis: months, Y-axis: count
    - Legend: Started, Completed, In Progress

    Right chart:
    - "Completion by Workflow Type" title
    - Bar chart or donut chart
    - Breakdown by workflow category

  - Bottom section:
    - "Recent Activity" or "Bottleneck Analysis" table
    - Columns: Workflow | Step | Avg Duration | SLA Violations | Trend
    - Highlight rows with issues in amber/red

Annotations:
- Arrow to SLA Compliance: "Key performance indicator"
- Arrow to trend chart: "Volume and completion trends"
- Arrow to bottleneck table: "Identify problem areas"

Wireframe style: Dashboard with data visualizations, metric cards, clean data tables.
```

---

## 4. Task Queue / My Tasks Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a personal task queue showing assigned workflow steps.

Layout:
- Left sidebar: Standard OnboardIQ navigation

- Main content:
  - Header: "My Tasks" title, "Manage and track your assigned workflow tasks"
  - Toggle: "My Tasks" | "All Tasks"
  - Search bar

  - Summary cards row:
    - My Tasks: 7
    - Completed: 1 (green)
    - In Progress: 0 (blue)
    - Overdue: 0 (red)
    - "Clear All" link

  - Filters row:
    - Status dropdown: "All Statuses"
    - Workflow dropdown: "All Workflows"
    - Due Date dropdown: "All"
    - Priority dropdown: "All"

  - Task count: "7 tasks found" with view toggle (grid/list icons)

  - Task cards grid (2x3):
    Each card contains:
    - Task name + Status badge (Completed/Ready/Pending)
    - Description text
    - Instance indicator (e.g., "test 3")
    - Assigned to with avatar
    - Priority badge (High - red, Medium - yellow)
    - Comments count
    - SLA indicator (e.g., "SLA: 3 days")
    - Action buttons: "Open", "Actions" dropdown

Annotations:
- Arrow to summary cards: "At-a-glance workload"
- Arrow to filters: "Multi-dimensional filtering"
- Arrow to Priority badge: "Visual priority indicators"
- Arrow to SLA: "Time-based urgency"

Wireframe style: Card grid layout, status badges, filter controls.
```

---

## 5. Platform Features Matrix Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a feature compatibility matrix showing lender/provider support.

Layout:
- Left sidebar: Standard OnboardIQ navigation

- Main content:
  - Header: "Platform Features Matrix"
  - Subtitle: "Visual overview of which features each lending partner supports on our platform"
  - Search bar

  - Metrics row:
    - Total Features: 22
    - Active Features: 22
    - Providers: 45

  - Filters row:
    - Hiding/Shown dropdown
    - Providers dropdown: "Select Providers..."
    - Features by Category dropdown
    - Support Status dropdown: "All Statuses"
    - "Clear All" link

  - Toggle button: "Edit Management Mode Active" (highlighted when editing)

  - Legend row:
    - Icons: Approved (green check), Supported (blue), Supported with Caveats (yellow), Not Supported (red X), Unrated (gray)

  - Feature Matrix table:
    - Row headers (left): Feature names grouped by category
      - "Increase Invoice Apply"
      - "Variable Interest Rate Acceptance"
      - "Snap To Apply"
      - "Email To Apply"
      - "Text To Apply"
      - "Discounts"
    - Column headers (top): Provider/Lender names
    - Cell content: Status icons (checkmarks, X marks, question marks)
    - Alternating row colors for readability

Annotations:
- Arrow to legend: "Clear status indicators"
- Arrow to matrix: "Provider × Feature compatibility"
- Arrow to Edit Mode: "Toggle for management mode"
- Arrow to filters: "Filter by provider or category"

Wireframe style: Data matrix/spreadsheet style, icon-based status, filterable columns.
```

---

## 6. Step Configuration Modal Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a workflow step configuration modal overlay.

Layout:
- Dimmed background showing workflow designer beneath

- Modal overlay (centered, 600px wide):
  - Header: Step name "Upload Documents", X close button

  - Form sections:

    Section 1 - "Basic Information":
    - Step Name* (text input, pre-filled)
    - Description (textarea)
    - Step Type (dropdown): "Document Upload"

    Section 2 - "Assignment":
    - Default Role* (dropdown): "Document Specialist"
    - Default Assignee (dropdown): "Use Role Default"
    - Escalation Assignee (dropdown): "Manager"
    - Escalation Days (number input): "3"

    Section 3 - "SLA Configuration":
    - SLA Days* (number input): "5"
    - SLA Notification (dropdown): "Default (from workflow)"
    - Priority (dropdown): "Normal"

    Section 4 - "Notifications":
    - Checkbox: "Send notification on assignment"
    - Checkbox: "Send notification on completion"
    - Checkbox: "Send escalation warning"

  - Footer buttons:
    - "Cancel" (secondary)
    - "Save Step" (primary blue)

Annotations:
- Arrow to Role/Assignee: "Cascading assignment logic"
- Arrow to SLA section: "Per-step SLA override"
- Arrow to checkboxes: "Granular notification control"

Wireframe style: Form modal, sectioned layout, clear hierarchy.
```

---

## 7. Activity Log / Audit Trail Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a workflow activity log and audit trail view.

Layout:
- Left sidebar: Standard OnboardIQ navigation

- Main content:
  - Header: "Activity Log" for workflow "Provider Onboarding #1234"
  - Filter row: Date range, User, Event Type, Search

  - Timeline view (vertical):
    Each entry contains:
    - Timestamp (left column): "Jan 8, 2024 at 10:51"
    - Event icon (color-coded by type)
    - Event description: "Workflow launched by t.ramsay@versatilecredit.com"
    - Additional details (expandable)

    Event types with icons:
    - Workflow started (green play)
    - Step completed (green check)
    - Step assigned (blue user)
    - Comment added (gray message)
    - Document uploaded (blue file)
    - SLA warning (amber clock)
    - Escalation triggered (red alert)
    - Status changed (purple toggle)

  - Pagination at bottom

Annotations:
- Arrow to timeline: "Chronological audit trail"
- Arrow to event icons: "Color-coded event types"
- Arrow to filters: "Filter by user, date, or event type"
- Arrow to details: "Expandable for full context"

Wireframe style: Timeline/log view, icon-based events, filter controls.
```

---

## General Style Notes for AI Generation:

1. **Design System**: Enterprise SaaS - clean, professional, data-dense
2. **Color palette**: Grayscale for wireframes, with labeled indicators for status colors (green=completed, blue=in progress, amber=warning, red=overdue/critical)
3. **Navigation**: Dark left sidebar with icon + text nav items
4. **Cards**: Rounded corners, subtle shadows, status badges
5. **Tables**: Clean data tables with sortable columns
6. **Modals**: Centered overlays with form sections
7. **Aspect ratio**: 16:9 for desktop screens
8. **Resolution**: Generate at 1920x1080 or 2x for retina (3840x2160)

## Recommended AI Tools:
- Midjourney with "--style raw" for cleaner wireframes
- DALL-E 3 with specific wireframe styling instructions
- Figma AI or similar UX-specific tools
