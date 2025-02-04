"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authValidationSchema } from "@/app/validation/authValidationSchema";
import { registerUserCtrl } from "@/controller/authController";
import { useRouter } from "next/navigation";

function RegisterUserForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    emailaddress: "",
    username: "",
    password: "",
    walletaddress: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await authValidationSchema.validate(formData, { abortEarly: false });

      setErrors({});

      const registerUser = await registerUserCtrl(formData);

      if (!registerUser.success) {
        setErrors({
          message: registerUser.message,
        });
        return;
      }

      if (registerUser.success === true) {
        console.log("User registered successfully");
        router.push("/dashboard");
      } else {
        console.error("User registration failed");
      }
    } catch (validationError) {
      const validationErrors = {};
      validationError.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {errors?.message && (
        <p className="text-red-500 text-xs mb-4">{errors.message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">
            Email Address:
            <input
              type="text"
              name="emailaddress"
              value={formData.emailaddress}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-red-500 text-xs mt-1">{errors.emailaddress}</p>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
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
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Wallet Address:
            <input
              type="text"
              name="walletaddress"
              value={formData.walletaddress}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-red-500 text-xs mt-1">{errors.walletaddress}</p>
          </label>
        </div>
        <div className="flex justify-between items-center">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
          <input
            type="submit"
            value="Register"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          />
        </div>
      </form>

      <div className="mt-4">
        <Link href="/login" className="text-blue-500 hover:underline">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterUserForm;
