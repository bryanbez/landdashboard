import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const createToken = (data) => {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

export const getDecodedToken = () => {
  const token = Cookies.get("token");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
  }
};

export const removeAuthToken = () => {
  Cookies.remove("token", { path: "/" });
};
