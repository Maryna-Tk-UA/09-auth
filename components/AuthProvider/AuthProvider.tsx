"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import OverlayLoader from "../OverlayLoader/OverlayLoader";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const queryClient = useQueryClient();

  const { data: user, status } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const ok = await checkSession();
      if (!ok) return null;
      return (await getMe()) ?? null;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (status === "success") {
      if (user) {
        setUser(user);
        queryClient.setQueryData(["me"], user);
      } else {
        clearIsAuthenticated();
        queryClient.removeQueries({ queryKey: ["me"] });
      }
    } else if (status === "error") {
      clearIsAuthenticated();
    }
  }, [clearIsAuthenticated, queryClient, setUser, status, user]);

  if (status === "pending") return <OverlayLoader />;

  return children;
};

export default AuthProvider;

// "use client";

// import { checkSession, getMe } from "@/lib/api/clientApi";
// import { useAuthStore } from "@/lib/store/authStore";
// import { useEffect } from "react";

// type AuthProviderProps = {
//   children: React.ReactNode;
// };

// const AuthProvider = ({ children }: AuthProviderProps) => {
//   const setUser = useAuthStore((state) => state.setUser);
//   const clearIsAuthenticated = useAuthStore(
//     (state) => state.clearIsAuthenticated
//   );

//   useEffect(() => {
//     const fetchUser = async () => {
//       // Перевірка сесії
//       const isAuthenticated = await checkSession();
//       if (isAuthenticated) {
//         // Якщо сесія валідна - отримуємо користувача
//         const user = await getMe();
//         if (user) setUser(user);
//       } else {
//         // При невалідній сесії, чистимо стан
//         clearIsAuthenticated();
//       }
//     };
//     fetchUser();
//   }, [clearIsAuthenticated, setUser]);

//   return children;
// };

// export default AuthProvider;
