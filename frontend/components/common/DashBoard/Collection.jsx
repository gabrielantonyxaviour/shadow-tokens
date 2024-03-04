// "use client";
import React from "react";
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
import { dummyNFTs } from "@/data";
import { connectContract } from "@/lib/contract";

const Collection = ({ isDashboard = true, ethereum }) => {
  // const [windowEth, setWindowEth] = useState(null);
  // useEffect(() => {
  //   const { ethereum } = window;
  //   setWindowEth(ethereum)
  // }, [windowEth]);


  connectContract(ethereum)

  return (
    <>
      {isDashboard && <p className="font-semibold text-4xl mb-5">Collection</p>}
      <div
        className={`grid ${isDashboard ? "grid-cols-3" : "grid-cols-4"} gap-4`}
      >
        {dummyNFTs.map((item, index) => (
          <div key={index}>
            <CardComp
              id={item.ID}
              img={item.img}
              title={item.title}
              bid={item.bid}
              chain={item.chain}
              isDashboard={isDashboard}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Collection;

const CardComp = ({ img, title, bid, chain, id, isDashboard }) => {
  return (
    <Link href={`/${isDashboard ? "dashboard" : "explore"}/${id}`}>
      <Card className="bg-dark pointer border-0 text-muted-foreground backdrop-blur-sm">
        <CardHeader className="overflow-hidden h-[272px]">
          <img
            src={img}
            className="w-full rounded-lg h-full transition object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{title}</CardTitle>
        </CardContent>
        <Separator className="bg-[#888]" />
        <CardFooter className="mt-4">
          <p>{bid}</p>
          <Button className="gradient ml-5 px-6 font-semibold">
            Add to Vault
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
