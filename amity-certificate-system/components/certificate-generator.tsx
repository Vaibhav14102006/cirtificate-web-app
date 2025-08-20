"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Eye, QrCode, Calendar } from "lucide-react"

interface CertificatePreview {
  studentName: string
  certificateTitle: string
  certificateType: string
  dateIssued: string
  uniqueId: string
}

export default function CertificateGenerator() {
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    studentEmail: "",
    certificateTitle: "",
    certificateType: "",
    templateId: "",
    customText: "",
  })

  const [preview, setPreview] = useState<CertificatePreview | null>(null)
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)

    // Simulate certificate generation
    setTimeout(() => {
      const uniqueId = `AMITY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      setPreview({
        studentName: formData.studentName,
        certificateTitle: formData.certificateTitle,
        certificateType: formData.certificateType,
        dateIssued: new Date().toISOString().split("T")[0],
        uniqueId,
      })

      setGenerating(false)
    }, 2000)
  }

  const handleDownload = () => {
    // Simulate PDF download
    const link = document.createElement("a")
    link.href = `/api/certificates/download/${preview?.uniqueId}`
    link.download = `certificate-${preview?.uniqueId}.pdf`
    link.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Generator Form */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Generate Certificate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  placeholder="Enter student ID"
                  className="bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Enter student name"
                  className="bg-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentEmail">Student Email</Label>
              <Input
                id="studentEmail"
                type="email"
                value={formData.studentEmail}
                onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                placeholder="Enter student email"
                className="bg-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificateTitle">Certificate Title</Label>
              <Input
                id="certificateTitle"
                value={formData.certificateTitle}
                onChange={(e) => setFormData({ ...formData, certificateTitle: e.target.value })}
                placeholder="Enter certificate title"
                className="bg-white/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="certificateType">Certificate Type</Label>
                <Select
                  value={formData.certificateType}
                  onValueChange={(value) => setFormData({ ...formData, certificateType: value })}
                >
                  <SelectTrigger className="bg-white/50">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateId">Template</Label>
                <Select
                  value={formData.templateId}
                  onValueChange={(value) => setFormData({ ...formData, templateId: value })}
                >
                  <SelectTrigger className="bg-white/50">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="template1">Standard Template</SelectItem>
                    <SelectItem value="template2">Premium Template</SelectItem>
                    <SelectItem value="template3">Modern Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customText">Custom Text (Optional)</Label>
              <Textarea
                id="customText"
                value={formData.customText}
                onChange={(e) => setFormData({ ...formData, customText: e.target.value })}
                placeholder="Add any custom text for the certificate"
                className="bg-white/50 min-h-[80px]"
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleGenerate}
                disabled={generating || !formData.studentName || !formData.certificateTitle}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {generating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Award className="w-4 h-4 mr-2" />
                )}
                {generating ? "Generating..." : "Generate Certificate"}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Certificate Preview */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Certificate Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {preview ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                {/* Certificate Mock-up */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-gradient-to-r border-blue-200 rounded-lg p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Amity University</h2>
                    <p className="text-gray-600">Certificate of Achievement</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-2">This is to certify that</p>
                    <h3 className="text-3xl font-bold text-blue-900 mb-4">{preview.studentName}</h3>
                    <p className="text-lg text-gray-700 mb-2">has successfully completed</p>
                    <h4 className="text-2xl font-semibold text-purple-900 mb-4">{preview.certificateTitle}</h4>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{preview.dateIssued}</span>
                    </div>
                    <Badge variant="outline">{preview.certificateType}</Badge>
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4" />
                      <span className="font-mono text-xs">{preview.uniqueId}</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="bg-white/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Certificate ID:</span>
                    <span className="font-mono text-sm">{preview.uniqueId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Verification URL:</span>
                    <span className="text-sm text-blue-600 truncate">/verify/{preview.uniqueId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant="default">Ready for Download</Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                    <Button variant="outline" className="w-full bg-white/50">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview PDF
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                    <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-green-500 to-green-600">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Fill out the form to generate a certificate preview</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
