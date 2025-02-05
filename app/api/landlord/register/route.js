import { LandlordRepository } from "@/libs/db/repositories/landlordRepositories";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    let {
      landProgramName,
      landProgramDesc,
      devPtsRate,
      landProgramBannerImage,
      lands,
      applicationStatus,
    } = body;

    landProgramName = landProgramName?.trim();

    if (!landProgramName || !landProgramDesc || !devPtsRate || !lands) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        status: 400,
      });
    }
    const createLandlord = await LandlordRepository.create({
      landProgramName,
      landProgramDescription: landProgramDesc,
      devPtsRate,
      landProgramBannerImage,
      landIds: lands,
      applicationStatus,
    });

    if (!createLandlord) {
      return NextResponse.json({
        success: false,
        message: "Failed to create landlord",
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Landlord created successfully",
        data: createLandlord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating landlord", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
