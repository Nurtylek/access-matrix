import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"

interface NavigationState {
  currentPath: string
  setCurrentPath: (path: string) => void
  isNavItemActive: (path: string) => boolean
}

const NavigationContext = createContext<NavigationState | undefined>(undefined)

interface NavigationProviderProps {
  children: ReactNode
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState(location.pathname)

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location.pathname])

  const isNavItemActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(path + "/")
  }

  const value: NavigationState = {
    currentPath,
    setCurrentPath,
    isNavItemActive,
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}

