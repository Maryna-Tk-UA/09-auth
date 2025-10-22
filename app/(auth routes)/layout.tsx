"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    // прописую ключ для sessionStorage
    const key = "auth:triggerRefresh";
    // перевірка на встановлення ключа
    if (sessionStorage.getItem(key) === "1") {
      sessionStorage.removeItem(key);
      // refresh викличе перезавантаження даних
      router.refresh();
    }
  }, [router]);

  return children;
}
