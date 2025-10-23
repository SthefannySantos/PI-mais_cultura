'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useVerifyAdmin() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const acesso = localStorage.getItem("acesso");

      // Se não tiver id ou não for admin (assumindo acesso '2' = admin)
      if (!id || acesso !== "2") {
        localStorage.clear();
        router.replace("/"); // redireciona para página raiz
      }
    }
  }, [router]);
}