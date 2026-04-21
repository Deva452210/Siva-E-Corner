import { fetchServicesData } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchServicesData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services data" }, { status: 500 });
  }
}
