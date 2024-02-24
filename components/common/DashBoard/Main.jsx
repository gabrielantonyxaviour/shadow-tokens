import React, { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsCollectionFill } from "react-icons/bs";
import Collection from "./Collection";
import { LuImport } from "react-icons/lu";
import { UserContext } from "@/app/userContext";

const Main = () => {
  const { address } = useContext(UserContext);

  return (
    <Tabs defaultValue="account" className=" grid grid-cols-3 mx-10">
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

      <TabsContent value="account" className="col-span-2 ">
        <div className="ml-5">
          <p className="font-semibold text-4xl mb-5">Collection</p>
          <Collection />
        </div>
      </TabsContent>
      <TabsContent value="import" className="col-span-2">
        Import
      </TabsContent>
    </Tabs>
  );
};

export default Main;
