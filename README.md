# RBAC Access Matrix UI

A modern Role-Based Access Control (RBAC) portal built with React, TypeScript, and Feature-Sliced Design architecture.

## 🚀 Features

- **Mock Authentication System** - Temporary authentication without Keycloak integration
- **Role-Based Access Control** - Four user roles: Admin, Manager, Security, Employee
- **Protected Routes** - Role-based route protection
- **Modern UI** - Built with shadcn/ui components and Lucide icons
- **Data Fetching** - TanStack Query for efficient API calls
- **Responsive Layout** - Sidebar + Topbar navigation
- **FSD Architecture** - Clean, scalable Feature-Sliced Design

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TanStack Query** - Server state management
- **TanStack Table** - Table management
- **React Router DOM** - Routing
- **shadcn/ui** - UI components (built on Radix UI)
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling
- **Feature-Sliced Design** - Architecture

## 📦 Installation

First, install the required Radix UI dependencies for shadcn/ui components:

```bash
npm install @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-scroll-area @radix-ui/react-separator
```

Then install other dependencies (if not already installed):

```bash
npm install
```

## 🏃 Running the Application

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## 👥 User Roles

The application supports four roles with different access levels:

### Employee (Default)
- Access to: Profile, My Accesses, Requests, Catalog, Notifications

### Manager
- All Employee access
- Additional: Access Management page

### Security
- All Employee access
- Additional: Access Management page

### Admin
- Full access to all pages and features

## 🎛️ Role Switcher

A role switcher is available in the topbar (top-right corner) for development purposes. Click "Switch Role" to test different user roles and see how the UI adapts:

- Navigation items show/hide based on role
- Protected routes redirect unauthorized users
- Access Management page only visible to Admin, Manager, and Security roles

## 📁 Project Structure (FSD)

```
src/
├── app/                    # Application setup
│   ├── app.tsx            # Main app component with routing
│   └── providers/         # Context providers
│       ├── query/         # TanStack Query provider
│       └── router/        # Router provider
│
├── entities/              # Business entities
│   ├── session/           # User session & authentication
│   │   ├── model/         # Types & store
│   │   └── index.ts       # Public API
│   └── access/            # User access entity
│       ├── api/           # API queries
│       ├── model/         # Types
│       └── index.ts       # Public API
│
├── features/              # User features
│   └── auth/              # Authentication features
│       └── RoleSwitcher.tsx
│
├── widgets/               # Composite UI blocks
│   ├── layout/            # App layout
│   │   └── AppLayout.tsx
│   ├── sidebar/           # Navigation sidebar
│   │   └── Sidebar.tsx
│   └── topbar/            # Top navigation bar
│       └── Topbar.tsx
│
├── pages/                 # Application pages
│   ├── profile/
│   ├── my-accesses/       # Full implementation with TanStack Table
│   ├── requests/
│   ├── catalog/
│   ├── access-management/ # Protected route
│   └── notifications/
│
└── shared/                # Shared resources
    ├── ui/                # shadcn/ui components
    │   ├── button.tsx
    │   ├── card.tsx
    │   ├── table.tsx
    │   ├── avatar.tsx
    │   ├── dropdown-menu.tsx
    │   ├── scroll-area.tsx
    │   ├── separator.tsx
    │   ├── skeleton.tsx
    │   ├── input.tsx
    │   └── label.tsx
    ├── lib/               # Utilities
    │   ├── utils.ts
    │   └── RequireRole.tsx
    └── types/             # Shared types
```

## 🔐 Authentication Flow

1. User starts with default "employee" role
2. Session is managed via React Context (`SessionProvider`)
3. `useSession()` hook provides:
   - `user` - Current user object
   - `isAuthenticated` - Auth status
   - `login(role)` - Set user role
   - `logout()` - Clear session

## 🛡️ Protected Routes

Routes are protected using the `RequireRole` component:

```tsx
<Route
  path="access-management"
  element={
    <RequireRole allowedRoles={["admin", "manager", "security"]}>
      <AccessManagementPage />
    </RequireRole>
  }
/>
```

Unauthorized access attempts redirect to the home page.

## 📊 My Accesses Page (Full Implementation)

The My Accesses page demonstrates a complete implementation with:

- **TanStack Table** - Table with sorting capabilities
- **TanStack Query** - Data fetching with loading states
- **Mock API** - Simulated 600ms server delay
- **Loading Skeleton** - Skeleton UI during data fetch
- **Empty States** - Proper handling of no data
- **Error States** - Error handling UI

## 🎨 UI Components

All UI components are from shadcn/ui (built on Radix UI primitives):

- **Navigation**: Sidebar with NavLink
- **Layout**: ScrollArea, Separator
- **Data Display**: Table, Card, Avatar
- **Feedback**: Skeleton, Loading states
- **Forms**: Input, Label, Button
- **Overlays**: DropdownMenu

## 🔄 Mock Data & API

Mock data is located in `entities/access/api/access-api.ts`:

```typescript
useUserAccessesQuery() // Returns mock access data with delay
```

To modify mock data, edit the `mockUserAccesses` array in `access-api.ts`.

## 🚧 Future Enhancements

- Replace mock authentication with Keycloak integration
- Add real API endpoints
- Implement access request workflow
- Add user management features
- Add audit logging
- Implement notifications system

## 📝 Development Notes

### Adding New Pages

1. Create page component in `src/pages/[page-name]/`
2. Add route in `src/app/app.tsx`
3. Add navigation item in `src/widgets/sidebar/Sidebar.tsx`
4. Configure role access if needed

### Adding New Entities

1. Create entity folder in `src/entities/[entity-name]/`
2. Add types in `model/types.ts`
3. Add API queries in `api/[entity]-api.ts`
4. Export public API in `index.ts`

### Adding New Features

1. Create feature component in `src/features/[feature-name]/`
2. Use entity hooks for data
3. Keep features isolated and reusable

## 🤝 Contributing

Follow the Feature-Sliced Design principles:

- **Layers**: app → pages → widgets → features → entities → shared
- **No upward imports**: Lower layers can't import from upper layers
- **Public API**: Each slice exports through `index.ts`
- **Isolation**: Features and entities are independent

## 📄 License

MIT

---

Built with ❤️ using React, TypeScript, and Feature-Sliced Design
