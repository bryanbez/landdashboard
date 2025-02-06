import dbConnect from "../init";
import Landlord from "../models/Landlord";

export const LandlordRepository = {
  async create({
    landProgramName,
    landProgramDescription,
    devPtsRate,
    landProgramBannerImage,
    landIds,
    programOwner,
    applicationStatus = "pending",
  }) {
    await dbConnect();
    const landlord = new Landlord({
      landProgramName,
      landProgramDescription,
      devPtsRate,
      landProgramBannerImage,
      landIds,
      programOwner,
      applicationStatus,
    });
    const saveLandlord = await landlord.save();
    console.log(saveLandlord);
    return saveLandlord;
  },
};
