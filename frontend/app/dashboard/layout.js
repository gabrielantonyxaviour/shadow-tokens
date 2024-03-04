"use client";
import React from "react";
import SideBar from "@/components/common/DashBoard/SideBar";

export default function DashBoardLayout({ children }) {

  return (
    <div className="pt-[5rem]">
      <div className="gradient h-[6rem] mb-10"></div>
      <div defaultValue="account" className="grid grid-cols-4 mx-10">
        <SideBar />
        <div className="ml-5 col-span-3">{children}</div>
      </div>
    </div>
  );
}
