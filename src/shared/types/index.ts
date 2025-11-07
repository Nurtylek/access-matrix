export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
}

export interface AccessRequest {
  id: string
  userId: string
  resource: string
  role: string
  status: "pending" | "approved" | "rejected"
  requestedAt: string
  reviewedAt?: string
  reviewedBy?: string
}

export interface Access {
  id: string
  userId: string
  resource: string
  role: string
  grantedAt: string
  grantedBy: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}

export interface CatalogItem {
  id: string
  name: string
  description: string
  category: string
  roles: string[]
}

