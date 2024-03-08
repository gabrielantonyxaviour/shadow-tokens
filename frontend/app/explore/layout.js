"use client";
import React from "react";

export default function ExploreLayout({ children }) {
  return (
    <div className="pt-[5rem] mb-20">
      <div className="gradient h-[6rem] mb-10"></div>
      <div className="px-10 mx-10">{children}</div>
    </div>
  );
}
