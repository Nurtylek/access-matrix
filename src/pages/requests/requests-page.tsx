import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { List, Plus } from "lucide-react"

export function RequestsPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("requests.title")}</h1>
          <p className="text-muted-foreground">
            {t("requests.description")}
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("requests.newRequest")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("requests.myRequests")}</CardTitle>
          <CardDescription>
            {t("requests.myRequestsDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <List className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">{t("requests.noRequests")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("requests.noRequestsDescription")}
            </p>
            <Button variant="outline" className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              {t("requests.createRequest")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
