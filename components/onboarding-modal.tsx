import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Apple, Check, Briefcase, User } from 'lucide-react'

// Mock icons for Outlook/Google
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.333-1.133 8.453-3.293 2.187-2.187 3.267-5.133 3.267-8.267 0-.8-.08-1.533-.24-2.293h-11.48z" />
  </svg>
)

const OutlookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 17L1 7L12 1L23 7L23 17L12 23L1 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 23V13L23 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 7L12 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

interface OnboardingModalProps {
  t: any
  onComplete: () => void
}

export function OnboardingModal({ t, onComplete }: OnboardingModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [importedCalendars, setImportedCalendars] = useState<string[]>([])
  const [ageRange, setAgeRange] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onComplete()
    }, 1500)
  }

  const toggleCalendar = (cal: string) => {
    if (importedCalendars.includes(cal)) {
      setImportedCalendars(importedCalendars.filter(c => c !== cal))
    } else {
      setImportedCalendars([...importedCalendars, cal])
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 p-8 shadow-2xl shadow-black/50 ring-1 ring-white/10"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {t.onboardingTitle}
          </h2>
          <p className="text-slate-400">
            {t.onboardingSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Age Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">{t.authAgeLabel}</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <select
                required
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all appearance-none"
              >
                <option value="" disabled className="bg-slate-900">{t.authAgePlaceholder}</option>
                <option value="under18" className="bg-slate-900">{t.authAgeOption1}</option>
                <option value="18-24" className="bg-slate-900">{t.authAgeOption2}</option>
                <option value="25-34" className="bg-slate-900">{t.authAgeOption3}</option>
                <option value="35-44" className="bg-slate-900">{t.authAgeOption4}</option>
                <option value="45+" className="bg-slate-900">{t.authAgeOption5}</option>
              </select>
            </div>
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">{t.onboardingOccupationLabel}</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                placeholder={t.onboardingOccupationPlaceholder}
              />
            </div>
          </div>

          {/* Calendar Import */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 ml-1">{t.authImportCalendar}</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <button
                type="button"
                onClick={() => toggleCalendar('apple')}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-3 transition-all ${
                  importedCalendars.includes('apple')
                    ? 'border-cyan-500 bg-cyan-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <Apple className="h-6 w-6" />
                <span className="text-xs">Apple</span>
                {importedCalendars.includes('apple') && <Check className="absolute top-2 right-2 h-3 w-3 text-cyan-400" />}
              </button>
              <button
                type="button"
                onClick={() => toggleCalendar('outlook')}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-3 transition-all ${
                  importedCalendars.includes('outlook')
                    ? 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <OutlookIcon className="h-6 w-6" />
                <span className="text-xs">Outlook</span>
                {importedCalendars.includes('outlook') && <Check className="absolute top-2 right-2 h-3 w-3 text-blue-400" />}
              </button>
              <button
                type="button"
                onClick={() => toggleCalendar('google')}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-3 transition-all ${
                  importedCalendars.includes('google')
                    ? 'border-red-500 bg-red-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <GoogleIcon className="h-6 w-6" />
                <span className="text-xs">Google</span>
                {importedCalendars.includes('google') && <Check className="absolute top-2 right-2 h-3 w-3 text-red-400" />}
              </button>
              <button
                type="button"
                onClick={() => toggleCalendar('other')}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-3 transition-all ${
                  importedCalendars.includes('other')
                    ? 'border-purple-500 bg-purple-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <Calendar className="h-6 w-6" />
                <span className="text-xs">Other</span>
                {importedCalendars.includes('other') && <Check className="absolute top-2 right-2 h-3 w-3 text-purple-400" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500 py-3.5 text-lg font-bold text-slate-950 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/40 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
              ) : (
                <>
                  {t.onboardingContinue}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
          
          <div className="text-center">
             <button
              type="button"
              onClick={onComplete}
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              {t.onboardingSkip}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
