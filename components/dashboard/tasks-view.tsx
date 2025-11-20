"use client"

import { useState } from "react"
import { Plus, CalendarIcon, Tag } from "lucide-react"

interface TasksViewProps {
  t: any
  tasks: any[]
  onToggleTask: (id: number) => void
}

export function TasksView({ t, tasks, onToggleTask }: TasksViewProps) {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{t.sidebarTasks}</h2>
        <button className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/50">
          <Plus className="h-4 w-4" />
          {t.tasksAdd || "Add Task"}
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:scale-105 ${
            filter === "all" ? "bg-cyan-500 text-white shadow-md" : "bg-white/10 text-slate-300 hover:bg-white/20"
          }`}
        >
          {t.tasksFilterAll || "All"}
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:scale-105 ${
            filter === "active" ? "bg-cyan-500 text-white shadow-md" : "bg-white/10 text-slate-300 hover:bg-white/20"
          }`}
        >
          {t.tasksFilterActive || "Active"}
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:scale-105 ${
            filter === "completed" ? "bg-cyan-500 text-white shadow-md" : "bg-white/10 text-slate-300 hover:bg-white/20"
          }`}
        >
          {t.tasksFilterCompleted || "Completed"}
        </button>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/50 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-md hover:shadow-cyan-500/10"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                className="h-5 w-5 cursor-pointer rounded border-slate-600 bg-slate-800 text-cyan-500 transition focus:ring-2 focus:ring-cyan-500 focus:ring-offset-slate-900"
              />
              <div>
                <p
                  className={`font-medium transition ${task.completed ? "text-slate-500 line-through" : "text-white"}`}
                >
                  {task.title}
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" /> Today
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" /> Personal
                  </span>
                </div>
              </div>
            </div>
            <div className="opacity-0 transition-all duration-300 group-hover:opacity-100">
              <button className="rounded-lg p-2 text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-red-500/10 hover:text-red-400">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
