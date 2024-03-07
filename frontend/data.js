import { BsCollectionFill } from "react-icons/bs";
import { LuImport } from "react-icons/lu";
import { GoRepoLocked } from "react-icons/go";

export const sidebarLinks = [
  {
    name: "Collection",
    route: "/dashboard",
    icon: <BsCollectionFill />,
  },
  {
    name: "Mint NFT",
    route: "/dashboard/mint",
    icon: <LuImport />,
  },
  {
    name: "Fractionalized NFTs",
    route: "/dashboard/fractionalized-nfts",
    icon: <GoRepoLocked />,
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
