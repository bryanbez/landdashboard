"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUsername = async () => {
      const response = await fetch("/api/user/get-user");
      const data = await response.json();
      if (data.success) {
        setUsername(data.data);
      } else {
        setUsername(null);
      }
    };
    fetchUsername();
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
