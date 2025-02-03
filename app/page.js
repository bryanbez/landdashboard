"use client";
import { useEffect } from "react";
import Dashboard from "./(pages)/dashboard/page";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  // const { loginAction, username } = useAuth();

  // useEffect(() => {
  //   if (username) {
  //     loginAction();
  //   }
  // }, [username]);

  return <Dashboard />;
}
