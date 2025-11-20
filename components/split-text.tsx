'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  splitType?: 'chars' | 'words' | 'lines' | string
  from?: any
  to?: any
  threshold?: number
  rootMargin?: string
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end'
  tag?: string
  onLetterAnimationComplete?: () => void
}

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 0.5,
  splitType = 'chars',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  tag = 'span',
  onLetterAnimationComplete
}: SplitTextProps) => {
  const words = text.split(' ')
  const isChars = splitType.includes('chars')
  
  // Use motion.custom to create a component from the tag name
  const Tag = motion(tag as any) as any

  // Global index counter for staggering across all words/chars
  let globalIndex = 0

  return (
    <Tag
      className={className}
      style={{ 
        textAlign, 
        display: 'inline-block',
        willChange: 'transform, opacity'
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: rootMargin, amount: threshold }}
    >
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1
        
        if (isChars) {
          return (
            <span key={i} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {word.split('').map((char, j) => {
                const currentIndex = globalIndex++
                return (
                  <motion.span
                    key={j}
                    variants={{
                      hidden: from,
                      visible: {
                        ...to,
                        transition: {
                          duration,
                          delay: currentIndex * (delay / 1000),
                          ease: 'easeOut'
                        }
                      }
                    }}
                    style={{ display: 'inline-block' }}
                    onAnimationComplete={
                      (isLastWord && j === word.length - 1) ? onLetterAnimationComplete : undefined
                    }
                  >
                    {char}
                  </motion.span>
                )
              })}
              {!isLastWord && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
            </span>
          )
        } else {
          // Words animation
          const currentIndex = globalIndex++
          return (
            <span key={i} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              <motion.span
                variants={{
                  hidden: from,
                  visible: {
                    ...to,
                    transition: {
                      duration,
                      delay: currentIndex * (delay / 1000),
                      ease: 'easeOut'
                    }
                  }
                }}
                style={{ display: 'inline-block' }}
                onAnimationComplete={
                  (isLastWord) ? onLetterAnimationComplete : undefined
                }
              >
                {word}
              </motion.span>
              {!isLastWord && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
            </span>
          )
        }
      })}
    </Tag>
  )
}

export default SplitText
