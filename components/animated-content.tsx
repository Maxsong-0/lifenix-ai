"use client"

import type React from "react"
import { motion } from "framer-motion"

interface AnimatedContentProps {
  children: React.ReactNode
  distance?: number
  direction?: "vertical" | "horizontal"
  reverse?: boolean
  duration?: number
  ease?: string
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
}

export default function AnimatedContent({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.6,
  ease = "easeOut",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
}: AnimatedContentProps) {
  const axis = direction === "horizontal" ? "x" : "y"
  const offset = reverse ? -distance : distance

  return (
    <motion.div
      initial={{
        opacity: animateOpacity ? initialOpacity : 1,
        scale: scale,
        [axis]: offset,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        [axis]: 0,
      }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        ease: ease === "bounce.out" ? "backOut" : "easeOut", // Map GSAP ease to Framer Motion roughly
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
