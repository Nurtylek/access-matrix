import type { AccessRequest, Access, Notification, CatalogItem, User } from "../types"

export const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    roles: ["admin", "user"],
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    roles: ["user"],
  },
]

export const mockAccessRequests: AccessRequest[] = [
  {
    id: "1",
    userId: "1",
    resource: "financial-reports",
    role: "viewer",
    status: "pending",
    requestedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "2",
    resource: "user-management",
    role: "editor",
    status: "approved",
    requestedAt: "2024-01-14T09:00:00Z",
    reviewedAt: "2024-01-14T14:30:00Z",
    reviewedBy: "admin",
  },
]

export const mockAccesses: Access[] = [
  {
    id: "1",
    userId: "1",
    resource: "financial-reports",
    role: "admin",
    grantedAt: "2024-01-01T00:00:00Z",
    grantedBy: "system",
  },
  {
    id: "2",
    userId: "2",
    resource: "user-management",
    role: "viewer",
    grantedAt: "2024-01-10T00:00:00Z",
    grantedBy: "admin",
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    title: "Access Request Approved",
    message: "Your request for viewer access to financial-reports has been approved",
    type: "success",
    read: false,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    userId: "1",
    title: "New Role Assigned",
    message: "You have been assigned the admin role",
    type: "info",
    read: true,
    createdAt: "2024-01-10T08:00:00Z",
  },
]

export const mockCatalogItems: CatalogItem[] = [
  {
    id: "1",
    name: "Financial Reports",
    description: "Access to financial reports and analytics",
    category: "Reports",
    roles: ["viewer", "editor", "admin"],
  },
  {
    id: "2",
    name: "User Management",
    description: "Manage users and their permissions",
    category: "Administration",
    roles: ["viewer", "editor", "admin"],
  },
  {
    id: "3",
    name: "System Settings",
    description: "Configure system-wide settings",
    category: "Administration",
    roles: ["admin"],
  },
]

