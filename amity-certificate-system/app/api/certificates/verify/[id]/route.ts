import { type NextRequest, NextResponse } from "next/server"

// Mock certificate database - in real implementation, this would be a database query
const mockCertificates = [
  {
    id: "AMITY-1705123456789-ABC123DEF",
    studentName: "Alice Johnson",
    studentEmail: "alice@amity.edu",
    certificateTitle: "Advanced Web Development",
    certificateType: "Course",
    dateIssued: "2024-01-15",
    isValid: true,
    issuer: "Amity University",
    department: "Computer Science",
  },
  {
    id: "AMITY-1705123456790-XYZ789GHI",
    studentName: "Bob Smith",
    studentEmail: "bob@amity.edu",
    certificateTitle: "Data Analytics Workshop",
    certificateType: "Workshop",
    dateIssued: "2024-01-14",
    isValid: true,
    issuer: "Amity University",
    department: "Mathematics",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const certificateId = params.id

    // Find certificate in mock database
    const certificate = mockCertificates.find((cert) => cert.id === certificateId)

    if (!certificate) {
      return NextResponse.json(
        {
          error: "Certificate not found",
          isValid: false,
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      isValid: certificate.isValid,
      certificate: {
        id: certificate.id,
        studentName: certificate.studentName,
        certificateTitle: certificate.certificateTitle,
        certificateType: certificate.certificateType,
        dateIssued: certificate.dateIssued,
        issuer: certificate.issuer,
        department: certificate.department,
      },
    })
  } catch (error) {
    console.error("Certificate verification error:", error)
    return NextResponse.json(
      {
        error: "Verification failed",
        isValid: false,
      },
      { status: 500 },
    )
  }
}
