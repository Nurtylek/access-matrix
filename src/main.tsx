import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "./shared/config/i18n"
import App from "./app/app.tsx"
import { RouterProvider } from "./app/providers/router/router-provider"
import { QueryProvider } from "./app/providers/query/query-provider"
import { SessionProvider } from "./entities/session"
import { NavigationProvider } from "./entities/navigation"
import { UIStateProvider } from "./entities/ui-state"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <UIStateProvider>
        <QueryProvider>
          <RouterProvider>
            <NavigationProvider>
              <App />
            </NavigationProvider>
          </RouterProvider>
        </QueryProvider>
      </UIStateProvider>
    </SessionProvider>
  </StrictMode>
)
