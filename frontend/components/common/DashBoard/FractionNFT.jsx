"use client";
import React, { useContext } from "react";
import { CardComp } from "./Collection";
import { UserContext } from "@/app/userContext";

const FractionNFT = ({ isDashboard = true }) => {
  const { NFTs } = useContext(UserContext);

  return (
    <>
      {isDashboard && (
        <p className="font-semibold text-4xl mb-5">Fractionalized NFTs</p>
      )}
      <div
        className={`grid ${isDashboard ? "grid-cols-3" : "grid-cols-4"} gap-4`}
      >
        {NFTs === null ? (
          <p>loading...</p>
        ) : (
          NFTs.map((nft, index) => (
            <div key={index}>
              <CardComp
                nft={nft}
                isDashboard={isDashboard}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FractionNFT;
