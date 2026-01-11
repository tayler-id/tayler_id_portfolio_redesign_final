# Rayni AI - Wireframe AI Generation Prompts

## IMPORTANT: Aspect Ratio & Dimensions
- **Aspect Ratio: 16:9** (widescreen)
- **Recommended Size: 1920x1080px** (or 2x retina: 3840x2160px)
- **File Format: PNG** with transparency or solid background

## Style Guide for All Wireframes:
- Clean, minimal wireframe style with gray/black lines on light gray background
- Use placeholder boxes for images, icons as simple shapes
- Include annotations with arrows pointing to key UI elements
- Desktop viewport (16:9 aspect ratio)
- Professional UX documentation aesthetic
- "No borders needed" design system - use elevation/shadows instead of hard borders

---

## 1. Chat Interface Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for an AI chat interface with citation sidebar. Light gray background, no hard borders design system.

Layout:
- Left sidebar (200px):
  - Logo "Rayni.ai" at top
  - Navigation items: Instruments, My Lab
  - User avatar at bottom

- Main content area:
  - Header: "Back to Instruments" breadcrumb, "New Chat" button
  - Center: Large chat area
  - User question bubble (right-aligned): "Tell me how to clean this device"
  - AI response (left-aligned) with:
    - "Reasoning (15)" collapsible section with checkmarks
    - Streaming text response with numbered steps
    - Inline citation links [1], [2], [3]
  - Bottom: Chat input field with placeholder "Ask a question..."

- Floating elements:
  - Badge showing "Just now" and "2 sources"

Annotations:
- Arrow to reasoning section: "Transparent AI reasoning builds trust"
- Arrow to citations: "Inline citations for instant verification"
- Arrow to sources badge: "Source count visible at a glance"

Wireframe style: Elevation-based hierarchy, rounded corners, soft shadows, no hard borders.
```

---

## 2. Document Library Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a hierarchical document knowledge store. Light gray background, elevation-based design.

Layout:
- Left sidebar: Same navigation as chat interface

- Main content:
  - Header: "Knowledge Store" title, "Orbitrap Tribrid Series" subtitle
  - Two-column layout:

    Left column - Folder tree:
    - Root folder (expanded)
      - Troubleshooting (3 items)
      - Protocols (2 items)
      - Manuals (4 items) [selected/highlighted]
      - Maintenance (2 items)
      - Training (0 items)
    - "New Folder" button

    Right column - File grid:
    - "Manuals • 4 files" header with Upload button
    - Grid of document cards (2x2):
      - PDF icon + filename + "Processing" badge
      - PDF icon + filename
      - PDF icon + filename
      - Image icon + filename + "Analysis Done" badge

Annotations:
- Arrow to folder tree: "5-layer hierarchical organization"
- Arrow to Processing badge: "Real-time processing status"
- Arrow to Upload button: "Drag-drop or click to upload"

Wireframe style: Card-based layout, subtle elevation shadows, folder icons as simple shapes.
```

---

## 3. Citation Verification Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a split-screen AI answer and PDF source verification view.

Layout:
- Split screen 50/50:

  Left panel - AI Response:
  - Chat message with structured answer
  - Numbered steps (1, 2, 3...)
  - Highlighted citation link [1] in text
  - "Sources" section at bottom listing PDF names
  - Chat input at very bottom

  Right panel - PDF Viewer:
  - PDF toolbar: filename, page X of Y, zoom, close X
  - PDF content area showing:
    - Document title/header
    - Highlighted text section (yellow highlight box)
    - Technical diagram placeholder
    - Body text around highlight
  - Scroll indicator on right

- Visual connection:
  - Dotted line or arrow connecting citation [1] to highlighted PDF section

Annotations:
- Arrow to split view: "Side-by-side eliminates context switching"
- Arrow to highlight: "Exact source text highlighted"
- Arrow to citation link: "Click any citation to jump to source"

Wireframe style: Clean split layout, PDF viewer with realistic document structure, highlight as yellow rectangle.
```

---

## 4. Confidence Indicator Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, showing confidence indicator UI patterns for AI responses.

Layout:
- Three example AI response cards stacked vertically, each showing different confidence levels:

  Card 1 - High Confidence:
  - Green confidence pill: "High Confidence • 94%"
  - AI response text
  - Sources: 3 citations
  - Check icon

  Card 2 - Medium Confidence:
  - Amber/yellow confidence pill: "Medium Confidence • 72%"
  - AI response text with caveat
  - Sources: 1 citation
  - Warning icon
  - "Verify with additional sources" suggestion

  Card 3 - Low Confidence (Gap Detection):
  - Red confidence pill: "Low Confidence • 41%"
  - Partial response with uncertainty language
  - "Gap Detected" banner
  - Action buttons: "Upload More Documents" | "Ask a Colleague"
  - Alert icon

Annotations:
- Arrow to green pill: "Traffic light colors = instant comprehension"
- Arrow to percentage: "Numeric confidence for precision"
- Arrow to gap detection: "Limitations become actionable next steps"

Wireframe style: Stacked cards with clear visual hierarchy, color indicators shown as labeled shapes.
```

---

## 5. Document Upload Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for document upload flow with processing preview.

Layout:
- Modal overlay on dimmed background

- Modal content (centered, 600px wide):
  - Header: "New Instrument" with X close

  - Form fields:
    - Instrument Name* (text input)
    - Vendor* (text input)
    - Instrument Model / Variant (text input with helper text)
    - Description (textarea)

  - File upload section:
    - "Initial Files" label
    - Step indicators: 1. Select Files → 2. File Details → 3. Review & Upload
    - Drag-drop zone:
      - Dashed border rectangle
      - Upload cloud icon
      - "Drop files here or click to browse"
      - "PDF, images, and videos supported"

  - Bottom buttons: "Cancel" (secondary) | "Add Instrument" (primary, disabled until files added)

Annotations:
- Arrow to drag-drop: "Dual input: drag-drop AND click"
- Arrow to steps: "Progressive disclosure of upload flow"
- Arrow to file types: "Multiple format support"

Wireframe style: Form-focused modal, dashed upload zone, step indicator as connected circles.
```

---

## 6. Knowledge Graph Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for instrument combinations / knowledge graph builder.

Layout:
- Left sidebar: Standard navigation

- Main content:
  - Header: "Instrument Combinations" title
  - Search bar: "Search instrument combinations by name or description..."
  - "New Instrument Combination" button (top right)

  - Card grid (2x2):
    Card 1:
    - Title: "CentriVap Family Test" + Active badge
    - Description text
    - "New Chat" button | "Open Canvas" button
    - Edit/delete icons

    Card 2:
    - Title: "CentriVap Complete Workflow" + Active badge
    - Description about combining multiple instruments
    - Same button pattern

    Card 3:
    - Title: "test combination" + Active badge
    - Minimal description
    - Same button pattern

    Card 4: (empty state or add new)

Annotations:
- Arrow to "Open Canvas": "Visual graph builder for connections"
- Arrow to combination card: "Group related instruments for cross-doc queries"
- Arrow to Active badge: "Enable/disable combinations"

Wireframe style: Card grid layout, badges as pills, action buttons grouped at bottom of cards.
```

---

## 7. Users & Roles Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for team user management and role assignment interface.

Layout:
- Left sidebar: Standard navigation

- Main content:
  - Header: "Users & Roles" with "Bulk Assignment" and "Invite User" buttons

  - Pending Access Requests section (collapsible):
    - 2 request cards with user info, reason, and Approve/Deny buttons

  - Users table:
    - Search bar
    - Column headers: User | Team | Role | Joined | Instruments | Actions
    - User rows showing:
      - Avatar + name + email
      - Team dropdown
      - Role dropdown (Admin/User/Lab Manager)
      - Join date
      - Instrument count with expand arrow
      - Remove button (red)
    - 5-6 example rows

Annotations:
- Arrow to Bulk Assignment: "Manage multiple users at once"
- Arrow to Role dropdown: "Granular permission levels"
- Arrow to Instruments column: "Per-user instrument access"

Wireframe style: Data table with dropdown controls, action buttons, avatar placeholders as circles.
```

---

## General Style Notes for AI Generation:

1. **Design System**: "No borders needed" - use elevation, shadows, and color layering instead of hard borders
2. **Color palette**: Grayscale for wireframes, with labeled indicators for the actual colors (purple primary, green/amber/red confidence)
3. **Typography**: Clean sans-serif, use placeholder text blocks
4. **Icons**: Simple geometric shapes
5. **Annotations**: Include callout boxes with arrows pointing to key UX decisions
6. **Aspect ratio**: 16:9 for desktop screens
7. **Resolution**: Generate at 1920x1080 or 2x for retina (3840x2160)

## Recommended AI Tools:
- Midjourney with "--style raw" for cleaner wireframes
- DALL-E 3 with specific wireframe styling instructions
- Figma AI or similar UX-specific tools
