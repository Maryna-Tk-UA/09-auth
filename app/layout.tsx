import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export const metadata: Metadata = {
  title: "Your notes",
  description: "Create and manage your notes",
  openGraph: {
    title: "Your notes",
    description: "Create and manage your notes",
    url: "https://08-zustand-snowy-phi.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Your notes",
      },
    ],
  },
};

const roboto = Roboto({
  subsets: ["latin"], //латиниця/кирилиця
  weight: ["400", "700"], // товщина
  variable: "--font-roboto", // назва css-змінної
  display: "swap", //  вказуємо браузеру одразу показати текст, вне залежності від завантаження шрифта
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Toaster />
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
