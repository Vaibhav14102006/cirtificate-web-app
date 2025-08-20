"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Award, Calendar, User, Building, Download, Share } from "lucide-react"

interface Certificate {
  id: string
  studentName: string
  certificateTitle: string
  certificateType: string
  dateIssued: string
  issuer: string
  department: string
}

interface VerificationResult {
  isValid: boolean
  certificate?: Certificate
  error?: string
}

export default function CertificateVerification({ params }: { params: { id: string } }) {
  const [verification, setVerification] = useState<VerificationResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const response = await fetch(`/api/certificates/verify/${params.id}`)
        const data = await response.json()
        setVerification(data)
      } catch (error) {
        setVerification({ isValid: false, error: "Verification failed" })
      } finally {
        setLoading(false)
      }
    }

    verifyCertificate()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
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
              Certificate Verification
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600"
            >
              Verify the authenticity of Amity University certificates
            </motion.p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {verification?.isValid ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="p-4 bg-green-100 rounded-full"
                  >
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="p-4 bg-red-100 rounded-full"
                  >
                    <XCircle className="w-12 h-12 text-red-600" />
                  </motion.div>
                )}
              </div>
              <CardTitle className="text-2xl">
                {verification?.isValid ? "Certificate Verified" : "Verification Failed"}
              </CardTitle>
            </CardHeader>

            <CardContent>
              {verification?.isValid && verification.certificate ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6"
                >
                  {/* Certificate Details */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Student Name</p>
                            <p className="font-semibold text-gray-900">{verification.certificate.studentName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-600">Certificate Title</p>
                            <p className="font-semibold text-gray-900">{verification.certificate.certificateTitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm text-gray-600">Department</p>
                            <p className="font-semibold text-gray-900">{verification.certificate.department}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-orange-600" />
                          <div>
                            <p className="text-sm text-gray-600">Date Issued</p>
                            <p className="font-semibold text-gray-900">{verification.certificate.dateIssued}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-2">Certificate Type</p>
                          <Badge variant="outline" className="bg-white/50">
                            {verification.certificate.certificateType}
                          </Badge>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-2">Certificate ID</p>
                          <p className="font-mono text-sm bg-white/50 p-2 rounded border">
                            {verification.certificate.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Issuer Information */}
                  <div className="bg-white/50 rounded-lg p-4 border">
                    <h3 className="font-semibold text-gray-900 mb-2">Issued By</h3>
                    <p className="text-gray-700">{verification.certificate.issuer}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      This certificate has been verified as authentic and was issued by the official institution.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download Certificate
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" className="bg-white/50">
                        <Share className="w-4 h-4 mr-2" />
                        Share Verification
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center py-8"
                >
                  <div className="bg-red-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-red-900 mb-2">Certificate Not Found</h3>
                    <p className="text-red-700">
                      {verification?.error ||
                        "The certificate ID you provided could not be verified. Please check the ID and try again."}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Possible Reasons:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 text-left max-w-md mx-auto">
                      <li>• The certificate ID is incorrect or incomplete</li>
                      <li>• The certificate has been revoked or expired</li>
                      <li>• The certificate was not issued by Amity University</li>
                      <li>• There may be a temporary system issue</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">About Certificate Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">How It Works</h4>
                  <p>
                    Each certificate issued by Amity University contains a unique verification code and QR code. This
                    system allows anyone to verify the authenticity of certificates instantly.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Security Features</h4>
                  <p>
                    Our certificates include digital signatures, unique identifiers, and blockchain-based verification
                    to ensure maximum security and prevent forgery.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
