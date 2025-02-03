import { jwtVerify, SignJWT } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export const createToken = async (data) => {
  if (!data) {
    throw new Error("No data provided for token creation");
  }
  const token = await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(SECRET_KEY);

  //const token = jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

export const getDecodedToken = async (token) => {
  if (!token) {
    return null;
  }
  try {
    const decoded = await jwtVerify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.error("Invalid or expired token:", error.message);
    return null;
  }
};

export async function isValidToken(token) {
  try {
    await jwtVerify(token, SECRET_KEY);
    return true;
  } catch (error) {
    console.error("Invalid or expired token:", error.message);
    return false;
  }
}

export const removeAuthToken = () => {
  Cookies.remove("token", { path: "/" });
};
