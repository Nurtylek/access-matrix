import { useQuery } from "@tanstack/react-query"
import {
  mockAccessRequests,
  mockAccesses,
  mockNotifications,
  mockCatalogItems,
  mockUsers,
} from "./mock-data"
import type { AccessRequest, Access, Notification, CatalogItem, User } from "../types"

export function useAccessRequests() {
  return useQuery<AccessRequest[]>({
    queryKey: ["accessRequests"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockAccessRequests
    },
  })
}

export function useMyAccesses(userId?: string) {
  return useQuery<Access[]>({
    queryKey: ["myAccesses", userId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockAccesses.filter((access) => access.userId === userId)
    },
    enabled: !!userId,
  })
}

export function useNotifications(userId?: string) {
  return useQuery<Notification[]>({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockNotifications.filter((notif) => notif.userId === userId)
    },
    enabled: !!userId,
  })
}

export function useCatalog() {
  return useQuery<CatalogItem[]>({
    queryKey: ["catalog"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockCatalogItems
    },
  })
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockUsers
    },
  })
}

export function useUser(userId?: string) {
  return useQuery<User | undefined>({
    queryKey: ["user", userId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockUsers.find((user) => user.id === userId)
    },
    enabled: !!userId,
  })
}

