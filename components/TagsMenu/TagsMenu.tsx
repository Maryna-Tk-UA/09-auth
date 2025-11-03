"use client";

import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useEffect, useRef, useState } from "react";

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

function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // реф на контейнер меню
  const menuRef = useRef<HTMLDivElement | null>(null);

  // закривалка
  const closeMenu = () => setIsOpen(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  // клік на пункт меню - закриття
  const handleMenuItemClick = () => {
    closeMenu();
  };

  // клік будь-де в документі, не в середині меню - закрити
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // меню закрите - нічого не робимо
      if (!isOpen) return;

      const target = event.target as Node;

      // клік поза контейнером
      if (menuRef.current && !menuRef.current.contains(target)) {
        closeMenu();
      }
    }
    // навішую слухач на весь документ
    document.addEventListener("mousedown", handleClickOutside);

    // чищу за собою
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // на div додати ref у JSX
  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/All"
              className={css.menuLink}
              onClick={handleMenuItemClick}
              prefetch={false}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={handleMenuItemClick}
                prefetch={false}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagsMenu;
