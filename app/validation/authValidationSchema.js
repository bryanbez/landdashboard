import * as Yup from "yup";

export const authValidationSchema = Yup.object().shape({
  emailaddress: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),

  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username must be at most 15 characters")
    .required("Username is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),

  walletaddress: Yup.string()
    .min(42, "Wallet address must be at least 42 characters")
    .max(42, "Wallet address must be at most 42 characters")
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address")
    .required("Wallet address is required"),
});
