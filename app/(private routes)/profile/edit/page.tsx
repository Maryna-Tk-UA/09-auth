"use client";

import css from "./EditProfilePage.module.css";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import Image from "next/image";

function EditProfilePage() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user?.username ?? "");
    });
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ username: userName });
    redirect("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              onChange={handleChange}
              value={userName}
            />
          </div>

          <p>Email: user_email@example.com</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleBack}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditProfilePage;
