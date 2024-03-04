import { BsCollectionFill } from "react-icons/bs";
import { LuImport } from "react-icons/lu";

export const sidebarLinks = [
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

export const navLinks = [
  {
    title: "Home",
    link: "/",
  },

  {
    title: "Explore",
    link: "/explore",
  },
];
