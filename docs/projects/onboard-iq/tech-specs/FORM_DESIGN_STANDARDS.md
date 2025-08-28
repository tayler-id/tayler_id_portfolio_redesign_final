# Form Design Standards

## Selection Container Pattern

For all "Selected Items" containers throughout the application, use this consistent design:

### CSS Classes
```html
<div class="flex flex-wrap gap-2 min-h-[3rem] p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 items-center list-container">
    <!-- Badge items -->
    <span class="text-sm text-gray-500 italic">No items selected yet</span>
</div>
```

### Key Design Elements

1. **Dotted Border**: `border-2 border-dashed border-gray-300`
2. **Background**: `bg-gray-50` (light gray)
3. **Padding**: `p-4` (consistent spacing)
4. **Min Height**: `min-h-[3rem]` (prevents collapsed appearance)
5. **Rounded Corners**: `rounded-lg`
6. **Flex Layout**: `flex flex-wrap gap-2` for badges
7. **Placeholder Text**: Inside container, italic gray text when empty

### Usage Examples

**Role Selection:**
- Label: "Selected Roles"  
- Placeholder: "No roles selected yet"
- Container ID: `selectedRoles`

**Vertical Selection:**
- Label: "Selected Verticals"
- Placeholder: "No verticals selected yet"  
- Container ID: `selectedVerticals`

### Reusable Component

Use the macro in `/web/components/selection_container.peb`:

```pebble
{% call selection_container("selectedRoles", "Selected Roles", "No roles selected yet", "list-container") %}
    <!-- Badge items go here -->
{% endcall %}
```

## Form Input Standards

- **Required fields**: Red asterisk (*) after label
- **Input styling**: Rounded inputs with blue focus borders
- **Section headers**: `text-lg font-medium text-gray-900 mb-4`
- **Field spacing**: `space-y-6` for sections, `space-y-3` for field groups

## Consistent Application

This pattern is used across:
- Admin user forms (new/edit)
- Partner forms 
- Feature group forms
- Any form with multi-select functionality

Always apply this dotted container pattern for selection areas to maintain visual consistency across the application.