import Link from "next/link";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from "next/navigation";
import { dummyNFTs } from "@/data";

const NFT = () => {
  const { nft } = useParams();
  const data = dummyNFTs.find((item) => item.ID === nft);

  return (
    <>
      <Link href={"/dashboard"} className="purple-text font-semibold text-2xl">
        <span className="flex items-center">
          {" "}
          <IoMdArrowRoundBack />
          Go Back
        </span>
      </Link>
      <div className="bg-dark rounded-lg mt-5 grid grid-cols-2">
        <div>
          <img
            src={data.img}
            className="object-cover w-full h-[400px] rounded-tl-lg"
          />
          <div className="p-5">
            <p className="text-2xl font-semibold">{data.title} </p>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="p-4">
          <p>Creator</p>
          <p>Owner</p>
        </div>
      </div>
    </>
  );
};

export default NFT;
