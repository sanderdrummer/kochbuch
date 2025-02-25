import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kochbuch",
  description: "Rezepte und so",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="dark:bg-stone-900 dark:text-stone-300 font-extralight">
        {children}
      </body>
    </html>
  );
}
