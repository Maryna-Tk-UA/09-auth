"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      // Перевірка сесії
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        // Якщо сесія валідна - отримуємо користувача
        const user = await getMe();
        if (user) setUser(user);
      } else {
        // При невалідній сесії, чистимо стан
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [clearIsAuthenticated, setUser]);

  return children;
};

export default AuthProvider;
