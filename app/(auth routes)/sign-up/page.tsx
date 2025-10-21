"use client";

import css from "./SignUpPage.module.css";
import { useState } from "react";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function SignUpPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
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
    const formValues = Object.fromEntries(formData) as RegisterRequest;
    mutate(formValues);
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
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
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Register"}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignUpPage;
