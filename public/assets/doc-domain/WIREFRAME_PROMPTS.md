# Document Domain Agents - Wireframe AI Generation Prompts

## IMPORTANT: Aspect Ratio & Dimensions
- **Aspect Ratio: 16:9** (widescreen)
- **Recommended Size: 1920x1080px** (or 2x retina: 3840x2160px)
- **File Format: PNG** with transparency or solid background

## Style Guide for All Wireframes:
- Clean, minimal wireframe style with gray/black lines on dark background
- Left sidebar navigation (dark, 200px wide)
- Card-based content layouts with subtle elevation
- Status badges and pills throughout
- Include annotations with arrows pointing to key UI elements
- Desktop viewport (16:9 aspect ratio)
- Dark mode enterprise SaaS aesthetic
- Teal/emerald accent colors for primary actions

---

## 1. Query Interface Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for an AI chat query interface with thought process visualization. Dark background.

Layout:
- Left sidebar (dark, 200px):
  - Logo "Document Domain Agent" at top
  - Navigation: Dashboard, Chat (active), Items, Combinations, Admin, Upload
  - Appearance toggle at bottom
  - User profile at bottom

- Main content area:
  - Header: Empty or minimal

  - Center chat area:
    - User message bubble (right-aligned, teal): "How do I maintain this device?"
    - AI response area (left-aligned):
      - "Thought Process" collapsible section showing:
        - Analyzing Query (with checkmark)
        - Intent: maintenance (92%)
        - Searching relevant documents
        - Analyzing Results
        - Writing Response
      - Thumbs up/down feedback icons

  - Bottom: Large text input with placeholder "Ask the agent..." and send button (teal)

Annotations:
- Arrow to thought process: "Transparent AI reasoning builds trust"
- Arrow to intent classification: "Query type detection with confidence"
- Arrow to feedback icons: "Continuous improvement through feedback"

Wireframe style: Dark mode, elevation-based hierarchy, teal accent colors, clean sans-serif typography.
```

---

## 2. BLUF Response Card Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a BLUF (Bottom Line Up Front) AI response format. Dark background.

Layout:
- Left sidebar: Standard navigation

- Main content - Chat view:
  - User question bubble at top

  - AI Response card (large, full width):
    - Collapsed "Thought Process" section at top

    - WARNING banner (amber/yellow):
      "SAFETY INFORMATION - This response contains safety-critical information. Review all warnings and follow proper procedures."

    - Verdict section:
      "To clean the device, use a soft cloth, sponge, or chamois with a mild, non-abrasive soap or detergent for both the glass lid and exterior surfaces."

    - Evidence section with inline citations:
      "The cleaning procedure specifies: 'Using a soft cloth, sponge or chamois and a mild, non-abrasive soap or detergent, clean the glass lid.'" [Citation 1] [Citation 2]

    - Fix section (numbered steps):
      1. Gather Materials: Obtain a soft cloth...
      2. Power Off: Ensure the device is powered off...
      3. Clean the Glass Lid: Dampen the cloth...
      4. Clean the Exterior: Use the same cloth...
      5. Avoid Solvents: Do not use solvents...
      6. Dry: Wipe down with dry cloth...
      7. Inspect: After cleaning, inspect for damage

    - Citation badges at bottom showing source documents

Annotations:
- Arrow to WARNING: "Safety-critical information highlighted first"
- Arrow to Verdict: "BLUF - Bottom Line Up Front"
- Arrow to Evidence: "Inline citations for every claim"
- Arrow to numbered steps: "Actionable fix instructions"

Wireframe style: Dark mode, structured response sections, warning banners, citation badges.
```

---

## 3. Citation with Bounding Box Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a split-screen citation verification view with PDF bounding box highlighting. Light or dark background.

Layout:
- Split screen 50/50:

  Left panel - AI Response:
  - BLUF response with structured sections
  - Clickable inline citations [1], [2], [3]
  - Currently selected citation highlighted
  - Chat input at bottom

  Right panel - PDF Viewer:
  - Document header with filename and page indicator
  - Close (X) button
  - PDF content showing:
    - Document title/header
    - Body text
    - HIGHLIGHTED BOUNDING BOX (yellow/amber rectangle) around exact source text
    - The highlighted text matches the citation being verified
    - Technical diagram or table placeholder
  - Scroll indicator on right

- Visual connection:
  - Line or arrow connecting clicked citation to highlighted PDF region

Annotations:
- Arrow to bounding box: "Exact source text highlighted - not just page number"
- Arrow to split view: "Side-by-side eliminates context switching"
- Arrow to citation link: "Click any citation to jump to source"
- Arrow to highlighted region: "Paragraph-level precision for verification"

Wireframe style: Split layout, PDF viewer with realistic document structure, bounding box as colored rectangle overlay.
```

---

## 4. Gap Detection State Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a gap detection UI when AI confidence is below threshold. Dark background.

Layout:
- Left sidebar: Standard navigation

- Main content - Chat view:
  - User question at top

  - AI Response card showing gap detection state:
    - "Thought Process" section expanded:
      - Analyzing Query (checkmark)
      - Searching documents (checkmark)
      - Gap Detected (warning icon, amber)
      - Confidence: 62% (below 85% threshold)

    - Gap Detection Banner (amber/yellow):
      "I don't have enough information to answer this question confidently."

    - Missing Context section:
      - "To answer this question, I would need:"
        - Documentation about [specific topic]
        - Maintenance schedule information
        - Error code reference guide

    - Action Buttons:
      - "Upload Documents" (primary, teal)
      - "Ask Differently" (secondary)
      - "Contact Support" (text link)

    - Confidence meter showing 62% with visual indicator below 85% threshold line

Annotations:
- Arrow to confidence meter: "Below 85% threshold = no response generated"
- Arrow to missing context: "Specific gaps identified, not vague 'I don't know'"
- Arrow to upload button: "Human-in-the-loop to improve knowledge base"
- Arrow to gap banner: "Honest about limitations builds trust"

Wireframe style: Dark mode, warning states in amber, clear call-to-action buttons.
```

---

## 5. Item Dashboard Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for an item management dashboard with card grid. Dark or light background.

Layout:
- Left sidebar: Standard navigation with "Items" active

- Main content:
  - Header: "Items" title
  - Subtitle: "View and manage your knowledge items"
  - Item count: "5 items"
  - "+ Create Item" button (teal, top right)

  - Card grid (2x3 or 3x2):
    Each card contains:
    - Item name (truncated if long)
    - "Approved" badge (green pill)
    - Subtitle/description
    - Document count: "X documents" with icon
    - Delete icon (trash)

    Example cards:
    - "Product Manual 2025" | approved | 5 documents
    - "Service Guide" | approved | 2 documents
    - "Quick Start" | approved | 1 document
    - "Troubleshooting" | approved | 3 documents
    - "Safety Manual" | approved | 2 documents

- Footer: Copyright and social links

Annotations:
- Arrow to approved badge: "Status tracking for document readiness"
- Arrow to document count: "Quick visibility into knowledge depth"
- Arrow to Create button: "Easy item creation workflow"
- Arrow to card: "Click to view details and chat"

Wireframe style: Card-based layout, status badges as pills, clean grid alignment.
```

---

## 6. Item Details Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for an item detail view with document list. Light or dark background.

Layout:
- Left sidebar: Standard navigation

- Main content:
  - Back arrow with "Item Details" header
  - Action buttons (top right): "Ask Chat" | "+ Add Documents" (teal) | "Delete" (red)

  - Item info card:
    - Item name (large): "Product Manual 2025"
    - "Approved" badge (green)
    - Item ID: UUID string
    - Created date: "December 27, 2025"

  - Documents section:
    - Header: "Documents" with count badge (5)

    - Document list (rows):
      Each row contains:
      - Document icon
      - Filename: "Product Manual 2020.pdf"
      - Type badge: "Manuals"
      - Date: "Dec 29, 2025"
      - Status: "Processed" (green badge) or "Processing" (spinner)
      - Delete icon

      Example rows:
      - Manual_2020.pdf | Manuals | Dec 29, 2025 | Processed
      - Quick_Start.pdf | Guides | Dec 27, 2025 | Processed
      - Literature_2025.pdf | Manuals | Dec 27, 2025 | Processing
      - Catalog_Overview.pdf | Manuals | Dec 27, 2025 | Processed

Annotations:
- Arrow to Ask Chat: "Jump directly to Q&A for this item"
- Arrow to Processing status: "Real-time document processing feedback"
- Arrow to document type badge: "Categorized for better retrieval"
- Arrow to Add Documents: "Expand knowledge base easily"

Wireframe style: Detail view with document list, status badges, clear hierarchy.
```

---

## 7. Combinations Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a combinations management view for grouping related items. Dark background.

Layout:
- Left sidebar: Standard navigation with "Combinations" active

- Main content:
  - Header: "Combinations"
  - Subtitle: "Manage item combinations for unified document queries"
  - Combination count: "2 combinations"
  - "+ Create Combination" button (teal, top right)

  - Combination cards (2 side by side):

    Card 1:
    - Title: "Product Family Set" (with delete icon)
    - Item count: "2 items"
    - Description: "Product Series + Accessory combo"
    - Item tags/pills: "Product A", "Product B"
    - Document count: "5 documents"
    - "Ask Chat" button

    Card 2:
    - Title: "Support Bundle"
    - Item count: "1 items"
    - Item tag: "Support Docs"
    - Document count: "5 documents"
    - "Ask Chat" button

Annotations:
- Arrow to combination card: "Group related items for cross-document queries"
- Arrow to item tags: "See which items are combined"
- Arrow to Ask Chat: "Query across all combined documents at once"
- Arrow to Create button: "Build custom knowledge groupings"

Wireframe style: Card layout, tag pills for items, dark mode with teal accents.
```

---

## 8. Admin Users Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a user management admin panel. Dark background.

Layout:
- Left sidebar: Standard navigation with "Admin" active

- Main content:
  - Header: "Users"
  - Subtitle: "Manage user accounts and permissions"
  - "+ Add User" button (teal, top right)

  - Users table:
    - Column headers: FULL NAME | EMAIL | ROLE | STATUS

    - User rows:
      Row 1:
      - Name: "N/A" with "You" badge
      - Email: "admin@example.com"
      - Role: "Superuser" (teal badge)
      - Status: "Active" (green dot + text)

      (Additional placeholder rows for other users)

  - Table features:
    - Sortable columns
    - Role dropdown for editing
    - Status toggle

Annotations:
- Arrow to Role badge: "Role-based access control"
- Arrow to Status: "Active/inactive user management"
- Arrow to Add User: "Invite new team members"
- Arrow to "You" badge: "Current user identification"

Wireframe style: Data table, role badges, status indicators, dark mode.
```

---

## 9. Document Upload Modal Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a document upload modal overlay. Light or dark background.

Layout:
- Dimmed background showing item details beneath

- Modal overlay (centered, 500px wide):
  - Header: "Add Documents" with X close button
  - Subtitle: "Upload additional documents for this item."

  - Form fields:
    - Document Type* dropdown: "Manuals" selected
    - Documents* label

  - Drag-drop zone:
    - Dashed border rectangle
    - Upload cloud icon (animated/spinning during upload)
    - "Drag & drop PDF files here"
    - "or click to select files from your computer"
    - "Only .pdf files supported"

  - Footer buttons:
    - "Cancel" (secondary/text)
    - "Add Documents" (primary, teal)

Annotations:
- Arrow to Document Type: "Categorize uploads for better retrieval"
- Arrow to drag-drop zone: "Intuitive file upload interaction"
- Arrow to PDF note: "Clear format requirements"
- Arrow to modal: "Non-blocking upload flow"

Wireframe style: Modal overlay, dashed upload zone, form fields, dark or light mode.
```

---

## General Style Notes for AI Generation:

1. **Design System**: Dark mode enterprise SaaS with teal/emerald accent colors
2. **Color palette**:
   - Background: #1a1a1a or #0f0f0f
   - Cards: #2a2a2a with subtle elevation
   - Text: #ffffff (primary), #9ca3af (secondary)
   - Accent: #14b8a6 (teal) for primary actions
   - Success: #10b981 (green) for approved/processed
   - Warning: #f59e0b (amber) for gaps/warnings
   - Error: #ef4444 (red) for delete actions
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
