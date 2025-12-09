import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    id: 1,
    phoneNumber: "08123456789",
  });
}