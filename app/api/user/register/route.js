import { AuthRepository } from "@/libs/db/repositories/authRepositories";
import { hashPassword } from "@/libs/utils/passwordUtil";
import { setCookies } from "@/libs/utils/setCookies";
import { NextResponse } from "next/server";

// localhost:3000/api/contributor/register

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON format",
        },
        { status: 400 }
      );
    }

    let { emailaddress, username, password, walletaddress } = body;

    emailaddress = emailaddress?.trim();
    username = username?.trim();
    walletaddress = walletaddress?.trim();

    if (!emailaddress || !username || !password || !walletaddress) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all fields",
        },
        { status: 400 }
      );
    }

    const userExists = await AuthRepository.getByEmailAddress(emailaddress);

    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const createUser = await AuthRepository.create({
      emailaddress,
      username,
      hashedPassword,
      walletaddress,
    });

    if (!createUser) {
      return NextResponse.json(
        { success: false, message: "Failed to create user" },
        { status: 500 }
      );
    }

    const findUserId = AuthRepository.getById(username);

    const data = {
      id: findUserId,
      username,
    };

    return await setCookies(data, "User Registered Successfully");
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
