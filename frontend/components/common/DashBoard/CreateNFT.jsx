import { Button } from "@/components/ui/button";
import React from "react";

const CreateNFT = () => {
  return (
    <div className="grid grid-cols-3">
      <div className={`col-span-2 bg-dark rounded p-10`}>
        <form>
          <div className="flex flex-col mb-5">
            <label>NFT Name</label>
            <input />
          </div>
          <div className="flex flex-col mb-5">
            <label>NFT Description</label>
            <textarea />
          </div>
          <div className="flex flex-col mb-5">
            <label>NFT Price in MATIC</label>
            <input type="number" />
          </div>

          <div className="flex flex-col mb-5">
            <label>Upload Image</label>
            <input type={"file"} />
          </div>
          <Button className='gradient'>Import NFT</Button>
        </form>
      </div>

      <div></div>
    </div>
  );
};

export default CreateNFT;
