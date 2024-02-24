import React from "react";
import { Button } from "../ui/button";
import { ConnectWalletModal } from "./ConnectWallet";

const Hero = () => {
  return (
    <div className="pt-[16rem] flex flex-col items-center text-center">
      <h1 className="mt-10 text-7xl font-bold">Secure and Store Digital Art</h1>
      <p className="mt-10 text-2xl">
        Shadow tokens is a secret vault for safe keeping private digital tokens{" "}
        <br />
        on the Secret Network
      </p>

      <ConnectWalletModal/>
    </div>
  );
};

export default Hero;
