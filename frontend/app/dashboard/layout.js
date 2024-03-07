"use client";
import React from "react";
import SideBar from "@/components/common/DashBoard/SideBar";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";

export default function DashBoardLayout({ children }) {
  const { isDisconnected } = useAccount();

  if (isDisconnected) {
    redirect("/");
  }

  return (
    <div className="pt-[5rem]">
      <div className="gradient h-[6rem] mb-10"></div>
      <div defaultValue="account" className="grid grid-cols-4 mx-10">
        <SideBar />
        <div className="ml-5 col-span-3 mb-16">{children}</div>
      </div>
    </div>
  );
}
