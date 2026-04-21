import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    
    if (!scriptUrl) {
       return NextResponse.json({ applications: [], users: [] });
    }

    // We can use a GET request or a POST request with action 'getAdminData'
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "getAdminData"
      })
    });

    const result = await response.json();
    
    if (result.status === "success") {
      return NextResponse.json({ 
        applications: result.applications || [], 
        users: result.users || [] 
      });
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

  } catch (error) {
    console.error("Admin data error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
