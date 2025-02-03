import { loginUserTokenCtrl } from "@/controller/authController";
import { NextResponse } from "next/server";

export async function setCookies(data, authMesssage) {
  const generateTokenToStoreInCookies = await loginUserTokenCtrl(data);
  const response = NextResponse.json({
    message: authMesssage,
    data,
    status: 200,
    success: true,
  });

  response.cookies.set("token", generateTokenToStoreInCookies, {
    httpOnly: true, // Ensures the cookie is only accessible via HTTP requests, not JavaScript code
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict", // Prevents CSRF attacks
    maxAge: 60 * 60, // 1 hour expiration
    path: "/", // Makes cookie available to the entire website
  });

  return response;
}
