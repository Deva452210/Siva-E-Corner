import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    const { action, phone, password } = data;

    if (!phone || !password) {
      return NextResponse.json({ success: false, message: "Phone and password required" }, { status: 400 });
    }

    // Hardcoded Admin Check
    if (phone === "6380839448" && password === "1234") {
      return NextResponse.json({ success: true, role: "admin" });
    }

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    
    if (!scriptUrl) {
       // If no script URL, simulate success for testing
       console.warn("No Google Script URL, simulating auth success");
       return NextResponse.json({ success: true, role: "user" });
    }

    // Forward to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: action, // "login" or "signup"
        phone: phone,
        password: password
      })
    });

    const result = await response.json();
    
    if (result.status === "success") {
      return NextResponse.json({ success: true, role: "user" });
    } else {
      return NextResponse.json({ success: false, message: result.message || "Authentication failed" }, { status: 401 });
    }

  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
