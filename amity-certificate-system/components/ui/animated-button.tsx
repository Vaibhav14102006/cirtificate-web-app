"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import { animations } from "@/lib/animations"
import { useState } from "react"

interface AnimatedButtonProps extends ButtonProps {
  animation?: "ripple" | "pulse" | "neon" | "confetti" | "gradient"
  children: React.ReactNode
}

export function AnimatedButton({ animation = "ripple", children, onClick, className, ...props }: AnimatedButtonProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (animation === "confetti") {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 600)
    }
    onClick?.(e)
  }

  const getAnimationProps = () => {
    switch (animation) {
      case "pulse":
        return animations.pulseHover
      case "neon":
        return animations.neonGlow
      case "gradient":
        return animations.gradientHover
      case "confetti":
        return animations.rippleClick
      default:
        return animations.rippleClick
    }
  }

  return (
    <motion.div className="relative inline-block">
      <motion.div {...getAnimationProps()}>
        <Button onClick={handleClick} className={className} {...props}>
          {children}
        </Button>
      </motion.div>

      {/* Confetti Effect */}
      {showConfetti && animation === "confetti" && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"
              style={{
                left: "50%",
                top: "50%",
              }}
              {...animations.confettiBurst}
              transition={{
                ...animations.confettiBurst.transition,
                delay: i * 0.05,
              }}
              animate={{
                ...animations.confettiBurst.animate,
                x: Math.cos((i * 30 * Math.PI) / 180) * 50,
                y: Math.sin((i * 30 * Math.PI) / 180) * 50,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
