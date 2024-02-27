"use client";
import React, { useContext } from "react";
import SideBar from "@/components/common/DashBoard/SideBar";
import { UserContext } from "../userContext";

export default function DashBoardLayout({ children }) {
  const { address } = useContext(UserContext);

  return (
    <div className="pt-[5rem]">
      <div className="gradient h-[6rem] mb-10"></div>
      <div defaultValue="account" className=" grid grid-cols-4 mx-10">
        <SideBar address={address} />
        <div className="ml-5 col-span-3">{children}</div>
      </div>
    </div>
  );
}
