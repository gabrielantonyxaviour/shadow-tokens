import Link from "next/link";
import React from "react";
import { ConnectWalletNav } from "./ConnectWallet";

const Header = () => {
  return (
    <header className="fixed z-[900] w-screen bg-bgDark p-5 flex justify-between items-center">
      <Link href="/">
        <img src="/images/logo.svg" alt="Shadow Tokens" width={300} />
      </Link>

      {/* <nav>
        <a href="">Explore</a>
        <Link href="/dashboard">Dashboard</Link>
      </nav> */}

      <div>
        <ConnectWalletNav />
      </div>
    </header>
  );
};

export default Header;
