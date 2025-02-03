import dbConnect from "@/libs/db/init";
import User from "@/libs/db/models/User";
import { hashPassword } from "@/libs/utils/passwordUtil";
import { NextResponse } from "next/server";

// localhost:3000/api/contributor/register

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { emailaddress, username, password, walletaddress } = body;

    if (!emailaddress || !username || !password || !walletaddress) {
      return NextResponse.json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const userExists = await User.findOne({ emailaddress });

    if (userExists) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      emailaddress,
      username,
      password: hashedPassword,
      walletaddress,
    });

    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
