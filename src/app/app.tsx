import { Routes, Route, Navigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AppLayout } from "@/widgets/layout/AppLayout"
import { RequireRole } from "@/shared/lib/RequireRole"
import { ProfilePage } from "@/pages/profile/profile-page"
import { MyAccessesPage } from "@/pages/my-accesses/my-accesses-page"
import { RequestsPage } from "@/pages/requests/requests-page"
import { CatalogPage } from "@/pages/catalog/catalog-page"
import { AccessManagementPage } from "@/pages/access-management/access-management-page"
import { NotificationsPage } from "@/pages/notifications/notifications-page"
import { useSession } from "@/entities/session"

function App() {
  const { t } = useTranslation()
  const { isAuthenticated } = useSession()

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">{t("session.expired")}</h1>
          <p className="text-muted-foreground">{t("session.expiredDescription")}</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/profile" replace />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="my-accesses" element={<MyAccessesPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route
          path="access-management"
          element={
            <RequireRole allowedRoles={["admin", "manager", "security"]}>
              <AccessManagementPage />
            </RequireRole>
          }
        />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
