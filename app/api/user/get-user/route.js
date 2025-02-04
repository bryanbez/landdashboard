import { getDecodedToken } from "@/libs/utils/encryption";
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get("token")?.value;
  const getUsername = await getDecodedToken(token);

  if (!getUsername) {
    return NextResponse.json({
      message: "No User Found",
      status: 401,
      success: false,
    });
  }
  if (getUsername) {
    const username = getUsername.payload.username;
    return NextResponse.json({
      status: 200,
      success: true,
      data: username,
    });
  }
}
