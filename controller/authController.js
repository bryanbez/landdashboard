import { createToken, removeAuthToken } from "@/libs/utils/encryption";

export const loginUserTokenCtrl = async (token) => {
  return createToken(token);
};

export const loginUserCtrl = async (username, password) => {
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Login failed", error);
    return { success: false, username: null, error: error.message };
  }
};

export const logoutUserCtrl = () => {
  removeAuthToken();
  return { success: true, message: "Logged out successfully" };
};

export const verifyUserTokenCtrl = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Error on token verification");
    }
    const data = await response.json();

    return { success: true, username: data };
  } catch (error) {
    console.error("Token verification failed", error.message);
    return { sucess: false, username: null, error: error.message };
  }
};
