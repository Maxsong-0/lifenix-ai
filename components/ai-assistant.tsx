"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Sparkles, X, Lightbulb, Calendar, CheckCircle2, TrendingUp } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIAssistantProps {
  language: "en" | "zh"
  onClose: () => void
}

export function AIAssistant({ language, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [showChat, setShowChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setShowChat(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: generateAIResponse(input, language),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 800)
  }

  const generateAIResponse = (userInput: string, lang: "en" | "zh"): string => {
    const lowerInput = userInput.toLowerCase()

    if (lang === "en") {
      if (lowerInput.includes("task") || lowerInput.includes("todo")) {
        return "I can help you organize your tasks! Try breaking them down into smaller, actionable steps. What's your most important task today?"
      }
      if (lowerInput.includes("focus") || lowerInput.includes("productivity")) {
        return "For better focus, I recommend using the Pomodoro technique: 25 minutes of focused work followed by a 5-minute break. Would you like me to set up a focus session?"
      }
      if (lowerInput.includes("schedule") || lowerInput.includes("calendar")) {
        return "I can help you optimize your schedule! Consider time-blocking your most important tasks in the morning when your energy is highest."
      }
      return "I'm here to help with task management, productivity tips, and schedule optimization. What would you like to know more about?"
    } else {
      if (lowerInput.includes("任务") || lowerInput.includes("todo")) {
        return "我可以帮你整理任务！试着把它们分解成更小、可执行的步骤。今天你最重要的任务是什么？"
      }
      if (lowerInput.includes("专注") || lowerInput.includes("效率")) {
        return "为了更好地专注，我推荐使用番茄工作法：25分钟专注工作,然后休息5分钟。需要我为你设置一个专注时段吗？"
      }
      if (lowerInput.includes("日程") || lowerInput.includes("日历")) {
        return "我可以帮你优化日程安排！考虑在早上精力最充沛的时候安排最重要的任务。"
      }
      return "我在这里帮助你进行任务管理、提供生产力建议和优化日程安排。你想了解更多什么内容？"
    }
  }

  const t = {
    en: {
      title: "Lifenix AI Assistant",
      subtitle: "Your intelligent productivity companion",
      placeholder: "Ask me anything...",
      quickActions: "Quick Actions",
      action1Title: "Optimize My Day",
      action1Desc: "AI-powered schedule optimization",
      action2Title: "Focus Session",
      action2Desc: "Start a deep work timer",
      action3Title: "Task Breakdown",
      action3Desc: "Split complex goals into steps",
      action4Title: "Wellness Check",
      action4Desc: "Balance work and rest",
      emptyState: "Ask me anything about your productivity, tasks, or schedule.",
    },
    zh: {
      title: "Lifenix AI 助手",
      subtitle: "你的智能生产力伙伴",
      placeholder: "问我任何问题...",
      quickActions: "快捷操作",
      action1Title: "优化我的一天",
      action1Desc: "AI 驱动的日程优化",
      action2Title: "专注时段",
      action2Desc: "开始深度工作计时",
      action3Title: "任务拆解",
      action3Desc: "将复杂目标拆分为步骤",
      action4Title: "健康检查",
      action4Desc: "平衡工作与休息",
      emptyState: "询问我关于生产力、任务或日程的任何问题。",
    },
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
    handleSend()
  }

  return (
    <div className="flex h-full flex-col bg-slate-900 border-l border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{t[language].title}</div>
            <div className="text-xs text-slate-400">{t[language].subtitle}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {!showChat || messages.length === 0 ? (
          // Quick Actions View (like Notion's suggestions)
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                {t[language].quickActions}
              </h3>
              <div className="space-y-2">
                <QuickActionCard
                  icon={<TrendingUp className="h-4 w-4 text-purple-400" />}
                  title={t[language].action1Title}
                  description={t[language].action1Desc}
                  onClick={() =>
                    handleQuickAction(language === "en" ? "Optimize my schedule for today" : "优化我今天的日程")
                  }
                />
                <QuickActionCard
                  icon={<CheckCircle2 className="h-4 w-4 text-cyan-400" />}
                  title={t[language].action2Title}
                  description={t[language].action2Desc}
                  onClick={() => handleQuickAction(language === "en" ? "Start a focus session" : "开始专注时段")}
                />
                <QuickActionCard
                  icon={<Lightbulb className="h-4 w-4 text-blue-400" />}
                  title={t[language].action3Title}
                  description={t[language].action3Desc}
                  onClick={() => handleQuickAction(language === "en" ? "Help me break down my tasks" : "帮我拆解任务")}
                />
                <QuickActionCard
                  icon={<Calendar className="h-4 w-4 text-green-400" />}
                  title={t[language].action4Title}
                  description={t[language].action4Desc}
                  onClick={() =>
                    handleQuickAction(language === "en" ? "Check my work-life balance" : "检查工作生活平衡")
                  }
                />
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-white/5 p-4 text-center border border-white/5">
              <p className="text-sm text-slate-400">{t[language].emptyState}</p>
            </div>
          </div>
        ) : (
          // Chat View
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      message.role === "user" ? "bg-cyan-500 text-white" : "bg-white/10 text-slate-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        <div className="border-t border-white/10 p-3 shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder={t[language].placeholder}
              className="flex-1 rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex items-center justify-center rounded-lg bg-cyan-500 px-3 py-2 text-white transition-all hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickActionCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-left transition-all hover:border-cyan-500/50 hover:bg-white/10 hover:shadow-sm"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10 transition-colors group-hover:bg-white/20">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white">{title}</div>
        <div className="text-xs text-slate-400 truncate">{description}</div>
      </div>
    </button>
  )
}
