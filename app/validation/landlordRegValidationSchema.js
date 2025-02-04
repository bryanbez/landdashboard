import * as Yup from "yup";

export const landlordRegValidationSchema = Yup.object().shape({
  landProgramName: Yup.string()
    .min(8, "Land Program name must be at least 8 characters")
    .max(30, "Land Program must be at most 30 characters")
    .required("Land Program is required"),

  // landProgramDescription: Yup.string()
  //   .min(30, "Land Program Description must be at least 30 characters")
  //   .max(200, "Land Program Description must be at most 200 characters")
  //   .required("Land Program Description is required"),

  devPtsRate: Yup.number()
    .positive("Development Points Rate must be a positive number")
    .required("Development Points Rate is required"),

  // landProgramBannerImage: Yup.string()
  // .url("Invalid URL")
  // .required("Land Program Banner Image is required"),

  landIds: Yup.array()
    .of(
      Yup.number()
        .positive()
        .integer()
        .required("Land Program Location is required")
    )
    .min(1, "Atleast one land is required")
    .max(15, "Maximum of 15 lands only"),
});
