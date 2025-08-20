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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { CountUpNumber } from "@/components/ui/count-up-number"
import {
  Users,
  FileCheck,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Award,
  Clock,
  TrendingUp,
  Filter,
  Download,
  Upload,
  Eye,
  CheckCircle,
  XCircle,
  Edit,
  Plus,
  FileText,
  Calendar,
  PieChart,
  Activity,
  Home,
} from "lucide-react"

interface Faculty {
  id: number
  name: string
  email: string
  department: string
}

interface Student {
  id: number
  name: string
  email: string
  department: string
  enrollmentDate: string
  certificatesCount: number
  status: "active" | "inactive"
}

interface CertificateRequest {
  id: number
  studentName: string
  studentEmail: string
  category: string
  title: string
  description: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
  proofUrl?: string
  comments?: string
}

export default function FacultyDashboard() {
  const [faculty, setFaculty] = useState<Faculty | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const [stats, setStats] = useState({
    totalPendingRequests: 15,
    certificatesIssued: 234,
    departmentalStats: 89,
    monthlyRequests: 45,
  })

  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@amity.edu",
      department: "Computer Science",
      enrollmentDate: "2023-08-15",
      certificatesCount: 5,
      status: "active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@amity.edu",
      department: "Computer Science",
      enrollmentDate: "2023-08-20",
      certificatesCount: 3,
      status: "active",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@amity.edu",
      department: "Computer Science",
      enrollmentDate: "2023-09-01",
      certificatesCount: 7,
      status: "active",
    },
  ])

  const [requests, setRequests] = useState<CertificateRequest[]>([
    {
      id: 1,
      studentName: "Alice Johnson",
      studentEmail: "alice@amity.edu",
      category: "Course",
      title: "Advanced Web Development",
      description: "Completed 120-hour advanced web development course with React and Node.js",
      submittedAt: "2024-01-15T10:30:00Z",
      status: "pending",
      proofUrl: "/proof1.pdf",
    },
    {
      id: 2,
      studentName: "Bob Smith",
      studentEmail: "bob@amity.edu",
      category: "Workshop",
      title: "Data Analytics Workshop",
      description: "Attended 3-day intensive data analytics workshop",
      submittedAt: "2024-01-14T14:20:00Z",
      status: "pending",
      proofUrl: "/proof2.pdf",
    },
  ])

  const [newStudentForm, setNewStudentForm] = useState({
    name: "",
    email: "",
    department: "",
    enrollmentDate: "",
  })

  const [templateForm, setTemplateForm] = useState({
    name: "",
    category: "",
    description: "",
  })

  useEffect(() => {
    const demoFaculty = {
      id: 1,
      name: "Dr. Jane Smith",
      email: "faculty@amity.edu",
      department: "Computer Science",
    }
    setFaculty(demoFaculty)
  }, [])

  const handleLogout = () => {
    window.location.href = "/"
  }

  const handleApproveRequest = async (requestId: number) => {
    try {
      const response = await fetch(`/api/requests/${requestId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", comments: "Approved by faculty" }),
      })

      if (response.ok) {
        setRequests(requests.map((req) => (req.id === requestId ? { ...req, status: "approved" as const } : req)))
        // Show success message
        console.log("Request approved successfully")
      }
    } catch (error) {
      console.error("Error approving request:", error)
    }
  }

  const handleRejectRequest = async (requestId: number, comments: string) => {
    try {
      const response = await fetch(`/api/requests/${requestId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", comments }),
      })

      if (response.ok) {
        setRequests(
          requests.map((req) => (req.id === requestId ? { ...req, status: "rejected" as const, comments } : req)),
        )
        console.log("Request rejected successfully")
      }
    } catch (error) {
      console.error("Error rejecting request:", error)
    }
  }

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudentForm),
      })

      if (response.ok) {
        const newStudent = await response.json()
        setStudents([...students, { ...newStudent, certificatesCount: 0, status: "active" }])
        setNewStudentForm({ name: "", email: "", department: "", enrollmentDate: "" })
        console.log("Student added successfully")
      }
    } catch (error) {
      console.error("Error adding student:", error)
    }
  }

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Simulate template creation
      console.log("Creating template:", templateForm)
      setTemplateForm({ name: "", category: "", description: "" })
      // Show success message
    } catch (error) {
      console.error("Error creating template:", error)
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!faculty) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">Faculty Portal</h1>
                <p className="text-sm text-white/70">Welcome back, {faculty.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/10">
                  <Bell className="w-4 h-4" />
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Badge className="bg-red-500 text-white text-xs px-1 min-w-[1.25rem] h-5">
                      {stats.totalPendingRequests}
                    </Badge>
                  </motion.div>
                </Button>
              </motion.div>
              <AnimatedButton
                animation="pulse"
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("settings")}
                className="text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4" />
              </AnimatedButton>
              <AnimatedButton
                animation="ripple"
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </AnimatedButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-black/20 backdrop-blur-sm border border-white/10">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white text-white/70"
            >
              <Home className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white text-white/70"
            >
              <Users className="w-4 h-4 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white text-white/70"
            >
              <FileCheck className="w-4 h-4 mr-2" />
              Requests
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white text-white/70"
            >
              <FileText className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white text-white/70"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white text-white/70"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatedCard animation="glass" delay={0.1}>
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white overflow-hidden relative border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Pending Requests</p>
                        <CountUpNumber value={stats.totalPendingRequests} className="text-3xl font-bold" duration={2} />
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Clock className="w-8 h-8 text-blue-200" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard animation="glass" delay={0.2}>
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white overflow-hidden relative border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Certificates Issued</p>
                        <CountUpNumber value={stats.certificatesIssued} className="text-3xl font-bold" duration={2.5} />
                      </div>
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <FileCheck className="w-8 h-8 text-green-200" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard animation="glass" delay={0.3}>
                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white overflow-hidden relative border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Departmental Stats</p>
                        <CountUpNumber value={stats.departmentalStats} className="text-3xl font-bold" duration={2} />
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                      >
                        <PieChart className="w-8 h-8 text-purple-200" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard animation="glass" delay={0.4}>
                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden relative border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Monthly Requests</p>
                        <CountUpNumber value={stats.monthlyRequests} className="text-3xl font-bold" duration={1.5} />
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <TrendingUp className="w-8 h-8 text-orange-200" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>

            {/* Quick Actions */}
            <AnimatedCard animation="shine" delay={0.5}>
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        icon: FileCheck,
                        label: "Review Requests",
                        action: () => setActiveTab("requests"),
                        primary: true,
                      },
                      { icon: Users, label: "Manage Students", action: () => setActiveTab("students") },
                      { icon: FileText, label: "Create Template", action: () => setActiveTab("templates") },
                      { icon: BarChart3, label: "View Analytics", action: () => setActiveTab("analytics") },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <AnimatedButton
                          animation={item.primary ? "gradient" : "pulse"}
                          className={`h-20 flex-col gap-2 w-full ${
                            item.primary
                              ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                              : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                          }`}
                          variant={item.primary ? "default" : "outline"}
                          onClick={item.action}
                        >
                          <item.icon className="w-6 h-6" />
                          {item.label}
                        </AnimatedButton>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>

            {/* Recent Requests */}
            <AnimatedCard animation="glass" delay={0.6}>
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Certificate Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.slice(0, 3).map((request, index) => (
                      <motion.div
                        key={request.id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.01, x: 5 }}
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-medium"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {request.studentName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </motion.div>
                          <div>
                            <p className="font-medium text-white">{request.studentName}</p>
                            <p className="text-sm text-white/70">{request.title}</p>
                            <p className="text-xs text-white/50">
                              {request.category} • {new Date(request.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={request.status === "approved" ? "default" : "secondary"}
                            className={request.status === "approved" ? "bg-green-600" : "bg-orange-600"}
                          >
                            {request.status}
                          </Badge>
                          {request.status === "pending" && (
                            <div className="flex gap-2">
                              <AnimatedButton
                                animation="ripple"
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-400 hover:bg-red-500/10"
                                onClick={() => handleRejectRequest(request.id, "Insufficient documentation")}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </AnimatedButton>
                              <AnimatedButton
                                animation="confetti"
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveRequest(request.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </AnimatedButton>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </TabsContent>

          {/* Students Management Tab */}
          <TabsContent value="students" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">Manage Students</CardTitle>
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          <Upload className="w-4 h-4 mr-2" />
                          Import CSV
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <Input
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>

                  {/* Add New Student Form */}
                  <Card className="bg-white/5 border border-white/10 mb-6">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Add New Student</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white">Full Name</Label>
                          <Input
                            value={newStudentForm.name}
                            onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            placeholder="Enter student name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Email</Label>
                          <Input
                            type="email"
                            value={newStudentForm.email}
                            onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            placeholder="Enter email address"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Department</Label>
                          <Select
                            value={newStudentForm.department}
                            onValueChange={(value) => setNewStudentForm({ ...newStudentForm, department: value })}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Computer Science">Computer Science</SelectItem>
                              <SelectItem value="Mathematics">Mathematics</SelectItem>
                              <SelectItem value="Physics">Physics</SelectItem>
                              <SelectItem value="Chemistry">Chemistry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Enrollment Date</Label>
                          <Input
                            type="date"
                            value={newStudentForm.enrollmentDate}
                            onChange={(e) => setNewStudentForm({ ...newStudentForm, enrollmentDate: e.target.value })}
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <AnimatedButton
                            animation="pulse"
                            type="submit"
                            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Student
                          </AnimatedButton>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <div className="rounded-lg border border-white/10 bg-white/5">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead className="text-white">Student</TableHead>
                          <TableHead className="text-white">Department</TableHead>
                          <TableHead className="text-white">Enrollment Date</TableHead>
                          <TableHead className="text-white">Certificates</TableHead>
                          <TableHead className="text-white">Status</TableHead>
                          <TableHead className="text-white">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => (
                          <TableRow key={student.id} className="hover:bg-white/5 border-white/10">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm">
                                    {student.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-white">{student.name}</p>
                                  <p className="text-sm text-white/70">{student.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-white/80">{student.department}</TableCell>
                            <TableCell className="text-white/80">{student.enrollmentDate}</TableCell>
                            <TableCell className="text-white/80">{student.certificatesCount}</TableCell>
                            <TableCell>
                              <Badge
                                variant={student.status === "active" ? "default" : "secondary"}
                                className={student.status === "active" ? "bg-green-600" : "bg-gray-600"}
                              >
                                {student.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </motion.div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Certificate Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Pending Certificate Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.map((request, index) => (
                      <motion.div
                        key={request.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                                {request.studentName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-white">{request.studentName}</h3>
                              <p className="text-sm text-white/70">{request.studentEmail}</p>
                              <Badge variant="outline" className="mt-1 border-white/20 text-white/80">
                                {request.category}
                              </Badge>
                            </div>
                          </div>
                          <Badge
                            variant={
                              request.status === "approved"
                                ? "default"
                                : request.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              request.status === "approved"
                                ? "bg-green-600"
                                : request.status === "pending"
                                  ? "bg-orange-600"
                                  : "bg-red-600"
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-white mb-2">{request.title}</h4>
                          <p className="text-white/70 text-sm">{request.description}</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span>Submitted: {new Date(request.submittedAt).toLocaleDateString()}</span>
                            {request.proofUrl && (
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                                  <FileText className="w-4 h-4 mr-1" />
                                  View Proof
                                </Button>
                              </motion.div>
                            )}
                          </div>

                          {request.status === "pending" && (
                            <div className="flex gap-2">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                                  onClick={() => handleRejectRequest(request.id, "Needs more documentation")}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApproveRequest(request.id)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
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

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Certificate Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Create Template Form */}
                  <Card className="bg-white/5 border border-white/10 mb-6">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Create New Template</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateTemplate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Template Name</Label>
                            <Input
                              value={templateForm.name}
                              onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                              placeholder="Enter template name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Category</Label>
                            <Select
                              value={templateForm.category}
                              onValueChange={(value) => setTemplateForm({ ...templateForm, category: value })}
                            >
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="course">Course</SelectItem>
                                <SelectItem value="workshop">Workshop</SelectItem>
                                <SelectItem value="internship">Internship</SelectItem>
                                <SelectItem value="event">Event</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Description</Label>
                          <Textarea
                            value={templateForm.description}
                            onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            placeholder="Template description"
                            rows={3}
                          />
                        </div>
                        <AnimatedButton
                          animation="pulse"
                          type="submit"
                          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create Template
                        </AnimatedButton>
                      </form>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: "Course Certificate", category: "Course", lastModified: "2024-01-15" },
                      { name: "Workshop Certificate", category: "Workshop", lastModified: "2024-01-10" },
                      { name: "Internship Certificate", category: "Internship", lastModified: "2024-01-08" },
                    ].map((template, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center border border-white/10">
                          <Award className="w-12 h-12 text-white/60" />
                        </div>
                        <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                        <p className="text-sm text-white/70 mb-2">{template.category}</p>
                        <p className="text-xs text-white/50 mb-4">Modified: {template.lastModified}</p>
                        <div className="flex gap-2">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Requests Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg flex items-center justify-center border border-white/10">
                      <div className="text-center">
                        <Activity className="w-12 h-12 text-white/60 mx-auto mb-2" />
                        <p className="text-white/70">Chart visualization would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Department Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center border border-white/10">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 text-white/60 mx-auto mb-2" />
                        <p className="text-white/70">Department analytics chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">Usage Reports</CardTitle>
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          <Download className="w-4 h-4 mr-2" />
                          Export PDF
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          <Download className="w-4 h-4 mr-2" />
                          Export Excel
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg text-center border border-white/10">
                      <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">156</p>
                      <p className="text-sm text-white/70">This Month</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg text-center border border-white/10">
                      <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">23%</p>
                      <p className="text-sm text-white/70">Growth Rate</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg text-center border border-white/10">
                      <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">89%</p>
                      <p className="text-sm text-white/70">Approval Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Faculty Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white">Digital Signature</Label>
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                        <Upload className="w-6 h-6 text-white/60 mx-auto mb-2" />
                        <p className="text-sm text-white/70">Upload your digital signature</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Notification Preferences</Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white/80">Email notifications for new requests</span>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              Enable
                            </Button>
                          </motion.div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80">SMS alerts for urgent requests</span>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              Enable
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
