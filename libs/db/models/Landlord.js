import mongoose, { Schema } from "mongoose";

const LandlordSchema = new Schema(
  // land program name, land program description, developer points rate, land program banner image, land ids
  {
    landProgramName: { type: String, required: true },
    landProgramDescription: { type: String, required: true },
    devPtsRate: { type: Number, required: true },
    landProgramBannerImage: { type: String, required: true },
    landIds: { type: [Number], required: true },
  },
  { timestamps: true }
);

const Landlord =
  mongoose.models.Landlord || mongoose.model("Landlord", LandlordSchema);
export default Landlord;
