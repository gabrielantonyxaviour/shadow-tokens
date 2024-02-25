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

const data = [
  {
    img: "https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg",
    title: "3D Digital Artwork",
    chain: "Polygon",
    bid: "0.45 ETH",
  },
  {
    img: "https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg",
    title: "3D Digital Artwork",
    chain: "Polygon",
    bid: "0.45 ETH",
  },
  {
    img: "https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg",
    title: "3D Digital Artwork",
    chain: "Polygon",
    bid: "0.45 ETH",
  },
  {
    img: "https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg",
    title: "3D Digital Artwork",
    chain: "Polygon",
    bid: "0.45 ETH",
  },
  {
    img: "https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg",
    title: "3D Digital Artwork",
    chain: "Polygon",
    bid: "0.45 ETH",
  },
  {
    img: "https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg",
    title: "3D Digital Artwork",
    chain: "Polygon",
    bid: "0.45 ETH",
  },
];

const Collection = () => {
  return (
    <>
      {" "}
      <p className="font-semibold text-4xl mb-5">Collection</p>
      <div className=" grid grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index}>
            {" "}
            <CardComp
              img={item.img}
              title={item.title}
              bid={item.bid}
              chain={item.chain}
            />{" "}
          </div>
        ))}
      </div>
    </>
  );
};

export default Collection;

const CardComp = ({ img, title, bid, chain }) => {
  return (
    <Card
      className="bg-[#161833a0] pointer border-0 text-muted-foreground backdrop-blur-sm 
     "
    >
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
        <Button className="gradient ml-5 px-6 font-semibold">Place Bid</Button>
      </CardFooter>
    </Card>
  );
};
