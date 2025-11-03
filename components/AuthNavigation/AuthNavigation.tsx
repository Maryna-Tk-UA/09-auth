"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { getMe, logout } from "@/lib/api/clientApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function AuthNavigation() {
  const router = useRouter();
  // Отримуємо поточну сесію та юзера
  const { isAuthenticated, user } = useAuthStore();

  // Отримуємо метод очищення глобального стану
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: isAuthenticated,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleLogout = async () => {
    // Викликаємо logout
    await logout();
    // Чистимо глобальний стан
    clearIsAuthenticated();
    // чистимо кеш
    queryClient.removeQueries({ queryKey: ["me"] });
    sessionStorage.removeItem("auth:triggerRefresh");
    // Виконуємо навігацію на сторінку авторизації
    router.replace("/sign-in");
  };

  const email = data?.email ?? user?.email;

  // За умови, що сесія є, відображаємо інфу про користувача та кнопку
  // logout, інакше - лінки для авторизації
  return isAuthenticated ? (
    <ul className={css.navigationItem}>
      <li>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li>
        <p className={css.userEmail}>{email}</p>
      </li>
      <li>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </ul>
  ) : (
    <ul className={css.navigationItem}>
      <li>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </ul>
  );
}

export default AuthNavigation;

// "use client";

// import Link from "next/link";
// import css from "./AuthNavigation.module.css";
// import { useAuthStore } from "@/lib/store/authStore";
// import { useRouter } from "next/navigation";
// import { logout } from "@/lib/api/clientApi";

// function AuthNavigation() {
//   const router = useRouter();
//   // Отримуємо поточну сесію та юзера
//   const { isAuthenticated, user } = useAuthStore();

//   // Отримуємо метод очищення глобального стану
//   const clearIsAuthenticated = useAuthStore(
//     (state) => state.clearIsAuthenticated
//   );

//   const handleLogout = async () => {
//     // Викликаємо logout
//     await logout();
//     // Чистимо глобальний стан
//     clearIsAuthenticated();
//     // Виконуємо навігацію на сторінку авторизації
//     router.replace("/sign-in");
//   };

//   // За умови, що сесія є, відображаємо інфу про користувача та кнопку
//   // logout, інакше - лінки для авторизації
//   return isAuthenticated ? (
//     <ul>
//       <li className={css.navigationItem}>
//         <Link href="/profile" prefetch={false} className={css.navigationLink}>
//           Profile
//         </Link>
//       </li>
//       <li className={css.navigationItem}>
//         <p className={css.userEmail}>{user?.email}</p>
//         <button className={css.logoutButton} onClick={handleLogout}>
//           Logout
//         </button>
//       </li>
//     </ul>
//   ) : (
//     <ul>
//       <li className={css.navigationItem}>
//         <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
//           Login
//         </Link>
//       </li>
//       <li className={css.navigationItem}>
//         <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
//           Sign up
//         </Link>
//       </li>
//     </ul>
//   );
// }

// export default AuthNavigation;
