"use client"

import type React from "react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-slate-900/70"
    >
      <div className="mb-4 md:mb-6 inline-flex items-center justify-center rounded-xl bg-white/5 p-3 md:p-4">
        {icon}
      </div>
      <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm md:text-base text-slate-400 leading-relaxed">{description}</p>

      {/* Hover gradient effect */}
      <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
      </div>
    </motion.div>
  )
}

export default FeatureCard
