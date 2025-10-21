"use client";

import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function EditProfilePage() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (user) setUserName(user.username ?? "");
  }, [user]);

  const { mutate, status } = useMutation({
    mutationFn: (payload: { username: string }) => updateMe(payload),
    onSuccess: () => {
      router.replace("/profile");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const submitting = status === "pending" || isLoading;

  const handleBack = () => {
    router.replace("/profile");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = userName.trim();
    if (!name) return;
    mutate({ username: name });
  };

  if (submitting) return "Loading...";

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
              name="username"
              type="text"
              className={css.input}
              onChange={handleChange}
              value={userName}
            />
          </div>

          <p>Email: {user?.email ?? ""}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={submitting}
            >
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleBack}
              disabled={submitting}
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

// "use client";

// import css from "./EditProfilePage.module.css";
// import { redirect, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { getMe, updateMe } from "@/lib/api/clientApi";
// import Image from "next/image";

// function EditProfilePage() {
//   const [userName, setUserName] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     getMe().then((user) => {
//       setUserName(user?.username ?? "");
//     });
//   }, []);

//   const handleBack = () => {
//     router.back();
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUserName(event.target.value);
//   };

//   const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     await updateMe({ username: userName });
//     redirect("/profile");
//   };

//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <h1 className={css.formTitle}>Edit Profile</h1>

//         <Image
//           src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
//           alt="User Avatar"
//           width={120}
//           height={120}
//           className={css.avatar}
//         />

//         <form className={css.profileInfo} onSubmit={handleSaveUser}>
//           <div className={css.usernameWrapper}>
//             <label htmlFor="username">Username:</label>
//             <input
//               id="username"
//               type="text"
//               className={css.input}
//               onChange={handleChange}
//               value={userName}
//             />
//           </div>

//           <p>Email: user_email@example.com</p>

//           <div className={css.actions}>
//             <button type="submit" className={css.saveButton}>
//               Save
//             </button>
//             <button
//               type="button"
//               className={css.cancelButton}
//               onClick={handleBack}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

// export default EditProfilePage;
