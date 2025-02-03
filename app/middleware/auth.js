import { verifyUserTokenCtrl } from "@/controller/authController";

const { NextResponse } = require("next/server");

export async function authMiddleware(request) {
  const response = await verifyUserTokenCtrl();
  const data = response.json();

  const { pathname } = request.nextUrl;

  console.log("Middleware Response", data);

  // if ((username && pathname === "/login") || pathname === "/register") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // if (!username && pathname !== "/login" && pathname !== "/register") {
  //   console.log("No token found");
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}
