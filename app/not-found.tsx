import { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "Sorry, the page you are looking for does not exist.",
  // url: "https://09-auth-eta-fawn.vercel.app/not-found",  // не працює в лоб
  alternates: {
    canonical: "https://09-auth-eta-fawn.vercel.app/not-found",
  },
  openGraph: {
    title: "404 - Page not found",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://09-auth-eta-fawn.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
  },
};

function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
