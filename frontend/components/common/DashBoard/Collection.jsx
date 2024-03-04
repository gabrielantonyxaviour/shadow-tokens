"use client";
import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { UserContext } from "@/app/userContext";

const Collection = ({ isDashboard = true }) => {
  const { NFTs } = useContext(UserContext);

  return (
    <>
      {isDashboard && <p className="font-semibold text-4xl mb-5">Collection</p>}
      <div
        className={`grid ${isDashboard ? "grid-cols-3" : "grid-cols-4"} gap-4`}
      >
        {NFTs === null ? (
          <p>loading...</p>
        ) : (
          NFTs.map((item, index) => (
            <div key={index}>
              <CardComp
                id={item.tokenId}
                owner={item.owner}
                img={item.image}
                title={item.name}
                bid={item.price}
                isDashboard={isDashboard}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Collection;

export const CardComp = ({ img, title, bid, id, isDashboard }) => {
  return (
    <Card className="bg-dark pointer border-0 text-muted-foreground backdrop-blur-sm">
      <Link href={`/${isDashboard ? "dashboard" : "explore"}/${id}`}>
        <CardHeader className="overflow-hidden h-[272px]">
          <img
            src={img}
            className="w-full rounded-lg h-full transition object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="leading-purple">{title}</CardTitle>
        </CardContent>
        <Separator className="bg-[#888]" />
      </Link>
      <CardFooter className="mt-4 flex text-sm justify-between">
        <p className="text-xs">{bid} MATIC</p>
        <Button className="gradient ml-5 px-6 font-semibold">
          Add to Vault
        </Button>
      </CardFooter>
    </Card>
  );
};
