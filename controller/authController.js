import { createToken, removeAuthToken } from "@/libs/utils/encryption";

export const loginUserTokenCtrl = async (token) => {
  return createToken(token);
};

export const registerUserCtrl = async (formData) => {
  try {
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.message,
      };
    }

    return {
      success: true,
      message: "User registered successfully",
      token: data.token,
    };
  } catch (error) {
    console.error("Registration failed", error);
    return {
      success: false,
      message: "Internal Server Error",
      error: error.message,
    };
  }
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
