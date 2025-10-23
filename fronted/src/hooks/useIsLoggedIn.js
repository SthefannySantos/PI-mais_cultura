'use client';
import { useState, useEffect } from "react";

export function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const nome = localStorage.getItem("nome");
      const email = localStorage.getItem("email");
      const acesso = localStorage.getItem("acesso");

      setIsLoggedIn(!!(id && nome && email && acesso));
    }
  }, []);

  return isLoggedIn;
}
