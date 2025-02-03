"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyUserTokenCtrl } from "@/controller/authController";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { success, username, error } = await verifyUserTokenCtrl();
        if (!success) {
          console.error("Token verification failed", error);
          setUsername(null);
          return;
        }

        if (success) {
          setUsername(username);
        } else {
          setUsername(null);
        }
      } catch (error) {
        console.error("Token verification failed", error);
        setUsername(null);
      }
    };
    verifyUser();
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
