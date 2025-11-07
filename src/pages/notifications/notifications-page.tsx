import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Bell, CheckCheck } from "lucide-react"

export function NotificationsPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("notifications.title")}</h1>
          <p className="text-muted-foreground">
            {t("notifications.description")}
          </p>
        </div>
        <Button variant="outline">
          <CheckCheck className="mr-2 h-4 w-4" />
          {t("notifications.markAllRead")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("notifications.recent")}</CardTitle>
          <CardDescription>
            {t("notifications.recentDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">{t("notifications.noNotifications")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("notifications.allCaughtUp")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
