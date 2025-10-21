"use client";

import css from "./SignInPage.module.css";
import { useState } from "react";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import { login, LoginRequest } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: async (user) => {
      setUser(user);
      toast.success(`Hello, ${user.username}`, {
        position: "top-center",
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.replace("/profile");
    },
    onError: (error: ApiError) => {
      const msg =
        error.response?.data?.response?.message ??
        error.response?.data?.error ??
        "Oops... some error";

      setError(msg);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData) as LoginRequest;
    mutate(formValues);
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            disabled={isLoading}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
            disabled={isLoading}
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Log in"}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignInPage;

// "use client";

// import css from "./SignInPage.module.css";
// import { useState } from "react";
// import { ApiError } from "@/app/api/api";
// import { useAuthStore } from "@/lib/store/authStore";
// import { login, LoginRequest } from "@/lib/api/clientApi";
// import { useRouter } from "next/navigation";

// function SignInPage() {
//   const router = useRouter();
//   const [error, setError] = useState("");

//   const setUser = useAuthStore((state) => state.setUser);

//   const handleSubmit = async (formData: FormData) => {
//     try {
//       const formValues = Object.fromEntries(formData) as LoginRequest;
//       const res = await login(formValues);
//       if (res) {
//         setUser(res);
//         router.replace("/profile");
//       } else {
//         setError("Invalid email or password");
//       }
//     } catch (error) {
//       const e = error as ApiError;

//       const msg =
//         e.response?.data?.response?.message ??
//         e.response?.data?.error ??
//         "Oops... some error";

//       setError(msg);
//     }
//   };

//   return (
//     <main className={css.mainContent}>
//       <form className={css.form} action={handleSubmit}>
//         <h1 className={css.formTitle}>Sign in</h1>

//         <div className={css.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             name="email"
//             className={css.input}
//             required
//           />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             name="password"
//             className={css.input}
//             required
//           />
//         </div>

//         <div className={css.actions}>
//           <button type="submit" className={css.submitButton}>
//             Log in
//           </button>
//         </div>

//         {error && <p className={css.error}>{error}</p>}
//       </form>
//     </main>
//   );
// }

// export default SignInPage;
