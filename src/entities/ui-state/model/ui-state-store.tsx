import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface UIState {
  // Selected items (for tables, lists, etc.)
  selectedItems: Set<string | number>
  setSelectedItems: (items: Set<string | number>) => void
  toggleItemSelection: (itemId: string | number) => void
  clearSelection: () => void
  isItemSelected: (itemId: string | number) => boolean
  
  // Modal/Dialog states
  openDialogs: Set<string>
  openDialog: (dialogId: string) => void
  closeDialog: (dialogId: string) => void
  isDialogOpen: (dialogId: string) => boolean
  
  // Loading states
  loadingStates: Record<string, boolean>
  setLoading: (key: string, loading: boolean) => void
  isLoading: (key: string) => boolean
}

const UIStateContext = createContext<UIState | undefined>(undefined)

interface UIStateProviderProps {
  children: ReactNode
}

export function UIStateProvider({ children }: UIStateProviderProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set())
  const [openDialogs, setOpenDialogs] = useState<Set<string>>(new Set())
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const toggleItemSelection = (itemId: string | number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const clearSelection = () => {
    setSelectedItems(new Set())
  }

  const isItemSelected = (itemId: string | number) => {
    return selectedItems.has(itemId)
  }

  const openDialog = (dialogId: string) => {
    setOpenDialogs((prev) => new Set(prev).add(dialogId))
  }

  const closeDialog = (dialogId: string) => {
    setOpenDialogs((prev) => {
      const newSet = new Set(prev)
      newSet.delete(dialogId)
      return newSet
    })
  }

  const isDialogOpen = (dialogId: string) => {
    return openDialogs.has(dialogId)
  }

  const setLoading = (key: string, loading: boolean) => {
    setLoadingStates((prev) => ({
      ...prev,
      [key]: loading,
    }))
  }

  const isLoading = (key: string) => {
    return loadingStates[key] || false
  }

  const value: UIState = {
    selectedItems,
    setSelectedItems,
    toggleItemSelection,
    clearSelection,
    isItemSelected,
    openDialogs,
    openDialog,
    closeDialog,
    isDialogOpen,
    loadingStates,
    setLoading,
    isLoading,
  }

  return <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>
}

export function useUIState() {
  const context = useContext(UIStateContext)
  if (context === undefined) {
    throw new Error("useUIState must be used within a UIStateProvider")
  }
  return context
}

