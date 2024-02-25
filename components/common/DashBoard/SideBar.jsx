import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsCollectionFill } from "react-icons/bs";
import { LuImport } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = ({ address }) => {
  const currentPath = usePathname();
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    setPath(currentPath);
  }, [path, currentPath]);

  return (
    <div className="flex flex-col items-center bg-[#8173c131] p-10 h-[500px]">
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

      {data.map((item, index) => (
        <Link key={index} href={item.route} className=" mb-4">
          <div className={`sidebar-tab ${path === item.route && "active"}`}>
            {item.icon} <p className="ml-3">{item.name} </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;

const data = [
  {
    name: "Collection",
    route: "/dashboard",
    icon: <BsCollectionFill />,
  },
  {
    name: "Create NFT",
    route: "/dashboard/create",
    icon: <LuImport />,
  },
];
