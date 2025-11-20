"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  CheckSquare,
  CalendarIcon,
  BarChart3,
  Settings,
  LogOut,
  Globe2,
  Sparkles,
  ListChecks,
  Brain,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
  Star,
  Share,
  Bookmark,
  Plus,
} from "lucide-react"
import { Calendar } from "@/components/ui/calendar" // Added Calendar import
import { HomeView } from "@/components/dashboard/home-view"
import { TasksView } from "@/components/dashboard/tasks-view"
import { CalendarView, type CalendarEvent } from "@/components/dashboard/calendar-view" // Added CalendarView import and type
import { InsightsView } from "@/components/dashboard/insights-view"
import { SettingsView } from "@/components/dashboard/settings-view"
import { AuthView } from "@/components/auth-view"
import { OnboardingModal } from "@/components/onboarding-modal"
import { AIAssistant } from "@/components/ai-assistant"
import SplitText from "@/components/split-text"
import TextType from "@/components/ui/text-type" // Import TextType
import AnimatedContent from "@/components/animated-content"
import GradualBlur from "@/components/gradual-blur"
import Magnet from "@/components/magnet"
import ScrollStack, { ScrollStackItem } from "@/components/scroll-stack"
import FloatingLines from "@/components/floating-lines"
import { EventDetailsDialog } from "@/components/dashboard/event-details-dialog" // Import EventDetailsDialog
import { CreateEventDialog } from "@/components/dashboard/create-event-dialog" // Import CreateEventDialog
import { AddCalendarDialog } from "@/components/dashboard/add-calendar-dialog" // Import AddCalendarDialog

const translations = {
  en: {
    brand: "Lifenix AI",
    heroTitle: "Design Your Life with AI",
    heroSubtitle: "An intelligent co-pilot that turns your chaos into a calm, focused life.",
    ctaPrimary: "Get Started",
    ctaSecondary: "Login",
    navFeatures: "Features",
    navHowItWorks: "How it works",
    navPricing: "Pricing",
    featureTaskTitle: "Task Analysis",
    featureTaskDesc: "Break complex goals into clear, prioritized steps with AI assistance.",
    featurePlanTitle: "Smart Plans",
    featurePlanDesc: "Generate adaptive daily plans that react to your energy and schedule.",
    featureWellnessTitle: "Wellness Alignment",
    featureWellnessDesc: "Balance productivity with rest, mindfulness, and health insights.",
    philosophyTitle: "The Lifenix Philosophy",
    philosophySubtitle: "Calm productivity, not busy work.",
    philosophyBody:
      "In a world of constant notifications, your attention is your most valuable currency. Lifenix helps you spend it wisely by filtering out the noise and amplifying what truly matters.",
    testimonialsTitle: "Loved by High Performers",
    testim1Text:
      "Finally, a to-do list that actually understands how my brain works. It's not just a tool, it's a relief.",
    testim1Author: "Sarah J., Product Designer",
    testim2Text:
      "The wellness integration is a game changer. I no longer burn out because Lifenix tells me when to rest.",
    testim2Author: "Michael C., Founder",
    testim3Text: "I used to drown in tasks. Now I surf them. The AI prioritization is uncannily accurate.",
    testim3Author: "Elena R., Writer",
    faqTitle: "Frequently Asked Questions",
    faqQ1: "How is this different from other to-do apps?",
    faqA1:
      "Lifenix doesn't just list tasks; it actively plans them based on your energy levels and historical performance.",
    faqQ2: "Is my data private?",
    faqA2: "Absolutely. We use a privacy-first architecture where your personal data is encrypted and never sold.",
    faqQ3: "Does it work with my calendar?",
    faqA3: "Yes, Lifenix integrates seamlessly with Google Calendar and Outlook to block time for deep work.",
    pricingTitle: "Simple, Transparent Pricing",
    pricingSubtitle: "Invest in your focus. No hidden fees, cancel anytime.",
    pricingMonthly: "Monthly",
    pricingYearly: "Yearly",
    pricingSave: "Save 20%",
    planFreeTitle: "Starter",
    planFreePrice: "$0",
    planFreeDesc: "Perfect for individuals getting started with AI planning.",
    planProTitle: "Pro",
    planProPrice: "$12",
    planProDesc: "For power users who want to maximize their productivity.",
    planTeamTitle: "Team",
    planTeamPrice: "$49",
    planTeamDesc: "Collaborate and align your team's focus and goals.",
    planFeature1: "Smart Task Prioritization",
    planFeature2: "Basic AI Assistant",
    planFeature3: "Calendar Integration",
    planFeature4: "Advanced AI Insights",
    planFeature5: "Unlimited Projects",
    planFeature6: "Wellness Analytics",
    planFeature7: "Team Collaboration",
    planFeature8: "Admin Dashboard",
    planFeature9: "Priority Support",
    planBtnFree: "Get Started",
    planBtnPro: "Start Pro Trial",
    planBtnTeam: "Contact Sales",
    teamTitle: "Meet the Team",
    teamSubtitle: "The minds behind Lifenix AI",
    bottomCtaTitle: "Ready to reclaim your focus?",
    bottomCtaDesc: "Join thousands of users who have traded chaos for clarity. Start your journey today.",
    bottomCtaButton: "Start for Free",
    footerLinks: ["Privacy", "Terms", "Support"],
    languageLabel: "中文",
    dashTitle: "My Dashboard",
    dashSubtitle: "Your personal command center for focus, habits, and goals.",
    logout: "Log Out",
    statsTitle: "Weekly Focus",
    statsSubtitle: "Average focus score this week",
    chartTitle: "Productivity Trend",
    listTitle: "Today's Plan",
    listEmpty: "No tasks yet. Add something meaningful to your day.",
    insightTitle: "Lifenix Insight",
    insightText: "Block 90 minutes for your most important task and silence non-essential notifications.",
    tasksCompleted: "Tasks Completed",
    focusScoreLabel: "Focus Score",
    sidebarHome: "Home",
    sidebarTasks: "Tasks",
    sidebarCalendar: "Calendar",
    sidebarInsights: "Insights",
    sidebarSettings: "Settings",
    toggleToLandingTooltip: "Back to landing",
    tasksFilterAll: "All",
    tasksFilterActive: "Active",
    tasksFilterCompleted: "Completed",
    // Settings Translations
    settingsProfile: "Profile",
    settingsPreferences: "Preferences",
    settingsLanguage: "Language",
    settingsLanguageDesc: "Select your preferred language",
    settingsDarkMode: "Dark Mode",
    settingsDarkModeDesc: "Adjust the appearance of the app",
    settingsNotifications: "Notifications",
    settingsNotificationsDesc: "Manage your email and push notifications",
    settingsIntegrations: "Integrations",
    settingsGoogleCalendar: "Google Calendar",
    settingsGoogleCalendarDesc: "Sync your events and tasks",
    settingsNotion: "Notion",
    settingsNotionDesc: "Import pages and databases",
    settingsDataSecurity: "Data & Security",
    settingsExportData: "Export Data",
    settingsExportDataDesc: "Download all your tasks and events",
    settingsExportCSV: "Export CSV",
    settingsDeleteAccount: "Delete Account",
    settingsDeleteAccountDesc: "Permanently remove all your data",
    settingsDelete: "Delete",
    settingsLogOutAll: "Log Out of All Devices",
    settingsEditProfile: "Edit Profile",
    settingsMemberSince: "Member since",
    // Calendar Translations
    calToday: "Today",
    calDay: "Day",
    calWeek: "Week",
    calSearch: "Search events",
    calMyCalendars: "My Calendars",
    calAddCalendar: "Add Calendar",
    // Dialog Translations
    dialogAddCalendarTitle: "Add New Calendar",
    dialogCalendarName: "Calendar Name",
    dialogColor: "Color",
    dialogCancel: "Cancel",
    dialogSave: "Save",
    dialogAdd: "Add",
    dialogEditEventTitle: "Edit Event",
    dialogAddEventTitle: "Add New Event",
    dialogEventTitle: "Event Title",
    dialogDate: "Date",
    dialogStartTime: "Start Time",
    dialogEndTime: "End Time",
    dialogCalendar: "Calendar",
    dialogUpdateEvent: "Update Event",
    dialogSaveEvent: "Save Event",
    dialogClose: "Close",
    dialogEdit: "Edit",
    dialogDelete: "Delete",
    // Auth Translations
    authLoginTitle: "Welcome Back",
    authLoginSubtitle: "Enter your details to access your workspace.",
    authSignupTitle: "Create Account",
    authSignupSubtitle: "Start your journey to calm productivity.",
    authNameLabel: "Full Name",
    authEmailLabel: "Email Address",
    authPasswordLabel: "Password",
    authConfirmPasswordLabel: "Confirm Password",
    authAgeLabel: "Age Range",
    authAgePlaceholder: "Select your age range",
    authImportCalendar: "Import Calendar",
    authSubmitLogin: "Sign In",
    authSubmitSignup: "Create Account",
    authSwitchToSignup: "Don't have an account? Sign up",
    authSwitchToLogin: "Already have an account? Sign in",
    authSignInGoogle: "Sign in with Google",
    authSignInApple: "Sign in with Apple",
    authAgeOption1: "Under 18",
    authAgeOption2: "18-24",
    authAgeOption3: "25-34",
    authAgeOption4: "35-44",
    authAgeOption5: "45+",
    aiAssistant: "AI Assistant",
  },
  zh: {
    brand: "Lifenix AI",
    heroTitle: "用 AI 重塑你的生活",
    heroSubtitle: "你的智能人生助理，让混乱变得有序，让专注变得轻松。",
    ctaPrimary: "立即开始",
    ctaSecondary: "登录",
    navFeatures: "功能亮点",
    navHowItWorks: "工作原理",
    navPricing: "价格方案",
    featureTaskTitle: "任务分析",
    featureTaskDesc: "用 AI 拆解复杂目标，自动排序优先级。",
    featurePlanTitle: "智能计划",
    featurePlanDesc: "根据你的时间和精力，动态生成每日行动计划。",
    featureWellnessTitle: "身心平衡",
    featureWellnessDesc: "在效率与休息之间找到最佳平衡点，守护你的健康。",
    philosophyTitle: "Lifenix 哲学",
    philosophySubtitle: "从容高效，拒绝虚忙",
    philosophyBody:
      "在这个充满通知的世界里，注意力是你最宝贵的货币。Lifenix 帮你过滤噪音，放大真正重要的事情，让你明智地使用每一分钟。",
    testimonialsTitle: "深受高效人士喜爱",
    testim1Text: "终于有一个真正懂我大脑运作方式的待办清单了。它不仅仅是一个工具，更是一种解脱。",
    testim1Author: "Sarah J., 产品设计师",
    testim2Text: "身心健康整合功能改变了一切。我不再因为过度工作而倦怠，因为 Lifenix 会提醒我何时休息。",
    testim2Author: "Michael C., 创始人",
    testim3Text: "我曾经被任务淹没，现在我能驾驭它们。AI 的优先级排序准确得惊人。",
    testim3Author: "Elena R., 作家",
    faqTitle: "常见问题",
    faqQ1: "这与其他待办应用有什么不同？",
    faqA1: "Lifenix 不仅仅列出任务，它会根据你的精力水平和历史表现主动为你规划日程。",
    faqQ2: "我的数据隐私吗？",
    faqA2: "绝对隐私。我们采用隐私优先的架构，您的个人数据经过加密处理，绝不出售。",
    faqQ3: "它支持我的日历吗？",
    faqA3: "是的，Lifenix 与 Google 日历和 Outlook 无缝集成，为您锁定深度工作时间。",
    pricingTitle: "简单透明的价格",
    pricingSubtitle: "为你的专注力投资。无隐藏费用，随时取消。",
    pricingMonthly: "月付",
    pricingYearly: "年付",
    pricingSave: "省 20%",
    planFreeTitle: "入门版",
    planFreePrice: "¥0",
    planFreeDesc: "适合刚开始接触 AI 规划的个人用户。",
    planProTitle: "专业版",
    planProPrice: "¥88", // Changed from "$12" to match Yen symbol
    planProDesc: "专为追求极致效率的高能用户打造。",
    planTeamTitle: "团队版",
    planTeamPrice: "¥328", // Changed from "$49" to match Yen symbol
    planTeamDesc: "协同团队目标，统一专注步调。",
    planFeature1: "智能任务优先级",
    planFeature2: "基础 AI 助手",
    planFeature3: "日历集成",
    planFeature4: "高级 AI 洞察",
    planFeature5: "无限项目",
    planFeature6: "身心健康分析",
    planFeature7: "团队协作",
    planFeature8: "管理后台",
    planFeature9: "优先支持",
    planBtnFree: "免费开始",
    planBtnPro: "开始专业版试用",
    planBtnTeam: "联系销售",
    teamTitle: "认识团队",
    teamSubtitle: "Lifenix AI 背后的智慧",
    bottomCtaTitle: "准备好找回你的专注了吗？",
    bottomCtaDesc: "加入数千名用户的行列，告别混乱，拥抱清晰。今天就开始你的旅程。",
    bottomCtaButton: "免费开始",
    footerLinks: ["隐私政策", "使用条款", "支持中心"],
    languageLabel: "EN",
    dashTitle: "我的仪表盘",
    dashSubtitle: "专属于你的专注、习惯与目标中枢。",
    logout: "退出登录",
    statsTitle: "本周专注度",
    statsSubtitle: "本周平均专注分数",
    chartTitle: "效率趋势",
    listTitle: "今日计划",
    listEmpty: "今天还没有任务，添加一个让你进步 1% 的行动吧。",
    insightTitle: "Lifenix 洞察",
    insightText: "为你最重要的任务预留 90 分钟深度专注时间，并关闭一切非必要提醒。",
    tasksCompleted: "已完成任务数",
    focusScoreLabel: "专注度评分",
    sidebarHome: "首页",
    sidebarTasks: "任务",
    sidebarCalendar: "日历",
    sidebarInsights: "洞察",
    sidebarSettings: "设置",
    toggleToLandingTooltip: "返回首页",
    tasksFilterAll: "全部",
    tasksFilterActive: "进行中",
    tasksFilterCompleted: "已完成",
    // Settings Translations
    settingsProfile: "个人资料",
    settingsPreferences: "偏好设置",
    settingsLanguage: "语言",
    settingsLanguageDesc: "选择您的首选语言",
    settingsDarkMode: "深色模式",
    settingsDarkModeDesc: "调整应用外观",
    settingsNotifications: "通知",
    settingsNotificationsDesc: "管理邮件和推送通知",
    settingsIntegrations: "集成",
    settingsGoogleCalendar: "Google 日历",
    settingsGoogleCalendarDesc: "同步您的日程和任务",
    settingsNotion: "Notion",
    settingsNotionDesc: "导入页面和数据库",
    settingsDataSecurity: "数据与安全",
    settingsExportData: "导出数据",
    settingsExportDataDesc: "下载所有任务和日程",
    settingsExportCSV: "导出 CSV",
    settingsDeleteAccount: "删除账户",
    settingsDeleteAccountDesc: "永久删除所有数据",
    settingsDelete: "删除",
    settingsLogOutAll: "退出所有设备",
    settingsEditProfile: "编辑资料",
    settingsMemberSince: "注册时间",
    // Calendar Translations
    calToday: "今天",
    calDay: "日",
    calWeek: "周",
    calSearch: "搜索日程",
    calMyCalendars: "我的日历",
    calAddCalendar: "添加日历",
    // Dialog Translations
    dialogAddCalendarTitle: "添加新日历",
    dialogCalendarName: "日历名称",
    dialogColor: "颜色",
    dialogCancel: "取消",
    dialogSave: "保存",
    dialogAdd: "添加",
    dialogEditEventTitle: "编辑日程",
    dialogAddEventTitle: "添加新日程",
    dialogEventTitle: "日程标题",
    dialogDate: "日期",
    dialogStartTime: "开始时间",
    dialogEndTime: "结束时间",
    dialogCalendar: "日历",
    dialogUpdateEvent: "更新日程",
    dialogSaveEvent: "保存日程",
    dialogClose: "关闭",
    dialogEdit: "编辑",
    dialogDelete: "删除",
    // Auth Translations
    authLoginTitle: "欢迎回来",
    authLoginSubtitle: "输入您的详细信息以访问工作区。",
    authSignupTitle: "创建账户",
    authSignupSubtitle: "开启您的从容高效之旅。",
    authNameLabel: "全名",
    authEmailLabel: "电子邮箱",
    authPasswordLabel: "密码",
    authConfirmPasswordLabel: "确认密码",
    authAgeLabel: "年龄段",
    authAgePlaceholder: "选择您的年龄段",
    authImportCalendar: "导入日历",
    authSubmitLogin: "登录",
    authSubmitSignup: "创建账户",
    authSwitchToSignup: "没有账号？去注册",
    authSwitchToLogin: "已有账号？去登录",
    authSignInGoogle: "通过 Google 登录",
    authSignInApple: "通过 Apple 登录",
    authAgeOption1: "18岁以下",
    authAgeOption2: "18-24岁",
    authAgeOption3: "25-34岁",
    authAgeOption4: "35-44岁",
    authAgeOption5: "45岁以上",
    aiAssistant: "AI 助手",
  },
} as const

type ViewType = "landing" | "dashboard" | "auth" // Removed 'onboarding'
type LanguageType = "en" | "zh"
type AuthMode = "login" | "signup" // Added AuthMode type

export default function LifenixApp() {
  const [currentView, setCurrentView] = useState<ViewType>("landing")
  const [authMode, setAuthMode] = useState<AuthMode>("login") // Added authMode state
  const [showOnboarding, setShowOnboarding] = useState(false) // Added showOnboarding state
  const [language, setLanguage] = useState<LanguageType>("en")
  const t = translations[language]
  const [showAuth, setShowAuth] = useState(false) // Added state for auth modal

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const handleNavigateToAuth = (mode: AuthMode) => {
    setAuthMode(mode)
    setCurrentView("auth")
  }

  const handleAuthSuccess = (mode: "login" | "signup") => {
    setCurrentView("dashboard")
    if (mode === "signup") {
      setShowOnboarding(true)
    } else {
      setShowOnboarding(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentView === "landing" ? (
          <LandingPage
            key="landing"
            t={t}
            onNavigateToLogin={() => handleNavigateToAuth("login")} // Pass specific handlers
            onNavigateToSignup={() => handleNavigateToAuth("signup")} // Pass specific handlers
            onToggleLanguage={toggleLanguage}
          />
        ) : currentView === "auth" ? (
          <AuthView
            key="auth"
            t={t}
            initialMode={authMode} // Pass initial mode
            onSuccess={handleAuthSuccess}
            onBack={() => setCurrentView("landing")}
          />
        ) : (
          <div className="relative h-screen w-full">
            <DashboardPage
              key="dashboard"
              t={t}
              onNavigate={() => setCurrentView("landing")}
              onToggleLanguage={toggleLanguage}
              language={language}
            />
            <AnimatePresence>
              {showOnboarding && (
                <OnboardingModal key="onboarding-modal" t={t} onComplete={() => setShowOnboarding(false)} />
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Landing Page Component
function LandingPage({
  t,
  onNavigateToLogin, // Updated props
  onNavigateToSignup, // Updated props
  onToggleLanguage,
}: {
  t: (typeof translations)["en"]
  onNavigateToLogin: () => void
  onNavigateToSignup: () => void
  onToggleLanguage: () => void
}) {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30"
    >
      {/* Fixed background elements for unified look across all sections */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <FloatingLines
          linesGradient={["#06b6d4", "#8b5cf6", "#3b82f6"]} // Cyan, Purple, Blue to match theme
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[8, 12, 16]}
          lineDistance={[6, 4, 3]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          parallaxStrength={0.1}
          mixBlendMode="screen"
        />
        <div className="absolute inset-0 bg-slate-950/50"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Add GradualBlur at the bottom of the page */}
      <GradualBlur
        position="bottom"
        height="6rem"
        strength={3}
        divCount={8}
        curve="ease-out"
        exponential={true}
        opacity={1}
        zIndex={50}
        target="page"
      />

      {/* Top Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-between rounded-full border border-white/10 bg-slate-950/50 px-6 backdrop-blur-xl shadow-lg shadow-black/20 w-[90%] max-w-5xl py-0 items-center">
        <div className="flex items-center gap-3">
          <img src="/images/lifenix-logo.png" alt="Lifenix Logo" className="h-14 w-auto object-contain" />
          {/* Added the brand name image next to the logo */}
          <img
            src="/images/lifenix-text.png"
            alt="Lifenix AI"
            className="w-auto object-contain brightness-0 invert h-20"
          />
        </div>
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, "features")}
            className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-white hover:scale-105"
          >
            {t.navFeatures}
          </a>
          <a
            href="#philosophy"
            onClick={(e) => scrollToSection(e, "philosophy")}
            className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-white hover:scale-105"
          >
            {t.navHowItWorks}
          </a>
          <a
            href="#pricing"
            onClick={(e) => scrollToSection(e, "pricing")}
            className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-white hover:scale-105"
          >
            {t.navPricing}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <AnimatedContent distance={50} direction="horizontal" reverse={false} duration={0.5} scale={0.9}>
            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <Globe2 className="h-3.5 w-3.5" />
              <span>{t.languageLabel}</span>
            </button>
          </AnimatedContent>

          <AnimatedContent distance={50} direction="horizontal" reverse={false} duration={0.5} delay={0.1} scale={0.9}>
            <button
              onClick={onNavigateToLogin}
              className="hidden md:inline-flex text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {t.ctaSecondary}
            </button>
          </AnimatedContent>

          <AnimatedContent distance={50} direction="horizontal" reverse={false} duration={0.5} delay={0.2} scale={0.9}>
            <Magnet padding={50} magnetStrength={5}>
              <button
                onClick={onNavigateToSignup}
                className="hidden md:inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-950 transition-all hover:bg-cyan-50 hover:scale-105"
              >
                {t.ctaPrimary}
              </button>
            </Magnet>
          </AnimatedContent>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="mb-6 inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-300 backdrop-blur-sm shadow-lg shadow-cyan-500/20"
          >
            <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
            v2.0 Now Available — AI-Powered Life Management
          </motion.div>

          <h1 className="mb-6 bg-gradient-to-br from-white via-cyan-100 to-purple-200 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent md:text-7xl lg:text-8xl">
            <TextType
              text={[t.heroTitle]}
              typingSpeed={40}
              className="bg-gradient-to-br from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent"
              cursorClassName="text-cyan-400" // Added color to cursor so it's visible against transparent text
              as="span"
              loop={false} // Usually hero title shouldn't loop typing
            />
          </h1>

          <div className="mb-8 max-w-3xl mx-auto text-lg text-slate-300 md:text-2xl leading-relaxed">
            <SplitText
              text={t.heroSubtitle}
              className="text-slate-300"
              delay={30}
              duration={0.8}
              ease="power2.out"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-50px"
              textAlign="center"
            />
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-slate-950 bg-gradient-to-br from-purple-400 to-cyan-500" />
                <div className="h-8 w-8 rounded-full border-2 border-slate-950 bg-gradient-to-br from-blue-400 to-purple-500" />
                <div className="h-8 w-8 rounded-full border-2 border-slate-950 bg-gradient-to-br from-cyan-400 to-blue-500" />
              </div>
              <span className="font-medium text-slate-300">10,000+ active users</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Sparkles key={i} className="h-4 w-4 text-yellow-500" />
              ))}
              <span className="ml-1 font-medium text-slate-300">4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <span className="font-medium text-slate-300">AI-Powered Insights</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AnimatedContent distance={100} direction="vertical" duration={0.8} delay={0.2} scale={0.8}>
              <Magnet padding={100} magnetStrength={5}>
                <button
                  onClick={onNavigateToSignup}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500 px-8 py-4 text-lg font-bold text-slate-950 shadow-lg shadow-purple-500/40 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/60 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t.ctaPrimary}
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </Magnet>
            </AnimatedContent>

            <AnimatedContent distance={100} direction="vertical" duration={0.8} delay={0.3} scale={0.8}>
              <button
                onClick={onNavigateToLogin}
                className="group rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:bg-white/20 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                <span className="flex items-center gap-2">
                  {t.ctaSecondary}
                  <LogOut className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </AnimatedContent>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2 text-slate-400">
              <CheckSquare className="h-5 w-5 text-cyan-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckSquare className="h-5 w-5 text-purple-400" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckSquare className="h-5 w-5 text-blue-400" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500"
        >
          <div className="h-10 w-6 rounded-full border-2 border-slate-500 p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="h-2 w-full rounded-full bg-slate-500"
            />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="features"
        className="relative z-10 px-6 py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{t.navFeatures}</h2>
            <div className="mt-4 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<ListChecks className="h-8 w-8 text-cyan-400" />}
              title={t.featureTaskTitle}
              description={t.featureTaskDesc}
            />
            <FeatureCard
              icon={<CalendarIcon className="h-8 w-8 text-purple-400" />} // Changed Calendar to CalendarIcon
              title={t.featurePlanTitle}
              description={t.featurePlanDesc}
            />
            <FeatureCard
              icon={<HeartPulse className="h-8 w-8 text-blue-400" />}
              title={t.featureWellnessTitle}
              description={t.featureWellnessDesc}
            />
          </div>
        </div>
      </motion.div>

      {/* Philosophy Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="philosophy"
        className="relative z-10 px-6 py-32"
      >
        {/* Removed absolute gradient overlay */}
        <div className="relative mx-auto max-w-4xl text-center">
          <Sparkles className="mx-auto mb-6 h-12 w-12 text-purple-400" />
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">{t.philosophyTitle}</h2>
          <p className="mb-8 text-xl font-medium text-cyan-400">{t.philosophySubtitle}</p>
          <p className="text-lg leading-relaxed text-slate-300 md:text-xl">{t.philosophyBody}</p>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 px-6 py-32"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">{t.testimonialsTitle}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <TestimonialCard text={t.testim1Text} author={t.testim1Author} delay={0} />
            <TestimonialCard text={t.testim2Text} author={t.testim2Author} delay={0.2} />
            <TestimonialCard text={t.testim3Text} author={t.testim3Author} delay={0.4} />
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 px-6 py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{t.teamTitle}</h2>
            <p className="mt-4 text-lg text-slate-400">{t.teamSubtitle}</p>
          </div>

          <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50 backdrop-blur-sm pb-40 h-[900px]">
            <ScrollStack itemDistance={50} itemScale={0.05} itemStackDistance={20} stackPosition="15%" blurAmount={10}>
              <ScrollStackItem>
                <TeamCard
                  name="Chloe Harrison"
                  role="Product Designer"
                  image="/images/image.png"
                  tags={["Figma", "UX Design"]}
                  rating={4.5}
                  earned="$15K+"
                  rate="$80/hr"
                  gradient="from-pink-500/20 to-purple-500/20"
                />
              </ScrollStackItem>
              <ScrollStackItem>
                <TeamCard
                  name="Marcus Chen"
                  role="Lead Engineer"
                  image="/diverse-person-portrait.png"
                  tags={["React", "Node.js"]}
                  rating={4.9}
                  earned="$45K+"
                  rate="$120/hr"
                  gradient="from-cyan-500/20 to-blue-500/20"
                />
              </ScrollStackItem>
              <ScrollStackItem>
                <TeamCard
                  name="Sarah Miller"
                  role="AI Researcher"
                  image="/diverse-person-portrait.png"
                  tags={["Python", "TensorFlow"]}
                  rating={4.8}
                  earned="$32K+"
                  rate="$150/hr"
                  gradient="from-purple-500/20 to-pink-500/20"
                />
              </ScrollStackItem>
              <ScrollStackItem>
                <TeamCard
                  name="David Kim"
                  role="Product Manager"
                  image="/diverse-person-portrait.png"
                  tags={["Strategy", "Agile"]}
                  rating={4.7}
                  earned="$28K+"
                  rate="$95/hr"
                  gradient="from-blue-500/20 to-cyan-500/20"
                />
              </ScrollStackItem>
            </ScrollStack>
          </div>
        </div>
      </motion.div>

      <PricingSection t={t} />

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 px-6 py-32"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">{t.faqTitle}</h2>
          <div className="space-y-6">
            <FaqItem question={t.faqQ1} answer={t.faqA1} />
            <FaqItem question={t.faqQ2} answer={t.faqA2} />
            <FaqItem question={t.faqQ3} answer={t.faqA3} />
          </div>
        </div>
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 px-6 py-32 text-center"
      >
        <div className="relative mx-auto max-w-3xl">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">{t.bottomCtaTitle}</h2>
          <p className="mb-10 text-lg text-slate-300">{t.bottomCtaDesc}</p>
          <AnimatedContent distance={150} direction="vertical" duration={0.8} scale={0.5} threshold={0.5}>
            <Magnet padding={100} magnetStrength={5}>
              <button
                onClick={onNavigateToSignup} // Use signup handler
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-slate-950 transition-all duration-300 hover:scale-110 hover:bg-cyan-50 hover:shadow-2xl hover:shadow-white/50 hover:-translate-y-2"
              >
                {t.bottomCtaButton}
                <Sparkles className="h-5 w-5 text-purple-600 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
              </button>
            </Magnet>
          </AnimatedContent>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/30 px-6 py-12 pb-32 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-500" />
            <span className="font-bold text-slate-200">{t.brand}</span>
          </div>
          <div className="flex gap-8">
            {t.footerLinks.map((link, idx) => (
              <a key={idx} href="#" className="text-sm text-slate-400 transition hover:text-white">
                {link}
              </a>
            ))}
          </div>
          <span className="text-xs text-slate-500">© 2025 {t.brand}. All rights reserved.</span>
        </div>
      </footer>
    </motion.div>
  )
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-500/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/20">
      <div className="mb-6 inline-flex rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 transition group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:ring-cyan-500/50">
        {icon}
      </div>
      <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
      <p className="text-base leading-relaxed text-slate-400 group-hover:text-slate-200">{description}</p>
    </div>
  )
}

// Testimonial Card Component
function TestimonialCard({
  text,
  author,
  delay,
}: {
  text: string
  author: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col justify-between rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm"
    >
      <div className="mb-6">
        <div className="mb-4 flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Sparkles key={i} className="h-4 w-4 text-yellow-500" />
          ))}
        </div>
        <p className="text-lg italic text-slate-300">"{text}"</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-cyan-500" />
        <span className="font-medium text-white">{author}</span>
      </div>
    </motion.div>
  )
}

function PricingSection({ t }: { t: (typeof translations)["en"] }) {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="pricing"
      className="relative z-10 px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.pricingTitle}</h2>
          <p className="text-lg text-slate-400">{t.pricingSubtitle}</p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? "text-white" : "text-slate-400"}`}>
              {t.pricingMonthly}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative h-8 w-14 rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <motion.div
                animate={{ x: isYearly ? 24 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 h-6 w-6 rounded-full bg-cyan-500"
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? "text-white" : "text-slate-400"}`}>
              {t.pricingYearly}
            </span>
            {isYearly && (
              <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs font-bold text-cyan-400">
                {t.pricingSave}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Starter Plan */}
          <PricingCard
            title={t.planFreeTitle}
            price={t.planFreePrice}
            description={t.planFreeDesc}
            features={[t.planFeature1, t.planFeature2, t.planFeature3]}
            buttonText={t.planBtnFree}
            delay={0}
          />

          {/* Pro Plan */}
          <PricingCard
            title={t.planProTitle}
            price={isYearly ? (t.planProPrice.startsWith("¥") ? "¥70" : "$10") : t.planProPrice}
            description={t.planProDesc}
            features={[t.planFeature1, t.planFeature2, t.planFeature3, t.planFeature4, t.planFeature5, t.planFeature6]}
            buttonText={t.planBtnPro}
            isPopular
            delay={0.2}
          />

          {/* Team Plan */}
          <PricingCard
            title={t.planTeamTitle}
            price={isYearly ? (t.planTeamPrice.startsWith("¥") ? "¥260" : "$39") : t.planTeamPrice}
            description={t.planTeamDesc}
            features={[t.planFeature1, t.planFeature4, t.planFeature5, t.planFeature7, t.planFeature8, t.planFeature9]}
            buttonText={t.planBtnTeam}
            delay={0.4}
          />
        </div>
      </div>
    </motion.div>
  )
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  isPopular,
  delay,
}: {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  isPopular?: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`relative flex flex-col rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        isPopular
          ? "border-cyan-500/50 bg-gradient-to-b from-cyan-500/10 to-purple-500/10 shadow-lg shadow-cyan-500/10"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="mb-2 text-lg font-medium text-slate-300">{title}</h3>
        <div className="mb-4 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-sm text-slate-500">/mo</span>
        </div>
        <p className="text-sm text-slate-400">{description}</p>
      </div>

      <div className="mb-8 flex-1 space-y-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full ${isPopular ? "bg-cyan-500/20 text-cyan-400" : "bg-white/10 text-slate-400"}`}
            >
              <CheckSquare className="h-3 w-3" />
            </div>
            {feature}
          </div>
        ))}
      </div>

      <button
        className={`w-full rounded-xl py-3 text-sm font-bold transition-all duration-300 hover:scale-105 ${
          isPopular
            ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            : "bg-white text-slate-950 hover:bg-cyan-50"
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  )
}

function TeamCard({
  name,
  role,
  image,
  tags,
  rating,
  earned,
  rate,
  gradient,
}: {
  name: string
  role: string
  image: string
  tags: string[]
  rating: number
  earned: string
  rate: string
  gradient: string
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-[40px] bg-white/10 p-8 backdrop-blur-2xl border border-white/20 shadow-2xl`}
    >
      {/* Background Gradient - Made gradient stronger and more colorful */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 blur-3xl`} />

      <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white/30 shadow-lg">
              <img src={image || "/placeholder.svg"} alt={name} className="h-full w-full object-cover" />
            </div>
          </div>
          <button className="rounded-full bg-white/20 p-3 text-white transition hover:bg-white/30 backdrop-blur-md">
            <Share className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-4xl font-bold text-white tracking-tight">{name}</h3>
          <p className="text-xl text-slate-200 mt-2 font-medium">{role}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md border border-white/10 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-3 gap-6 border-t border-white/20 pt-8">
          <div>
            <div className="flex items-center gap-1 text-2xl font-bold text-white">
              <Star className="h-6 w-6 fill-current text-yellow-400 stroke-yellow-400" />
              {rating}
            </div>
            <div className="text-sm font-medium text-slate-300 mt-1">Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{earned}</div>
            <div className="text-sm font-medium text-slate-300 mt-1">Earned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{rate}</div>
            <div className="text-sm font-medium text-slate-300 mt-1">Rate</div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button className="flex-1 rounded-full bg-white/20 py-4 text-lg font-bold text-white backdrop-blur-md transition hover:bg-white/30 border border-white/20 shadow-lg">
            Get in touch
          </button>
          <button className="rounded-full bg-white p-4 text-slate-900 transition hover:bg-slate-200 shadow-lg">
            <Bookmark className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

// FAQ Item Component
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between p-6 text-left">
        <span className="text-lg font-medium text-white">{question}</span>
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          <Sparkles className="h-5 w-5 text-cyan-400" />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-slate-400">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Dashboard Page Component
function DashboardPage({
  t,
  onNavigate,
  onToggleLanguage,
  language,
}: {
  t: (typeof translations)["en"]
  onNavigate: () => void
  onToggleLanguage: () => void
  language: string
}) {
  const [activeTab, setActiveTab] = useState<"home" | "tasks" | "calendar" | "insights" | "settings">("home")
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const [calendars, setCalendars] = useState([
    { id: "work", name: "Work", color: "purple" },
    { id: "personal", name: "Personal", color: "cyan" },
    { id: "family", name: "Family", color: "green" },
  ])
  const [isAddCalendarDialogOpen, setIsAddCalendarDialogOpen] = useState(false)

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false)
  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false)

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Deep Work: Strategy",
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(11, 30, 0, 0)),
      type: "work",
    },
    {
      id: "2",
      title: "Team Sync",
      start: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
      end: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(15, 0, 0, 0)),
      type: "work",
    },
  ])

  const handleAddEvent = (newEvent: Omit<CalendarEvent, "id">) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
    }
    setEvents([...events, event])
  }

  const handleUpdateEvent = (updatedEventData: any) => {
    const updatedEvent: CalendarEvent = {
      id: updatedEventData.id,
      title: updatedEventData.title,
      start: updatedEventData.date, // The dialog returns 'date' with time set
      end: new Date(updatedEventData.date), // We need to set end time
      type: updatedEventData.type,
    }

    // Set end time correctly
    const [endHours, endMinutes] = updatedEventData.endTime.split(":").map(Number)
    updatedEvent.end.setHours(endHours, endMinutes)

    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)))
    setIsEditEventDialogOpen(false)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId))
    setIsEventDetailsOpen(false)
  }

  const handleAddCalendar = (newCalendar: { name: string; color: string }) => {
    const calendar = {
      id: newCalendar.name.toLowerCase().replace(/\s+/g, "-"),
      name: newCalendar.name,
      color: newCalendar.color,
    }
    setCalendars([...calendars, calendar])
  }

  const tasks = [
    { id: 1, title: "Deep work: strategy doc", completed: false },
    { id: 2, title: "30-min walk", completed: true },
    { id: 3, title: "Review team feedback", completed: false },
    { id: 4, title: "Meditation session", completed: false },
  ]

  const toggleTask = (id: number) => {
    // Placeholder for actual task toggle logic
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeView t={t} tasks={tasks} onToggleTask={toggleTask} />
      case "tasks":
        return <TasksView t={t} tasks={tasks} onToggleTask={toggleTask} />
      case "calendar":
        return (
          <CalendarView
            t={t}
            date={selectedDate}
            events={events}
            onDateChange={setSelectedDate}
            onAddEvent={handleAddEvent}
            onEventClick={(event) => {
              setSelectedEvent(event)
              setIsEventDetailsOpen(true)
            }}
            calendars={calendars}
          />
        )
      case "insights":
        return <InsightsView t={t} />
      case "settings":
        return <SettingsView t={t} onToggleLanguage={onToggleLanguage} language={language} />
      default:
        return <HomeView t={t} tasks={tasks} onToggleTask={toggleTask} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex h-screen overflow-hidden bg-[#060010] text-white"
    >
      {/* Left Sidebar */}
      <motion.aside
        animate={{ width: isSidebarCollapsed ? 80 : 320 }} // Increased sidebar width to 320px to fit the calendar
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col border-r border-[#392e4e] bg-[#060010] shadow-sm relative z-20"
      >
        <div
          className={`flex h-16 items-center border-b border-[#392e4e] ${isSidebarCollapsed ? "justify-center" : "justify-between px-6"}`}
        >
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 text-cyan-500" />
            {!isSidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-2 text-lg font-bold whitespace-nowrap text-white"
              >
                {t.brand}
              </motion.span>
            )}
          </div>
          {!isSidebarCollapsed && (
            <button onClick={() => setIsSidebarCollapsed(true)} className="text-slate-400 hover:text-slate-200">
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
        </div>

        {!isSidebarCollapsed && (
          <div className="px-4 pt-4 pb-2 border-b border-[#392e4e]">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-none border-none bg-transparent p-0 text-white w-full"
            />

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {t.calMyCalendars}
                </span>
                <button
                  onClick={() => setIsAddCalendarDialogOpen(true)} // Open add calendar dialog
                  className="text-slate-400 hover:text-white"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              <div className="space-y-1">
                {calendars.map((cal) => (
                  <button
                    key={cal.id}
                    className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm text-slate-300 hover:bg-white/5"
                  >
                    <div className={`h-3 w-3 rounded-full border-2 border-${cal.color}-500 bg-${cal.color}-500/20`} />
                    <span className="truncate">{cal.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-1 p-2 md:p-4 overflow-y-auto">
          <SidebarNavItem
            icon={<Home className="h-5 w-5" />}
            label={t.sidebarHome}
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
            collapsed={isSidebarCollapsed}
          />
          <SidebarNavItem
            icon={<CheckSquare className="h-5 w-5" />}
            label={t.sidebarTasks}
            active={activeTab === "tasks"}
            onClick={() => setActiveTab("tasks")}
            collapsed={isSidebarCollapsed}
          />
          <SidebarNavItem
            icon={<CalendarIcon className="h-5 w-5" />} // Changed Calendar to CalendarIcon
            label={t.sidebarCalendar}
            active={activeTab === "calendar"}
            onClick={() => setActiveTab("calendar")}
            collapsed={isSidebarCollapsed}
          />
          <SidebarNavItem
            icon={<BarChart3 className="h-5 w-5" />}
            label={t.sidebarInsights}
            active={activeTab === "insights"}
            onClick={() => setActiveTab("insights")}
            collapsed={isSidebarCollapsed}
          />
          <SidebarNavItem
            icon={<Settings className="h-5 w-5" />}
            label={t.sidebarSettings}
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            collapsed={isSidebarCollapsed}
          />
        </nav>

        {isSidebarCollapsed && (
          <div className="p-4 flex justify-center border-t border-[#392e4e]">
            <button onClick={() => setIsSidebarCollapsed(false)} className="text-slate-400 hover:text-slate-200">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Top Header */}
        <header className="flex items-center justify-between border-b border-[#392e4e] bg-[#060010] px-4 py-4 md:px-6 shrink-0">
          <div>
            <h1 className="text-2xl font-bold truncate text-white">{t.dashTitle}</h1>
            <p className="text-sm text-slate-400 truncate hidden sm:block">{t.dashSubtitle}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigate}
              className="inline-flex items-center gap-2 rounded-lg border border-[#392e4e] bg-[#060010] px-3 py-1.5 text-xs font-medium text-slate-300 transition-all duration-300 hover:scale-105 hover:border-red-300 hover:bg-red-900/20 hover:text-red-400 hover:shadow-md"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-2 rounded-lg border border-[#392e4e] bg-[#060010] px-3 py-1.5 text-xs font-medium text-slate-300 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-cyan-500/20 hover:text-white"
            >
              <Globe2 className="h-4 w-4" />
              <span className="hidden sm:inline">{t.languageLabel}</span>
            </button>

            {/* AI Assistant Toggle Button */}
            <button
              onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-md ${
                isAiAssistantOpen
                  ? "border-purple-500 bg-purple-900/20 text-purple-300 shadow-purple-500/20"
                  : "border-[#392e4e] bg-[#060010] text-slate-300 hover:border-purple-500 hover:bg-purple-900/20 hover:text-purple-300"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">{language === "en" ? "AI Assistant" : t.aiAssistant}</span>
            </button>
          </div>
        </header>

        {/* Content + AI Sidebar Container */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Dashboard Content */}
          <main className={`flex-1 overflow-y-auto min-w-0 ${activeTab === "calendar" ? "p-0" : "p-4 md:p-6"}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`h-full ${activeTab === "calendar" ? "w-full" : "max-w-7xl mx-auto"}`}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* AI Assistant Sidebar - Pushes content */}
          <AnimatePresence>
            {isAiAssistantOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 384, opacity: 1 }} // 384px = w-96
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="border-l border-[#392e4e] bg-[#060010] shadow-xl z-10 overflow-hidden flex-shrink-0"
              >
                <div className="w-96 h-full">
                  <AIAssistant language={language as "en" | "zh"} onClose={() => setIsAiAssistantOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <EventDetailsDialog
        isOpen={isEventDetailsOpen}
        onClose={() => setIsEventDetailsOpen(false)}
        event={selectedEvent}
        onEdit={(event) => {
          setSelectedEvent(event)
          setIsEditEventDialogOpen(true)
        }}
        onDelete={handleDeleteEvent}
        t={t} // Pass t prop </CHANGE>
      />

      <CreateEventDialog
        isOpen={isEditEventDialogOpen}
        onClose={() => setIsEditEventDialogOpen(false)}
        onSave={handleUpdateEvent}
        initialEvent={
          selectedEvent
            ? {
                id: selectedEvent.id,
                title: selectedEvent.title,
                start: selectedEvent.start,
                end: selectedEvent.end,
                type: selectedEvent.type,
              }
            : null
        }
        calendars={calendars}
        t={t} // Pass t prop </CHANGE>
      />

      <AddCalendarDialog
        isOpen={isAddCalendarDialogOpen}
        onClose={() => setIsAddCalendarDialogOpen(false)}
        onSave={handleAddCalendar}
        t={t} // Pass t prop </CHANGE>
      />
    </motion.div>
  )
}

function SidebarNavItem({
  icon,
  label,
  active,
  onClick,
  collapsed,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
  collapsed?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 hover:shadow-md ${
        collapsed ? "justify-center" : "justify-start"
      } ${active ? "bg-cyan-900/20 text-cyan-400 shadow-sm border border-cyan-900/30" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
      title={collapsed ? label : undefined}
    >
      <span className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
        {icon}
      </span>
      {!collapsed && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
          {label}
        </motion.span>
      )}
    </button>
  )
}
