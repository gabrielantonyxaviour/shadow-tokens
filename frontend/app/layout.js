"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import { Inter as FontSans } from "next/font/google";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { cn } from "@/lib/utils";
import { User } from "./userContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
import { config } from "@/lib/constants";
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  const queryClient = new QueryClient();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link data-rh="true" rel="icon" href="favicon.svg"></link>
      </head>
      <body
      // className={
      //   cn(
      //   "min-h-screen bg-background font-sans antialiased",
      //   fontSans.variable
      // )}
      >
        {ready ? (
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <ConnectKitProvider>
                <Wrapper>
                  <User>
                    <Header />
                    {children}
                    <Footer />
                  </User>
                </Wrapper>
              </ConnectKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        ) : null}
      </body>
    </html>
  );
}
