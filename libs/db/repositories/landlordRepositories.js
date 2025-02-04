import dbConnect from "../init";
import Landlord from "../models/Landlord";

export const LandlordRepository = {
  async create({
    landProgramName,
    landProgramDescription,
    devPtsRate,
    landProgramBannerImage,
    landIds,
    applicationStatus = "pending",
  }) {
    await dbConnect();
    const landlord = new Landlord({
      landProgramName,
      landProgramDescription,
      devPtsRate,
      landProgramBannerImage,
      landIds,
      applicationStatus,
    });
    const saveLandlord = await landlord.save();
    console.log(saveLandlord);
    return saveLandlord;
  },
};
