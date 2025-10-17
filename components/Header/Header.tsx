import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" prefetch={false}>
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/" prefetch={false}>
              Home
            </Link>
          </li>
          <li>
            <TagsMenu />
          </li>
          <li>
            <AuthNavigation />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
