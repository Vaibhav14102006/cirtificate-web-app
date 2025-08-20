"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Award,
  FileText,
  Download,
  Plus,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Eye,
  Share,
  Printer,
  Upload,
  Camera,
  Mail,
  Phone,
  MessageCircle,
  BookOpen,
  CheckCircle,
  Clock,
  X,
} from "lucide-react"

interface Student {
  id: number
  name: string
  email: string
  role: string
  department: string
  photo?: string
}

interface Certificate {
  id: number
  title: string
  type: string
  dateIssued: string
  status: "issued" | "pending" | "rejected"
  downloadUrl?: string
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      title: "Web Development Course",
      type: "Course",
      dateIssued: "2024-01-15",
      status: "issued",
      downloadUrl: "/cert1.pdf",
    },
    { id: 2, title: "Data Science Workshop", type: "Workshop", dateIssued: "2024-01-10", status: "pending" },
    {
      id: 3,
      title: "Machine Learning Internship",
      type: "Internship",
      dateIssued: "2024-01-05",
      status: "issued",
      downloadUrl: "/cert3.pdf",
    },
  ])

  const [stats, setStats] = useState({
    totalCertificates: 12,
    pendingRequests: 3,
    recentDownloads: 5,
  })

  const [requestForm, setRequestForm] = useState({
    category: "",
    title: "",
    description: "",
    proofFile: null as File | null,
  })

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    photo: null as File | null,
  })

  useEffect(() => {
    const demoStudent = {
      id: 1,
      name: "John Doe",
      email: "student@amity.edu",
      role: "student",
      department: "Computer Science",
      photo: "/student-avatar.png",
    }
    setStudent(demoStudent)
    setProfileForm({
      name: demoStudent.name,
      email: demoStudent.email,
      phone: "+91 9876543210",
      department: demoStudent.department,
      photo: null,
    })
  }, [])

  const handleLogout = () => {
    window.location.href = "/"
  }

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...requestForm,
          studentId: student?.id,
          studentName: student?.name,
          studentEmail: student?.email,
        }),
      })

      if (response.ok) {
        const newRequest = await response.json()
        // Add to pending requests
        setStats((prev) => ({ ...prev, pendingRequests: prev.pendingRequests + 1 }))
        setRequestForm({ category: "", title: "", description: "", proofFile: null })
        // Show success message
        console.log("Certificate request submitted successfully")
      }
    } catch (error) {
      console.error("Error submitting request:", error)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: student?.id,
          ...profileForm,
        }),
      })

      if (response.ok) {
        const updatedStudent = await response.json()
        setStudent(updatedStudent)
        console.log("Profile updated successfully")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleDownloadCertificate = async (certificateId: number) => {
    try {
      const response = await fetch(`/api/certificates/download/${certificateId}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `certificate-${certificateId}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Error downloading certificate:", error)
    }
  }

  if (!student) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">Student Portal</h1>
                <p className="text-sm text-white/70">Welcome back, {student.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Bell className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("settings")}
                  className="text-white hover:bg-white/10"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("support")}
                  className="text-white hover:bg-white/10"
                >
                  <HelpCircle className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/20 backdrop-blur-sm border border-white/10">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-white/70"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="request"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-white/70"
            >
              Request Certificate
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-white/70"
            >
              My Certificates
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-white/70"
            >
              Profile & Settings
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-white/70"
            >
              Support
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white overflow-hidden relative">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Certificates</p>
                        <motion.p
                          className="text-3xl font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          {stats.totalCertificates}
                        </motion.p>
                      </div>
                      <Award className="w-8 h-8 text-blue-200" />
                    </div>
                  </CardContent>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden relative">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Pending Requests</p>
                        <motion.p
                          className="text-3xl font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4, type: "spring" }}
                        >
                          {stats.pendingRequests}
                        </motion.p>
                      </div>
                      <Clock className="w-8 h-8 text-orange-200" />
                    </div>
                  </CardContent>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white overflow-hidden relative">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Recent Downloads</p>
                        <motion.p
                          className="text-3xl font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                        >
                          {stats.recentDownloads}
                        </motion.p>
                      </div>
                      <Download className="w-8 h-8 text-green-200" />
                    </div>
                  </CardContent>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                </Card>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full"
                        onClick={() => setActiveTab("request")}
                      >
                        <Plus className="w-6 h-6" />
                        Request Certificate
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        className="h-20 flex-col gap-2 bg-white/50 hover:bg-white/70 w-full"
                        onClick={() => setActiveTab("certificates")}
                      >
                        <FileText className="w-6 h-6" />
                        My Certificates
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        className="h-20 flex-col gap-2 bg-white/50 hover:bg-white/70 w-full"
                        onClick={() => setActiveTab("settings")}
                      >
                        <Settings className="w-6 h-6" />
                        Profile Settings
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        className="h-20 flex-col gap-2 bg-white/50 hover:bg-white/70 w-full"
                        onClick={() => setActiveTab("support")}
                      >
                        <HelpCircle className="w-6 h-6" />
                        Support
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certificates.slice(0, 3).map((cert, index) => (
                      <motion.div
                        key={cert.id}
                        className="flex items-center justify-between p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              cert.status === "issued"
                                ? "bg-green-100 text-green-600"
                                : cert.status === "pending"
                                  ? "bg-orange-100 text-orange-600"
                                  : "bg-red-100 text-red-600"
                            }`}
                          >
                            {cert.status === "issued" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : cert.status === "pending" ? (
                              <Clock className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{cert.title}</p>
                            <p className="text-sm text-gray-600">
                              {cert.type} • {cert.dateIssued}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            cert.status === "issued"
                              ? "default"
                              : cert.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {cert.status}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="request" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Request New Certificate</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRequestSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={requestForm.category}
                          onValueChange={(value) => setRequestForm({ ...requestForm, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select certificate category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="course">Course</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">Certificate Title</Label>
                        <Input
                          id="title"
                          value={requestForm.title}
                          onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
                          placeholder="Enter certificate title"
                          className="bg-white/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={requestForm.description}
                        onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })}
                        placeholder="Provide details about your certificate request"
                        className="bg-white/50 min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="proof">Upload Proof Document</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                        <Input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setRequestForm({ ...requestForm, proofFile: e.target.files?.[0] || null })}
                        />
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        Submit Request
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>My Certificates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {certificates.map((cert, index) => (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-white/50 rounded-lg border hover:bg-white/70 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                              <Award className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                              <p className="text-sm text-gray-600">
                                {cert.type} • Issued: {cert.dateIssued}
                              </p>
                              <Badge
                                variant={
                                  cert.status === "issued"
                                    ? "default"
                                    : cert.status === "pending"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className="mt-1"
                              >
                                {cert.status}
                              </Badge>
                            </div>
                          </div>

                          {cert.status === "issued" && (
                            <div className="flex gap-2">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                  onClick={() => handleDownloadCertificate(cert.id)}
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline" size="sm">
                                  <Share className="w-4 h-4 mr-2" />
                                  Share
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline" size="sm">
                                  <Printer className="w-4 h-4 mr-2" />
                                  Print
                                </Button>
                              </motion.div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Profile & Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="flex items-center gap-6">
                      <motion.div className="relative group" whileHover={{ scale: 1.05 }}>
                        <Avatar className="w-24 h-24 ring-4 ring-gradient-to-r ring-blue-500">
                          <AvatarImage src={student.photo || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <p className="text-gray-600">{student.department}</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          <Upload className="w-4 h-4 mr-2" />
                          Change Photo
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="bg-white/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="bg-white/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="bg-white/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={profileForm.department}
                          onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                          className="bg-white/50"
                        />
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        Update Profile
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Raise a Ticket</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Brief description of your issue" className="bg-white/50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Describe your issue in detail"
                          className="bg-white/50 min-h-[120px]"
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                          Submit Ticket
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Quick Help</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Button variant="outline" className="w-full justify-start bg-white/50 hover:bg-white/70">
                        <BookOpen className="w-4 h-4 mr-2" />
                        FAQs
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Button variant="outline" className="w-full justify-start bg-white/50 hover:bg-white/70">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Live Chat
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Button variant="outline" className="w-full justify-start bg-white/50 hover:bg-white/70">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Support
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Button variant="outline" className="w-full justify-start bg-white/50 hover:bg-white/70">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Support
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
