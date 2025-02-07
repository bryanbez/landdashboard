import { checkLandIfItsOwned } from "@/controller/landlordController";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  // hardcoded temporary but it can be change to current date and past 2 days
  const dateFrom = "2024-08-18";
  const dateTo = "2024-08-20";

  const { landId } = await params;

  const urlParams = {
    landId,
    from: dateFrom,
    to: dateTo,
  };

  const checkLand = await checkLandIfItsOwned(urlParams);

  if (checkLand.success) {
    return NextResponse.json({
      success: true,
      message: "Land is owned",
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "Land is not released to market",
    });
  }
}
