"use client";

import { useEffect, useRef, useState } from "react";
import css from "./TagSelect.module.css";

const TAG_OPTIONS = [
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

interface TagSelectProps {
  name: string;
  value: string;
  onChange: (newValue: string) => void;
  disabled: boolean;
}

function TagSelect({ name, value, onChange, disabled }: TagSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        open &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const handleToggle = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className={css.wrapper} ref={wrapperRef}>
      {/* Приховую input для FormData */}
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        className={css.control}
        aria-label={`Select tag, current value ${value}`}
        disabled={disabled}
        onClick={handleToggle}
      >
        <span>{value}</span>
        <span className={css.chevron}>{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <ul
          className={`${css.list} ${css.listUp}`}
          role="listbox"
          aria-activedescendant={value}
        >
          {TAG_OPTIONS.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                id={option}
                aria-selected={option === value}
                className={`${css.option} ${option === value ? css.active : ""}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagSelect;
