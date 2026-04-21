import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    // MOCK: In the future, we will use googleapis here
    // to upload `file` to Google Drive.
    console.log("Mock Google Drive Upload:", file.name, file.size, file.type);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, message: "Document uploaded successfully", fileId: "mock-file-id" });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json({ success: false, message: "Failed to upload document" }, { status: 500 });
  }
}
