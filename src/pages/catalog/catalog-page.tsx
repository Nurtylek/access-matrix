import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Search, Database } from "lucide-react"

export function CatalogPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("catalog.title")}</h1>
        <p className="text-muted-foreground">
          {t("catalog.description")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("catalog.searchSystems")}</CardTitle>
          <CardDescription>
            {t("catalog.searchDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("catalog.searchPlaceholder")}
                className="pl-9"
              />
            </div>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Database className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">{t("catalog.noSystems")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("catalog.noSystemsDescription")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
