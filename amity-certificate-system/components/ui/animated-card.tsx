"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { animations } from "@/lib/animations"
import { useState } from "react"

interface AnimatedCardProps {
  children: React.ReactNode
  animation?: "glass" | "tilt" | "gradient" | "shine"
  className?: string
  delay?: number
}

export function AnimatedCard({ children, animation = "glass", className = "", delay = 0 }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getAnimationProps = () => {
    switch (animation) {
      case "tilt":
        return animations.tiltHover
      case "gradient":
        return animations.gradientHover
      case "shine":
        return {
          ...animations.glassHover,
          whileHover: {
            ...animations.glassHover.whileHover,
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 100%)",
          },
        }
      default:
        return animations.glassHover
    }
  }

  return (
    <motion.div
      {...animations.fadeInUp}
      transition={{ ...animations.fadeInUp.transition, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div {...getAnimationProps()} className="relative overflow-hidden">
        <Card className={className}>
          {children}

          {/* Shine Effect */}
          {animation === "shine" && isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              {...animations.shineSwipe}
            />
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
