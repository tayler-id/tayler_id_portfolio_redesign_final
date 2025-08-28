# Platform Features Filtering System - Technical Documentation

## Overview

The Platform Features Matrix implements a client-side filtering system that allows users to filter lending partners and features across multiple dimensions without server round trips. The system provides real-time updates to both the matrix display and metric cards.

## Architecture

### Technology Stack
- **Frontend**: jQuery-based DOM manipulation
- **Backend**: Kotlin/Spring Boot with Pebble templates
- **Data Flow**: Server-side rendering with client-side filtering
- **Performance**: Single data load with CSS-based show/hide

### Data Flow
```
Server (Kotlin) → Template (Pebble) → DOM (HTML) → Client Filtering (JavaScript) → UI Updates (CSS)
```

## Core Components

### 1. Server-Side Data Preparation

**Controller**: `PlatformFeaturesController.kt`
```kotlin
@GetMapping("/matrix")
fun viewMatrix(): ModelAndView {
    val providers = providerDao.getAll().filter { it.active }
    val features = platformFeatureDao.getAllActive()
    val matrixData = providerPlatformFeatureDao.getMatrixData()
    val featuresByCategory = features.groupBy { it.category }
    val verticals = PlatformVertical.entries.sortedBy { it.sortRank }
    
    return ModelAndView("platform-features")
        .addObject("providers", providers)
        .addObject("features", features)
        .addObject("matrixData", matrixData)
        // ... other objects
}
```

**Template**: `platform-features.peb`
- Renders complete matrix table with all data
- Embeds filtering metadata in `data-*` attributes
- No server-side filtering - all data loaded upfront

### 2. Client-Side State Management

**Global Variables**:
```javascript
let selectedFeatures = new Set();    // Feature IDs from multi-select
let selectedPartners = new Set();    // Partner IDs from multi-select  
let currentTooltip = null;          // Active tooltip reference
let isAdminMode = false;            // Admin editing toggle
```

### 3. Filter Types and Implementation

#### A. Partners Filter (Multi-select)
**UI**: Dropdown with checkboxes for each partner
**Logic**: Shows only selected partners' columns
```javascript
function updatePartnerFilter() {
    selectedPartners.clear();
    $('.partner-checkbox:checked').each(function() {
        selectedPartners.add($(this).data('partner-id'));
    });
    filterMatrix();
}
```

#### B. Features by Category Filter (Multi-select)
**UI**: Hierarchical dropdown grouped by category
**Logic**: Shows only selected features' rows
```javascript
function updateFeatureFilter() {
    selectedFeatures.clear();
    $('.feature-checkbox:checked').each(function() {
        selectedFeatures.add($(this).data('feature-id'));
    });
    updateFilterPills();
    filterMatrix();
}
```

#### C. Vertical/Market Filter (Single select)
**UI**: Standard dropdown
**Logic**: Filters partners by supported verticals using data attributes
```javascript
// In filterMatrix()
if (verticalFilter && isVisible) {
    const providerVerticals = $column.data('provider-verticals') || '';
    const hasVertical = providerVerticals.split(',').includes(verticalFilter);
    if (!hasVertical) isVisible = false;
}
```

#### D. Support Status Filter (Single select)
**UI**: Dropdown with options: All, Supported, Not Supported, Unknown
**Logic**: Two-level filtering (feature-level and cell-level)

## Core Filtering Algorithm

### Main Filter Function (`filterMatrix()`)

```javascript
function filterMatrix() {
    const searchTerm = $('#searchInput').val().toLowerCase();
    const verticalFilter = $('#verticalFilter').val();
    const supportFilter = $('#supportFilter').val();
    
    let visibleFeatures = 0;
    let visibleProviders = new Set();
    
    // 1. Filter feature rows
    $('.feature-row').each(function() {
        let isVisible = true;
        // Apply text search, feature selection, support status filters
        $row.toggle(isVisible);
        if (isVisible) visibleFeatures++;
    });
    
    // 2. Filter provider columns  
    $('th.provider-column').each(function() {
        let isVisible = true;
        // Apply partner selection and vertical filters
        $column.css('display', isVisible ? '' : 'none');
        if (isVisible) visibleProviders.add(providerId);
    });
    
    // 3. Cell-level support filtering
    if (supportFilter) {
        $('.support-cell:visible').each(function() {
            // Hide cells that don't match support status
            $(this).css('visibility', shouldHide ? 'hidden' : 'visible');
        });
    }
    
    // 4. Update metrics
    updateFilteredMetrics(visibleFeatures, visibleProviders.size);
}
```

### Filtering Sequence

1. **Feature Row Filtering**
   - Text search against feature name/description
   - Multi-select feature inclusion
   - Support status at feature level

2. **Provider Column Filtering**  
   - Multi-select partner inclusion
   - Vertical/market compatibility

3. **Cell-Level Filtering**
   - Support status at individual cell level
   - Uses `visibility:hidden` to maintain table layout

4. **Category Header Management**
   - Hides category headers when no features visible
   - Updates feature counts in headers

## Metrics Calculation System

### Key Components

**Fixed Implementation** (addresses the partner count bug):
```javascript
function updateFilteredMetrics(visibleFeatures, visibleProviders) {
    // Use correctly calculated count from filterMatrix()
    let activePartners = visibleProviders;
    
    // Only recalculate for support filters
    if (supportFilter) {
        const uniqueProviders = new Set();
        // Count providers with visible cells matching support status
        activePartners = uniqueProviders.size;
    }
    
    animateNumberChange('#total-providers-count', activePartners);
}
```

**Metric Cards**:
- **Total Features**: Static count (always {{ features.size() }})
- **Active Features**: Dynamic count based on visible feature rows  
- **Partners**: Dynamic count based on visible provider columns

### Animation System

```javascript
function animateNumberChange(selector, newValue) {
    $(selector).text(newValue)
             .addClass('animate-bounce-update');
    
    setTimeout(() => {
        $(selector).removeClass('animate-bounce-update');
    }, 400);
}
```

## Performance Optimizations

### 1. DOM Manipulation Strategy
- **Batch Operations**: Single show/hide per element
- **CSS-based Visibility**: `display:none` for columns, `visibility:hidden` for cells
- **Minimal Reflows**: Avoid frequent layout recalculations

### 2. Event Handling
```javascript
// Immediate response for user interactions
$("#searchInput").on('input', filterMatrix);
$("#verticalFilter").on('change', filterMatrix);

// Debounced tooltips to prevent flickering
setTimeout(() => showFeatureTooltip($this, e), 100);
```

### 3. Memory Management
```javascript
// Clean up tooltips to prevent memory leaks
function hideFeatureTooltip() {
    $('.feature-tooltip').remove();
    currentTooltip = null;
}
```

## Data Attributes Schema

### Provider Columns
```html
<th class="provider-column" 
    data-provider-id="{{ provider.id }}"
    data-provider-name="{{ provider.name }}"
    data-provider-verticals="{{ provider.platformVerticalIds }}">
```

### Feature Rows  
```html
<tr class="feature-row" 
    data-feature-id="{{ feature.id }}" 
    data-category="{{ feature.category }}" 
    data-feature-group="{{ feature.featureGroup }}">
```

### Support Cells
```html
<td class="support-cell" 
    data-provider-id="{{ provider.id }}" 
    data-feature-id="{{ feature.id }}">
  <div class="support-indicator"
       data-supported="{{ relationship.supported }}"
       data-notes="{{ relationship.notes }}">
```

## Filter State Management

### Multi-Select Filters
```javascript
// Feature filter state
function updateFeatureFilter() {
    selectedFeatures.clear();
    $('.feature-checkbox:checked').each(function() {
        selectedFeatures.add($(this).data('feature-id'));
    });
    updateFilterPills();  // Visual feedback
    filterMatrix();       // Apply filters
}

// Visual pills for active filters
function updateFilterPills() {
    // Groups selected features by category
    // Creates removable filter pills
    // Updates button text to show selection count
}
```

### Filter Interaction Matrix

| Filter Type | Affects | DOM Target | Method |
|-------------|---------|------------|--------|
| Partners | Provider Columns | `th.provider-column` | `display: none` |
| Features | Feature Rows | `tr.feature-row` | `toggle()` |
| Vertical | Provider Columns | `th.provider-column` | `display: none` |
| Support Status | Feature Rows + Cells | `tr.feature-row`, `td.support-cell` | `toggle()` + `visibility: hidden` |
| Text Search | Feature Rows | `tr.feature-row` | `toggle()` |

## Error Handling

### Validation
- Checks for element existence before manipulation
- Graceful degradation for missing data attributes
- Console logging for debugging filter operations

### Edge Cases
- Empty filter results (shows "no results" state)
- Rapid filter changes (debounced updates)
- Browser compatibility (jQuery ensures cross-browser support)

## Integration Points

### Admin Mode
```javascript
// Toggle between view and edit modes
function toggleAdminMode() {
    isAdminMode = !isAdminMode;
    $('body').toggleClass('admin-mode');
    // Enable/disable click handlers for editing
}
```

### Export Functionality
```javascript
function exportMatrix() {
    // Exports current filtered view to CSV
    // Respects all active filters
    // Maintains feature/provider relationships
}
```

## Recent Bug Fixes

### Partner Count Issue (Fixed)
**Problem**: Metric showed 476 partners when filtering by "Retail" vertical
**Root Cause**: `updateFilteredMetrics()` was recalculating partner count incorrectly
**Solution**: Use the correctly calculated `visibleProviders` parameter from `filterMatrix()`

**Before**:
```javascript
// Incorrect recalculation
activePartners = $('.provider-column:visible').length;
```

**After**:
```javascript
// Use passed parameter
let activePartners = visibleProviders;
```

## Future Enhancements

### Potential Improvements
1. **Server-side pagination** for large datasets
2. **Filter presets** for common filter combinations  
3. **URL-based filter state** for shareable filtered views
4. **Advanced search** with field-specific queries
5. **Filter history** with undo/redo capability

### Performance Considerations
- Current approach loads all data upfront (good for <1000 providers/features)
- For larger datasets, consider virtual scrolling or server-side filtering
- Monitor memory usage with large tooltip sets

---

*Last Updated: 2025-01-21*
*Version: 2.0 (Post Partner Count Fix)*