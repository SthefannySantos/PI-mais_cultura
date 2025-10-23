'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useVerifyUser() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { id, nome, email, acesso } = localStorage;

      if (!id || !nome || !email || !acesso) {
        localStorage.clear();
        router.replace("/"); // redireciona pra página raiz
      }
    }
  }, [router]);
}