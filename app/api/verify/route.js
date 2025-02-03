import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) return NextResponse.json({ message: "No token found" });

    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, SECRET_KEY);

    return NextResponse.json(decoded);
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" });
  }
}
