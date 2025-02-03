import User from "@/libs/db/models/User";
import { NextResponse } from "next/server";
import { comparePassword } from "@/libs/utils/passwordUtil";
import dbConnect from "@/libs/db/init";
import { loginUserTokenCtrl } from "@/controller/authController";
import { createToken } from "@/libs/utils/encryption";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: "Username and password are required",
      });
    }
    const findUsernameInfo = await User.findOne({ username });

    if (!findUsernameInfo) {
      return NextResponse.json({
        success: false,
        message: "User does not exist",
        status: 401,
      });
    }

    const passwordMatch = await comparePassword(
      password,
      findUsernameInfo.password
    );

    if (!passwordMatch) {
      return NextResponse.json({
        success: false,
        message: "Invalid username or password",
        status: 401,
      });
    }
    const data = {
      id: findUsernameInfo._id,
      username: findUsernameInfo.username,
    };

    const generateTokenToStoreInCookies = await loginUserTokenCtrl(data);

    const response = NextResponse.json({
      message: "Login successful",
      data,
      status: 200,
      sucesss: true,
    });

    response.cookies.set("token", generateTokenToStoreInCookies, {
      httpOnly: true, // Ensures the cookie is only accessible via HTTP requests, not JavaScript code
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 60 * 60, // 1 hour expiration
      path: "/", // Makes cookie available to the entire website
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
