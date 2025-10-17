import Link from "next/link";
import css from "./SidebarNotes.module.css";

const TAGS = [
  "All",
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

function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
            prefetch={false}
          >
            {tag === "All" ? "All notes" : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SidebarNotes;
