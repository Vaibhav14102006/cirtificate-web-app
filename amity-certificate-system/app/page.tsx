"use client"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { GraduationCap, Users, Award } from "lucide-react"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { AnimatedButton } from "@/components/ui/animated-button"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  const dashboards = [
    {
      title: "Student Portal",
      description: "Request certificates, view your achievements, and manage your profile",
      icon: GraduationCap,
      route: "/student",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      title: "Faculty Portal",
      description: "Manage templates, approve requests, and oversee certificate generation",
      icon: Users,
      route: "/faculty", // Updated route to dedicated faculty dashboard
      gradient: "from-purple-500 to-pink-500",
      delay: 0.2,
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <FloatingParticles count={80} />

      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <motion.div
              className="flex justify-center mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <Award className="w-12 h-12 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.7)",
                      "0 0 0 20px rgba(59, 130, 246, 0)",
                      "0 0 0 0 rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.div>
            <motion.h1
              className="text-5xl font-bold text-white mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              Amity University
            </motion.h1>
            <motion.p
              className="text-xl text-white/80 mb-2"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Smart Certificate Management System
            </motion.p>
            <motion.p
              className="text-white/60"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Choose your portal to get started
            </motion.p>
          </motion.div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {" "}
            {/* Changed from 3 columns to 2 columns */}
            {dashboards.map((dashboard, index) => (
              <motion.div
                key={dashboard.title}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: dashboard.delay,
                  ease: "backOut",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl relative overflow-hidden h-full cursor-pointer group"
                  onClick={() => router.push(dashboard.route)}
                >
                  {/* Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${dashboard.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Shine Effect */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  <div className="p-8 relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <motion.div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${dashboard.gradient} mb-6 w-fit`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <dashboard.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                        {dashboard.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed mb-6">{dashboard.description}</p>
                    </div>

                    {/* Button */}
                    <AnimatedButton
                      animation="neon"
                      className={`w-full bg-gradient-to-r ${dashboard.gradient} hover:shadow-lg hover:shadow-blue-500/25 text-white font-medium py-3 rounded-lg transition-all duration-300`}
                    >
                      <motion.span
                        className="flex items-center justify-center gap-2"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        Access Portal
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          →
                        </motion.div>
                      </motion.span>
                    </AnimatedButton>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-white/50 text-sm">Secure • Fast • Reliable Certificate Management</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
