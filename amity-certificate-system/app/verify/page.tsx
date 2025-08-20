"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Award, Search, QrCode } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VerifyPage() {
  const [certificateId, setCertificateId] = useState("")
  const router = useRouter()

  const handleVerify = () => {
    if (certificateId.trim()) {
      router.push(`/verify/${certificateId.trim()}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerify()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-4"
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Award className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-gray-900 mb-2"
            >
              Verify Certificate
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600"
            >
              Enter a certificate ID to verify its authenticity
            </motion.p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle>Certificate Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="certificateId" className="text-sm font-medium text-gray-700">
                    Certificate ID
                  </label>
                  <Input
                    id="certificateId"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter certificate ID (e.g., AMITY-1705123456789-ABC123DEF)"
                    className="bg-white/50 text-center font-mono"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleVerify}
                    disabled={!certificateId.trim()}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Verify Certificate
                  </Button>
                </motion.div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span>or</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full bg-white/50">
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan QR Code
                </Button>
              </motion.div>

              {/* Sample Certificate IDs for Testing */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Sample Certificate IDs for Testing:</h4>
                <div className="space-y-2 text-sm">
                  <button
                    onClick={() => setCertificateId("AMITY-1705123456789-ABC123DEF")}
                    className="block w-full text-left font-mono text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-2 rounded transition-colors"
                  >
                    AMITY-1705123456789-ABC123DEF
                  </button>
                  <button
                    onClick={() => setCertificateId("AMITY-1705123456790-XYZ789GHI")}
                    className="block w-full text-left font-mono text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-2 rounded transition-colors"
                  >
                    AMITY-1705123456790-XYZ789GHI
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
