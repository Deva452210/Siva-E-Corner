import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    
    // MOCK: In the future, we will use google-spreadsheet or googleapis here
    // to append `body` to a Google Sheet.
    console.log("Mock Google Sheets Submission:", body);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: "Request submitted successfully" });
  } catch (error) {
    console.error("Error submitting request:", error);
    return NextResponse.json({ success: false, message: "Failed to submit request" }, { status: 500 });
  }
}
