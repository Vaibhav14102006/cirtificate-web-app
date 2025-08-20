export const animations = {
  // Global Effects
  slideInFromLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  slideInFromRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },

  staggeredReveal: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },

  // Hover Effects
  glassHover: {
    whileHover: {
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(20px)",
      transition: { duration: 0.3 },
    },
    whileTap: { scale: 0.98 },
  },

  gradientHover: {
    whileHover: {
      scale: 1.05,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      transition: { duration: 0.3 },
    },
    whileTap: { scale: 0.95 },
  },

  tiltHover: {
    whileHover: {
      rotateX: 5,
      rotateY: 5,
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  },

  // Button Effects
  rippleClick: {
    whileTap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  },

  pulseHover: {
    whileHover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 },
    },
  },

  neonGlow: {
    whileHover: {
      boxShadow: [
        "0 0 5px rgba(59, 130, 246, 0.5)",
        "0 0 25px rgba(59, 130, 246, 0.8)",
        "0 0 50px rgba(59, 130, 246, 0.6)",
      ],
      transition: { duration: 0.3 },
    },
  },

  // Special Effects
  confettiBurst: {
    initial: { scale: 0, rotate: 0 },
    animate: {
      scale: [0, 1.2, 1],
      rotate: [0, 180, 360],
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },

  countUp: {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "backOut" },
    },
  },

  shineSwipe: {
    initial: { x: "-100%" },
    animate: { x: "100%" },
    transition: { duration: 1.5, ease: "easeInOut" },
  },

  floatingAnimation: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  },

  glowRing: {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(59, 130, 246, 0.7)",
        "0 0 0 10px rgba(59, 130, 246, 0)",
        "0 0 0 0 rgba(59, 130, 246, 0)",
      ],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeOut",
      },
    },
  },
}

export const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 30,
}

export const easeConfig = {
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.6,
}
