"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect } from "react"

interface CountUpNumberProps {
  value: number
  duration?: number
  className?: string
}

export function CountUpNumber({ value, duration = 2, className = "" }: CountUpNumberProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, value, { duration })
    return controls.stop
  }, [count, value, duration])

  return (
    <motion.span
      className={className}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "backOut" }}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  )
}
