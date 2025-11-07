# Understanding shadcn/ui and Radix UI

## What is shadcn/ui?

**shadcn/ui is NOT a traditional component library.** It's a collection of **copy-paste components** that you add directly to your project.

From the [official documentation](https://ui.shadcn.com/docs):
> "This is NOT a component library. It's a collection of re-usable components that you can copy and paste into your apps."

## Why Radix UI?

shadcn/ui components are built on top of **Radix UI primitives**. Here's why:

### Radix UI Provides:
- ✅ **Accessibility** - WAI-ARIA compliant components
- ✅ **Unstyled primitives** - No opinions on styling
- ✅ **Keyboard navigation** - Full keyboard support
- ✅ **Focus management** - Proper focus handling
- ✅ **Screen reader support** - Works with assistive technologies

### shadcn/ui Adds:
- ✅ **Beautiful styling** - Tailwind CSS styles
- ✅ **Dark mode** - Theme support out of the box
- ✅ **Customization** - Easy to modify
- ✅ **Modern design** - Production-ready components

## Component Architecture

When you use a shadcn/ui component like `<Avatar>`, here's what happens:

```tsx
// Your code
<Avatar>
  <AvatarFallback>TU</AvatarFallback>
</Avatar>

// Under the hood (simplified)
<RadixAvatar.Root>  {/* ← Radix UI primitive */}
  <RadixAvatar.Fallback className="bg-primary ...">  {/* ← Tailwind styles */}
    TU
  </RadixAvatar.Fallback>
</RadixAvatar.Root>
```

## Components in This Project

All UI components use this architecture:

| Component | Radix UI Package | Purpose |
|-----------|-----------------|---------|
| Avatar | `@radix-ui/react-avatar` | User avatars |
| DropdownMenu | `@radix-ui/react-dropdown-menu` | Dropdown menus |
| ScrollArea | `@radix-ui/react-scroll-area` | Scrollable areas |
| Separator | `@radix-ui/react-separator` | Visual separators |
| Sidebar | `@radix-ui/react-dialog` (Sheet) | Mobile sidebar |
| Tooltip | `@radix-ui/react-tooltip` | Tooltips |
| Sheet | `@radix-ui/react-dialog` | Slide-out panels |

## Why This Matters

1. **You need Radix UI packages** - They're dependencies, not optional
2. **You can't "remove" Radix UI** - shadcn components won't work without it
3. **This is intentional design** - Radix provides the behavior, shadcn provides the style

## Official shadcn Sidebar Component

We're now using the official [shadcn Sidebar component](https://ui.shadcn.com/docs/components/sidebar) which includes:

- ✅ Collapsible sidebar
- ✅ Mobile responsive (uses Sheet/Dialog)
- ✅ Keyboard shortcuts
- ✅ Tooltip support
- ✅ Multiple layouts
- ✅ Built-in state management

## Installation

The shadcn CLI automatically installs required Radix UI packages:

```bash
npx shadcn@latest add sidebar
```

This installs:
- Component files in `src/shared/ui/`
- Required Radix UI packages via npm
- TypeScript types

## Summary

**shadcn/ui = Radix UI (behavior) + Tailwind CSS (styling) + React (framework)**

You cannot use shadcn/ui without Radix UI. They work together by design to provide accessible, beautiful, and customizable components.

---

**References:**
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [shadcn/ui FAQ](https://ui.shadcn.com/docs/components)

