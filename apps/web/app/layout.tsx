import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@kochbuch/ui/navbar";
import { RecipeNavTab, ListNavTab } from "./navbar";

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
        <Navbar>
          <RecipeNavTab />
          <ListNavTab />
        </Navbar>
      </body>
    </html>
  );
}
