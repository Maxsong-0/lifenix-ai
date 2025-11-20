import React, { useEffect, useState } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'

interface CircularTextProps {
  text: string
  spinDuration?: number
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers'
  className?: string
  children?: React.ReactNode
}

const getRotationTransition = (
  duration: number,
  from: number,
  loop: boolean = true
) => ({
  from,
  to: from + 360,
  ease: 'linear',
  duration,
  type: 'tween',
  repeat: loop ? Infinity : 0,
})

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring',
    damping: 20,
    stiffness: 300,
  },
})

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  children,
}) => {
  const letters = Array.from(text)
  const controls = useAnimation()
  const rotation = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const start = rotation.get()
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    })
  }, [spinDuration, controls, rotation])

  const handleHoverStart = () => {
    setIsHovered(true)
    const start = rotation.get()
    if (!onHover) return

    let transitionConfig
    let scaleVal = 1

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start)
        break
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start)
        break
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 },
        }
        scaleVal = 1
        break
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start)
        scaleVal = 0.8
        break
      default:
        transitionConfig = getTransition(spinDuration, start)
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    })
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    const start = rotation.get()
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    })
  }

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <motion.div
        className="relative w-full h-full rounded-full font-bold text-center cursor-pointer origin-center"
        style={{ rotate: rotation }}
        initial={{ rotate: 0 }}
        animate={controls}
      >
        {letters.map((letter, i) => {
          const rotationDeg = (360 / letters.length) * i
          const factor = Math.PI / letters.length
          // Using a slightly larger radius multiplier to push text to edge if needed, 
          // but standard implementation relies on the span height/position.
          // We'll stick to the provided logic but ensure spans are positioned correctly.
          const x = factor * i
          const y = factor * i
          
          return (
            <span
              key={i}
              className="absolute inset-0 inline-block text-xs sm:text-sm transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
              style={{
                transform: `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`,
                WebkitTransform: `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`,
              }}
            >
              {letter}
            </span>
          )
        })}
      </motion.div>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {children}
        </div>
      )}
    </div>
  )
}

export default CircularText
