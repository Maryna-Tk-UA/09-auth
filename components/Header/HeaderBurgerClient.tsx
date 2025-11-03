"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import css from "./Header.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const tags = [
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Ideas",
  "Travel",
  "Finance",
  "Health",
  "Important",
  "Todo",
];

function HeaderBurgerClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotesOpenMobile, setIsNotesOpenMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const storeUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearIsAuthenticated);

  const queryClient = useQueryClient();

  const { data: user, isSuccess } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && user && !storeUser) {
      setUser(user);
    }
  }, [isSuccess, setUser, storeUser, user]);

  const ourUser = storeUser ?? user ?? null;

  // close on click outside / ESC
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
        setIsNotesOpenMobile(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsNotesOpenMobile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsNotesOpenMobile(false);
  };

  const toggleNotesMobile = () => {
    setIsNotesOpenMobile((prev) => !prev);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsNotesOpenMobile(false);
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      clearUser();
      queryClient.removeQueries({ queryKey: ["me"] });
      sessionStorage.removeItem("auth:triggerRefresh");
      handleNavClick();
      router.replace("/sign-in");
      toast.success("Come again!", {
        position: "top-center",
        duration: 2500,
      });
    },
    onError: () => {
      toast.error("Something went wrong");
      //   але все одно, про всяк випадок, чистимо юзера
      clearUser();
      queryClient.removeQueries({ queryKey: ["me"] });
      handleNavClick();
      router.replace("/sign-in");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      {/* кнопка-бургер (<1440px видима, >=1440px приховано через CSS) */}
      <button
        className={css.burgerButton}
        onClick={toggleMenu}
        aria-label="Menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {/* оверлей бічного меню */}
      {isMenuOpen && (
        <div className={css.mobileMenuOverlay}>
          <div className={css.mobileMenu} ref={menuRef}>
            <ul className={css.mobileList}>
              <li className={css.mobileItem}>
                <Link
                  href="/"
                  prefetch={false}
                  className={css.mobileLink}
                  onClick={handleNavClick}
                >
                  Home
                </Link>
              </li>

              <li className={css.mobileItem}>
                <button
                  className={css.mobileLinkButton}
                  onClick={toggleNotesMobile}
                >
                  Notes {isNotesOpenMobile ? "▴" : "▾"}
                </button>

                {isNotesOpenMobile && (
                  <ul className={css.mobileSubList}>
                    <li>
                      <Link
                        href="/notes/filter/All"
                        prefetch={false}
                        className={css.mobileSubLink}
                        onClick={handleNavClick}
                      >
                        All notes
                      </Link>
                    </li>
                    {tags.map((tag) => (
                      <li key={tag}>
                        <Link
                          href={`/notes/filter/${tag}`}
                          prefetch={false}
                          className={css.mobileSubLink}
                          onClick={handleNavClick}
                        >
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {ourUser && (
                <li className={css.mobileItem}>
                  <Link
                    href="/profile"
                    prefetch={false}
                    className={css.mobileLink}
                    onClick={handleNavClick}
                  >
                    Profile
                  </Link>
                </li>
              )}

              {ourUser && (
                <li className={css.mobileItem}>
                  <p>{ourUser.email}</p>
                </li>
              )}

              {ourUser && (
                <li className={css.mobileItem}>
                  <button
                    onClick={handleLogout}
                    className={css.mobileCTA}
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                  </button>
                </li>
              )}

              {!ourUser && (
                <>
                  <li className={css.mobileItem}>
                    <Link
                      href="/sign-in"
                      prefetch={false}
                      className={css.mobileLink}
                      onClick={handleNavClick}
                    >
                      Sign in
                    </Link>
                  </li>

                  <li className={css.mobileItem}>
                    <Link
                      href="/sign-up"
                      prefetch={false}
                      className={css.mobileLink}
                      onClick={handleNavClick}
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderBurgerClient;
