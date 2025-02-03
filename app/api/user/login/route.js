import { NextResponse } from "next/server";
import { comparePassword } from "@/libs/utils/passwordUtil";
import { AuthRepository } from "@/libs/db/repositories/authRepositories";
import { setCookies } from "@/libs/utils/setCookies";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: "Username and password are required",
      });
    }
    const findUsernameInfo = await AuthRepository.getByUsername(username);

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

    return setCookies(data, "Login User Successfully");
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
