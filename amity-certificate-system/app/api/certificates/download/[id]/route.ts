import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const certificateId = params.id

    // In real implementation, this would fetch the PDF from storage
    // For now, return a mock PDF response
    const pdfBuffer = Buffer.from("Mock PDF content for certificate " + certificateId)

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="certificate-${certificateId}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Certificate download error:", error)
    return NextResponse.json({ error: "Download failed" }, { status: 500 })
  }
}
