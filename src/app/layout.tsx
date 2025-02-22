import Header from "@/ui/Header/Header";
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { FC, PropsWithChildren } from "react";
import "../styles/main.scss";
import styles from "./styles.module.scss";
import ParentProvider from "@/contexts/ParentProvider";

const robotCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zara Web Challenge",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${robotCondensed.variable}`}>
        <ParentProvider>
          <main className={styles["main"]}>
            <Header />
            {children}
          </main>
        </ParentProvider>
      </body>
    </html>
  );
};

export default RootLayout;
