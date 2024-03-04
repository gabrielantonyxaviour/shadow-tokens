import React, { useContext, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { UserContext } from "@/app/userContext";
import { Button } from "../ui/button";

const NFT = () => {
  const { NFTs } = useContext(UserContext);
  const [data, setData] = useState(null);
  const { nft } = useParams();
  const router = useRouter();

  function fet() {
    setData(NFTs.find((item) => item.tokenId.toString() == nft));
  }

  useEffect(() => {
    fet();
  }, []);

  return (
    <>
      {data === null ? (
        <p>Loading...</p>
      ) : (
        <>
          {" "}
          <div
            onClick={() => router.back()}
            className="purple-text font-semibold text-2xl pointer"
          >
            <span className="flex items-center">
              {" "}
              <IoMdArrowRoundBack />
              Go Back
            </span>
          </div>
          <div className="bg-dark rounded-lg mt-5 grid grid-cols-2">
            <div>
              <img
                src={data.image}
                className="object-cover w-full h-[400px] rounded-tl-lg"
              />
              <div className="p-5">
                <p className="text-2xl font-semibold leading-purple">{data.name} </p>
                <p>{data.description} </p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xl ">Owner: </p>
              <p>{data.seller}</p>
              <Button className='gradient-secondary'>Add to Vault</Button>
            <Button>Fraction NFT</Button>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default NFT;
