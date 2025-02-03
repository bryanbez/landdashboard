"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyUserTokenCtrl } from "@/controller/authController";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);

  const router = useRouter();

  useEffect(() => {
    return;
  }, []);

  const loginAction = (username) => {
    setUsername(username);
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ username, loginAction }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
