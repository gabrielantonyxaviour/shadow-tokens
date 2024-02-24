import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsCollectionFill } from "react-icons/bs";
import { LuImport } from "react-icons/lu";

const SideBar = ({address}) => {
  return (
    <TabsList className="flex-col bg-[#8173c131] p-10 h-[500px]">
      <Avatar className="w-[150px] h-[150px]">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="text-white text-center mb-6">
        <p className=" font-bold text-xl mt-4 my-2">Francisco Maia</p>
        <p className="font-semibold text-sm">{address} </p>

        <p className="text-[#e5e5e5] text-sm my-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
          repellendus facere beatae
        </p>
      </div>

      <TabsTrigger value="account" className="sidebar-tab mb-4">
        <BsCollectionFill /> <p className="ml-3">Collection</p>
      </TabsTrigger>
      <TabsTrigger value="import" className="sidebar-tab mb-4">
        <LuImport /> <p className="ml-3">Import NFT</p>
      </TabsTrigger>
    </TabsList>
  );
};

export default SideBar;
