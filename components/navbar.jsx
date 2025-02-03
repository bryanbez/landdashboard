"use client";

import { useAuth } from "@/app/context/AuthContext";
import { logoutUserCtrl } from "@/controller/authController";
import { useRouter } from "next/navigation";
import Link from "next/link";

function AppNavbar() {
  const { username } = useAuth();
  const router = useRouter();

  function logoutUser() {
    const response = logoutUserCtrl();
    console.log(response);
    router.push("/");
    // Redirect to login page here
    // or trigger a global state update to remove the username and other user info
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">
            {username ? `Welcome, ${username}` : "Guest"}
          </a>
          {username ? (
            <button
              onClick={logoutUser}
              className="text-gray-300 hover:text-white">
              Logout
            </button>
          ) : (
            <Link href="/register" className="text-gray-300 hover:text-white">
              Login/Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
