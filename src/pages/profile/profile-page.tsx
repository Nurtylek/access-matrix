import { useTranslation } from "react-i18next"
import { useSession } from "@/entities/session"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Label } from "@/shared/ui/label"
import { User, Mail, Shield } from "lucide-react"

export function ProfilePage() {
  const { t } = useTranslation()
  const { user } = useSession()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("profile.title")}</h1>
        <p className="text-muted-foreground">
          {t("profile.description")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("profile.accountInfo")}</CardTitle>
          <CardDescription>{t("profile.accountDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">{t("profile.name")}</Label>
              <div className="text-lg font-medium">{user?.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">{t("profile.email")}</Label>
              <div className="text-lg font-medium">{user?.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">{t("profile.role")}</Label>
              <div className="text-lg font-medium capitalize">{t(`roles.${user?.role}`)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
