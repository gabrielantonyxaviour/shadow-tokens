import React, { useContext } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Collection from "./Collection";
import { UserContext } from "@/app/userContext";
import SideBar from "./SideBar";

const Main = () => {
  const { address } = useContext(UserContext);

  return (
    <Tabs defaultValue="account" className=" grid grid-cols-3 mx-10">
      <SideBar address={address} />
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
