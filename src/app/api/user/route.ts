// src/pages/api/set-cookie.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return response;
}
