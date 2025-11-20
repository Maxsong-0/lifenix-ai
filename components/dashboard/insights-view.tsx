"use client"
import { TrendingUp, Zap, Brain, AlertCircle } from "lucide-react"

interface InsightsViewProps {
  t: any
}

export function InsightsView({ t }: InsightsViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{t.sidebarInsights}</h2>
        <div className="text-sm text-slate-400">Last updated: Just now</div>
      </div>

      {/* Enhanced AI Summary */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-white/10 p-2">
            <Brain className="h-6 w-6 text-cyan-400" />
          </div>
          <h3 className="text-lg font-semibold">Weekly AI Analysis</h3>
        </div>
        <p className="mb-6 text-slate-300">
          You've been most productive in the mornings this week. Your focus score has improved by 12% compared to last
          week. Consider scheduling deep work sessions between 9 AM and 11 AM.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="mb-1 text-xs text-slate-400">Peak Focus</div>
            <div className="text-xl font-bold text-cyan-400">9:30 AM</div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="mb-1 text-xs text-slate-400">Task Completion</div>
            <div className="text-xl font-bold text-purple-400">85%</div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="mb-1 text-xs text-slate-400">Cognitive Load</div>
            <div className="text-xl font-bold text-green-400">Optimal</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Enhanced Focus Trends */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-semibold text-white">Focus Trends</h3>
            <TrendingUp className="h-5 w-5 text-green-400" />
          </div>
          <div className="flex h-48 items-end gap-2">
            {[40, 65, 55, 80, 90, 70, 85].map((h, i) => (
              <div key={i} className="group relative flex-1">
                <div
                  className="w-full rounded-t bg-cyan-500/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-xs text-slate-400">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Enhanced Energy Levels */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-semibold text-white">Energy Mapping</h3>
            <Zap className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-slate-400">Morning</span>
                <span className="font-medium text-white">High</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-slate-400">Afternoon</span>
                <span className="font-medium text-white">Medium</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-slate-400">Evening</span>
                <span className="font-medium text-white">Low</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Recommendations */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5">
        <h3 className="mb-4 font-semibold text-white">Suggestions for Improvement</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
            <AlertCircle className="mt-0.5 h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm font-medium text-white">Take more breaks</p>
              <p className="text-xs text-slate-400">
                You worked for 4 hours straight on Tuesday. Try the Pomodoro technique.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
            <AlertCircle className="mt-0.5 h-5 w-5 text-purple-400" />
            <div>
              <p className="text-sm font-medium text-white">Schedule planning time</p>
              <p className="text-xs text-slate-400">
                Users who plan their day the night before are 20% more productive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
