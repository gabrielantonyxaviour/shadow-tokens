"use client";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { User } from "./userContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link data-rh="true" rel="icon" href="favicon.svg"></link>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Wrapper>
          <User>
            <Header />
            {children}
            <Footer />
          </User>
        </Wrapper>
      </body>
    </html>
  );
}
