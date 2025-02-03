import { isValidToken } from "@/libs/utils/encryption";
import { NextResponse } from "next/server";

export async function authMiddleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const isAuthPages = ["/login", "/register"].includes(pathname);

  if (token && (await isValidToken(token))) {
    if (isAuthPages) {
      console.log("User already logged in");
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!isAuthPages) {
      console.log("User not logged in");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
