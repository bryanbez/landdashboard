"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginValidationSchema } from "@/app/validation/loginValidationSchema";
import { useAuth } from "@/app/context/AuthContext";
import { loginUserCtrl } from "@/controller/authController";

function LoginForm() {
  const [username, setInputUsername] = useState("");
  const [password, setInputPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loginStatusMessage, setLoginStatusMessage] = useState("");

  const router = useRouter();
  const { loginAction } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setInputUsername(value);
    } else {
      setInputPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginValidationSchema.validate(
        { username, password },
        { abortEarly: false }
      );
      setErrors({});

      const response = await loginUserCtrl(username, password);

      if (response.success === false) {
        setLoginStatusMessage(response.message);
      }

      loginAction(response.data.username);
      setLoginStatusMessage("");
      router.push("/");
    } catch (validationError) {
      const validationErrors = {};
      if (validationError.inner) {
        validationError.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {loginStatusMessage ? (
        <p className="text-red-500 text-xs mb-4">{loginStatusMessage}</p>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          </label>
          <div className="mt-4">
            <input
              type="submit"
              value="Login"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
