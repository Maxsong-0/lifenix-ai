"use client"
import { Bell, Shield, Moon, Globe, LogOut, User, Smartphone, Laptop, Download, Trash2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface SettingsViewProps {
  t: any
  onToggleLanguage: () => void
  language: string
}

export function SettingsView({ t, onToggleLanguage, language }: SettingsViewProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{t.sidebarSettings}</h2>
      </div>

      {/* Profile Section */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <User className="h-4 w-4" /> {t.settingsProfile}
        </h3>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-sm backdrop-blur-sm">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/20" />
            <button className="absolute bottom-0 right-0 rounded-full bg-slate-800 p-1.5 border border-white/10 text-white hover:bg-slate-700">
              <User className="h-3 w-3" />
            </button>
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-xl font-bold text-white">Alex Johnson</h4>
            <p className="text-sm text-slate-400">alex.johnson@example.com</p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400 border border-cyan-500/20">
                Pro Plan
              </span>
              <span className="inline-flex items-center rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-400 border border-purple-500/20">
                {t.settingsMemberSince} 2023
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white bg-transparent"
          >
            {t.settingsEditProfile}
          </Button>
        </div>
      </section>

      {/* Preferences */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Laptop className="h-4 w-4" /> {t.settingsPreferences}
        </h3>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-sm backdrop-blur-sm divide-y divide-white/5">
          <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Globe className="h-5 w-5 text-slate-300" />
              </div>
              <div>
                <p className="font-medium text-white">{t.settingsLanguage}</p>
                <p className="text-xs text-slate-400">{t.settingsLanguageDesc}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onToggleLanguage}
              className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30"
            >
              {language === "en" ? "English" : "中文"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Moon className="h-5 w-5 text-slate-300" />
              </div>
              <div>
                <p className="font-medium text-white">{t.settingsDarkMode}</p>
                <p className="text-xs text-slate-400">{t.settingsDarkModeDesc}</p>
              </div>
            </div>
            <Switch checked={true} onCheckedChange={() => {}} className="data-[state=checked]:bg-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Bell className="h-5 w-5 text-slate-300" />
              </div>
              <div>
                <p className="font-medium text-white">{t.settingsNotifications}</p>
                <p className="text-xs text-slate-400">{t.settingsNotificationsDesc}</p>
              </div>
            </div>
            <Switch checked={true} onCheckedChange={() => {}} className="data-[state=checked]:bg-cyan-500" />
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Smartphone className="h-4 w-4" /> {t.settingsIntegrations}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-blue-500 flex items-center justify-center text-white font-bold">
                  G
                </div>
                <span className="font-medium text-white">{t.settingsGoogleCalendar}</span>
              </div>
              <Switch checked={true} className="data-[state=checked]:bg-green-500" />
            </div>
            <p className="text-xs text-slate-400">{t.settingsGoogleCalendarDesc}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-slate-700 flex items-center justify-center text-white font-bold">
                  N
                </div>
                <span className="font-medium text-white">{t.settingsNotion}</span>
              </div>
              <Switch checked={false} className="data-[state=checked]:bg-green-500" />
            </div>
            <p className="text-xs text-slate-400">{t.settingsNotionDesc}</p>
          </div>
        </div>
      </section>

      {/* Data & Security */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Shield className="h-4 w-4" /> {t.settingsDataSecurity}
        </h3>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-sm backdrop-blur-sm divide-y divide-white/5">
          <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Download className="h-5 w-5 text-slate-300" />
              </div>
              <div>
                <p className="font-medium text-white">{t.settingsExportData}</p>
                <p className="text-xs text-slate-400">{t.settingsExportDataDesc}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 text-slate-300 hover:bg-white/5 bg-transparent"
            >
              {t.settingsExportCSV}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-500/10 p-2">
                <Trash2 className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="font-medium text-red-400">{t.settingsDeleteAccount}</p>
                <p className="text-xs text-slate-400">{t.settingsDeleteAccountDesc}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10 hover:text-red-300">
              {t.settingsDelete}
            </Button>
          </div>
        </div>
      </section>

      <Separator className="bg-white/10" />

      <div className="flex justify-center pt-4">
        <Button variant="ghost" className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-white/5">
          <LogOut className="h-4 w-4" />
          {t.settingsLogOutAll}
        </Button>
      </div>
    </div>
  )
}
