"use client";
import DashBoard from "@/components/common/DashBoard";
import Header from "@/components/common/Header";
import React from "react";

const Page = () => {
  return (
    <div>
      <Header />
      <DashBoard />
      <div className="shape"></div>
        <div className="shape right"></div>
        <div className="shape s3 right"></div>

    </div>
  );
};

export default Page;
