import { authMiddleware } from "./app/middleware/auth";

export async function middleware(request, next) {
  // Add middleware here
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse;

  return authMiddleware(request);
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/login",
    "/register",
  ], // Excludes API & static files
};
