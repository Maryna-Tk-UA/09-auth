import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import HeaderBurgerClient from "./HeaderBurgerClient";

function Header() {
  return (
    <header className={css.header}>
      <div className={css.headerInner}>
        <div className={css.leftZone}>
          <Link
            href="/"
            aria-label="Home"
            prefetch={false}
            className={css.navigationLinkHome}
          >
            NoteHub
          </Link>
        </div>
        <nav aria-label="Main Navigation" className={css.centerZone}>
          <ul className={css.navigation}>
            <li>
              <Link href="/" prefetch={false} className={css.navigationLink}>
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
        <div className={css.rightZone}>
          <HeaderBurgerClient />
        </div>
      </div>
    </header>
  );
}

export default Header;

//! робоча версія, але CSR-component
// "use client";

// import Link from "next/link";
// import css from "./Header.module.css";
// import TagsMenu from "../TagsMenu/TagsMenu";
// import AuthNavigation from "../AuthNavigation/AuthNavigation";
// import { useEffect, useRef, useState } from "react";

// const tags = [
//   "Work",
//   "Personal",
//   "Meeting",
//   "Shopping",
//   "Ideas",
//   "Travel",
//   "Finance",
//   "Health",
//   "Important",
//   "Todo",
// ];

// function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isNotesOpenMobile, setIsNotesOpenMobile] = useState(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   // Закриття по кліку поза меню або Esc
//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (
//         isMenuOpen &&
//         menuRef.current &&
//         !menuRef.current.contains(e.target as Node)
//       ) {
//         setIsMenuOpen(false);
//         setIsNotesOpenMobile(false);
//       }
//     }

//     function handleEsc(e: KeyboardEvent) {
//       if (e.key === "Escape") {
//         setIsMenuOpen(false);
//         setIsNotesOpenMobile(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEsc);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEsc);
//     };
//   }, [isMenuOpen]);

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//     setIsNotesOpenMobile(false);
//   };

//   const toggleNotesMobile = () => {
//     setIsNotesOpenMobile((prev) => !prev);
//   };

//   const handleNavClick = () => {
//     setIsMenuOpen(false);
//     setIsNotesOpenMobile(false);
//   };

//   return (
//     <header className={css.header}>
//       <div className={css.headerInner}>
//         <Link
//           href="/"
//           aria-label="Home"
//           prefetch={false}
//           className={css.navigationLinkHome}
//         >
//           NoteHub
//         </Link>

//         {/* Десктоп навігація */}
//         <nav aria-label="Main Navigation" className={css.navDesktop}>
//           <ul className={css.navigation}>
//             <li>
//               <Link href="/" prefetch={false} className={css.navigationLink}>
//                 Home
//               </Link>
//             </li>
//             <li>
//               <TagsMenu />
//             </li>
//             <li>
//               <AuthNavigation />
//             </li>
//           </ul>
//         </nav>

//         {/* Бургер */}
//         <button
//           className={css.burgerButton}
//           onClick={toggleMenu}
//           aria-label="Menu"
//           aria-expanded={isMenuOpen}
//         >
//           {isMenuOpen ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* Mobile/Tablet menu */}
//       {isMenuOpen && (
//         <div className={css.mobileMenuOverlay}>
//           <div className={css.mobileMenu} ref={menuRef}>
//             <ul className={css.mobileList}>
//               <li className={css.mobileItem}>
//                 <Link
//                   href="/"
//                   prefetch={false}
//                   className={css.mobileLink}
//                   onClick={handleNavClick}
//                 >
//                   Home
//                 </Link>
//               </li>

//               <li className={css.mobileItem}>
//                 <button
//                   className={css.mobileLinkButton}
//                   onClick={toggleNotesMobile}
//                 >
//                   Notes {isNotesOpenMobile ? "▴" : "▾"}
//                 </button>

//                 {isNotesOpenMobile && (
//                   <ul className={css.mobileSubList}>
//                     <li>
//                       <Link
//                         href="/notes/filter/All"
//                         prefetch={false}
//                         className={css.mobileSubLink}
//                         onClick={handleNavClick}
//                       >
//                         All notes
//                       </Link>
//                     </li>
//                     {tags.map((tag) => (
//                       <li key={tag}>
//                         <Link
//                           href={`/notes/filter/${tag}`}
//                           prefetch={false}
//                           className={css.mobileSubLink}
//                           onClick={handleNavClick}
//                         >
//                           {tag}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>

//               <li className={css.mobileItem}>
//                 {/* рендер за умови через глобальний стан */}
//                 <Link
//                   href="/profile"
//                   prefetch={false}
//                   className={css.mobileLink}
//                   onClick={handleNavClick}
//                 >
//                   Profile
//                 </Link>
//               </li>

//               <li className={css.mobileItem}>
//                 <Link
//                   href="/signin"
//                   prefetch={false}
//                   className={css.mobileLink}
//                   onClick={handleNavClick}
//                 >
//                   Sign in
//                 </Link>
//               </li>

//               <li className={css.mobileItem}>
//                 <Link
//                   href="/signup"
//                   prefetch={false}
//                   className={css.mobileCTA}
//                   onClick={handleNavClick}
//                 >
//                   Sign up
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;
