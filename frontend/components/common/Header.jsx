import Link from "next/link";
import React from "react";
import { ConnectWalletNav } from "./ConnectWallet";
import { navLinks } from "@/data";
import { ConnectKitButton } from "connectkit";

const Header = () => {
  return (
    <header className="fixed z-[900] w-screen bg-bgDark p-5 flex justify-between items-center">
      <Link href="/">
        <img src="/images/logo.svg" alt="Shadow Tokens" width={300} />
      </Link>

      <nav>
        {navLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="mr-8 font-semibold hover:text-[#9f80ff]"
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <div>
        {/* <ConnectWalletNav /> */}
        <ConnectKitButton theme="retro" />

      </div>
    </header>
  );
};

export default Header;
