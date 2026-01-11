# Goldlink/Blue Moon Telehealth - Wireframe AI Generation Prompts

## IMPORTANT: Aspect Ratio & Dimensions
- **Aspect Ratio: 16:9** (widescreen)
- **Recommended Size: 1920x1080px** (or 2x retina: 3840x2160px)
- **File Format: PNG** with transparency or solid background

## Style Guide for All Wireframes:
- Clean, minimal wireframe style with gray/black lines on white background
- Use placeholder boxes for images, circles for avatars
- Include annotations with arrows pointing to key UI elements
- Desktop viewport (16:9 aspect ratio)
- Professional UX documentation aesthetic
- NO color except for annotation highlights (use grayscale for UI elements)

---

## 1. Pre-Session Mood Check Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a telehealth pre-session mood check screen. Dark background wireframe style.

Layout:
- Full screen with soft blurred background image placeholder (airport lounge aesthetic)
- Centered card/modal (600px wide) containing:
  - Header text: "HOW ARE YOU FEELING?" in caps
  - Row of 5 emoji mood icons (circles with simple face expressions): Very Sad, Sad, Neutral, Good, Great
  - Labels under each emoji
  - Text input field labeled "Anything you'd like to share? (optional)"
  - Large primary button "Continue" at bottom

- Top navigation showing vertical tabs on left side: "Mood Check" (active), "Session Prep", "Waiting Room"

Annotations:
- Arrow pointing to emojis: "Low cognitive load - tap to select"
- Arrow pointing to optional field: "No pressure - completely optional"
- Arrow pointing to nav: "Progressive disclosure of steps"

Wireframe style: Clean lines, grayscale, placeholder boxes, professional UX documentation look.
```

---

## 2. Session Preparation Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a telehealth session preparation screen with guided tooltips.

Layout:
- Dark background with soft blurred lounge image placeholder
- Center of screen shows two floating tooltip cards side by side:

Left tooltip card:
- Icon placeholder (location pin)
- Title: "Find a Quiet Space"
- Body text: "Choose a room where you won't be interrupted and others can't overhear"
- Checkbox: "I'm in a private space"

Right tooltip card:
- Icon placeholder (camera/tech icon)
- Title: "Test Your Technology"
- Body text: "Check your camera, microphone, and internet connection before the session starts"
- Button: "Run Tech Test"

- Bottom of screen: Progress indicator showing step 2 of 3
- "Skip" link in corner

Annotations:
- Arrow to left card: "Environmental readiness"
- Arrow to right card: "Technical readiness"
- Arrow to progress: "Clear progress indication"

Wireframe style: Clean grayscale lines, tooltip cards with rounded corners, professional documentation aesthetic.
```

---

## 3. Waiting Room Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a telehealth waiting room screen with calming design.

Layout:
- Full dark screen background
- Center logo placeholder with text "GOLDLINK"
- Below logo: Animated particle/circle placeholder (indicated with dotted lines showing motion)
- Status message: "Your therapist will join shortly"
- Subtle subtext: "Click anywhere to browse while you wait"
- Bottom corner: Small self-video preview (rectangle with "You" label)

Visual elements:
- Floating particles indicated by small circles with motion lines
- Calm, spacious layout with lots of negative space
- No harsh edges - all rounded corners

Annotations:
- Arrow to particles: "Three.js calming animation reduces anxiety"
- Arrow to status: "Clear, reassuring messaging"
- Arrow to self-preview: "Camera confirmation without being intrusive"

Wireframe style: Minimal, lots of whitespace (or dark space), focus on calm/spacious feeling.
```

---

## 4. Video Session Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a two-way telehealth video session interface.

Layout:
- Dark background
- Header bar with "Goldlink" logo centered, minimal controls in corners
- Main content: Two equal-sized video tiles side by side (16:9 rectangles)
  - Left tile: Participant avatar placeholder with name badge "V. Smith"
  - Right tile: Video feed placeholder with name badge "Tayler Ramsay"
  - Both tiles have rounded corners

- Bottom toolbar (centered, floating):
  - Circle buttons in a row: Video (camera icon), Mic, Volume, Text/Caption, Chat, Timer, Details, Settings, Frame
  - End call button (red) at far right
  - All buttons 48px minimum touch target

Annotations:
- Arrow to video tiles: "Equal sizing = equal presence"
- Arrow to toolbar: "48px+ touch targets for accessibility"
- Arrow to end button: "Clearly differentiated destructive action"

Wireframe style: Clean interface wireframe, button icons as simple shapes, professional UX documentation.
```

---

## 5. Session Timer Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a telehealth session timer overlay with CPT billing integration.

Layout:
- Semi-transparent overlay on top of video session (video tiles visible but dimmed behind)
- Left panel - "Timer Settings" card:
  - Checkbox: "Show CPT Code Indicators"
  - Checkbox: "Enable Time Reminders (5 & 2 min)"
  - Dropdown: "Timer Visibility" > "Therapist Only"

- Center - Large analog clock face:
  - Circular clock with hour markers
  - Single hand pointing to current time
  - Digital readout below: "05" (minutes)
  - "START/STOP" button above clock
  - "RESET" button to left of clock

- Bottom banner (coral/orange): "Not billable (under 16 min)" - CPT indicator

Annotations:
- Arrow to analog clock: "Analog design reduces digital time anxiety"
- Arrow to CPT banner: "Automatic billing code detection (90832/90834/90837)"
- Arrow to settings: "Therapist-only controls"

Wireframe style: Overlay wireframe showing depth, clock as clean circle with markers, settings panel with form elements.
```

---

## 6. Accessibility Panel Wireframe
**Dimensions: 1920x1080px (16:9)**

**Prompt:**
```
Clean UX wireframe, 16:9 aspect ratio, 1920x1080 pixels, for a comprehensive telehealth accessibility settings modal.

Layout:
- Large modal overlay (700px wide) with dark background
- Header: "Accessibility Settings" with X close button

Sections with expandable accordions:

1. "Waiting Room" section:
   - Toggle: "Open Waiting Room"
   - Helper text explanation

2. "Therapist Controls" section:
   - Checkbox: "Enable Mood Check-in for Clients"

3. "Video Enhancements" section:
   - Toggle: "Live Captions"
   - Dropdown: "Neutral Backdrop" (background blur/replacement)

4. "Visual Modes" section:
   - Toggle: "High Contrast Mode"
   - Toggle: "Reduced Motion"
   - Toggle: "Enhanced Focus Indicators"

5. "Text & UI" section:
   - Slider: "Font Size" (with percentage: 100%)
   - Slider: "Tiny 60%" to "150%"

- Bottom buttons: "Reset to Defaults" (secondary), "Save" (primary)

Annotations:
- Arrow to sections: "6 axes of accessibility control"
- Arrow to sliders: "Real-time preview as user adjusts"
- Arrow to captions toggle: "Web Speech API integration"

Wireframe style: Form-heavy modal wireframe, clear section hierarchy, toggle switches and sliders clearly indicated.
```

---

## General Style Notes for AI Generation:

1. **Color palette**: Grayscale wireframes (white bg, black/gray lines) OR dark mode wireframes (dark bg, light gray lines)
2. **Typography**: Use placeholder text blocks, avoid actual lorem ipsum
3. **Icons**: Simple geometric shapes (circles, squares) with minimal detail
4. **Annotations**: Include callout boxes with arrows pointing to key UX decisions
5. **Aspect ratio**: 16:9 for desktop screens
6. **Resolution**: Generate at 1920x1080 or 2x for retina (3840x2160)

## Recommended AI Tools:
- Midjourney with "--style raw" for cleaner wireframes
- DALL-E 3 with specific wireframe styling instructions
- Figma AI or similar UX-specific tools
