import React from "react";
import HolderCard from "./HolderCard";
const Exclusives = ({exclusives}) => {
  return (
    <div className="w-full h-[auto] py-10">
      <div className="text-center pb-10">
        <h2 className="text-5xl  ">HOLDER EXCLUSIVES</h2>
      </div>
      <div className="w-[80%] m-auto flex gap-10 sm:flex-col">
        <HolderCard background={"#FFAA00"} product={exclusives.products.edges[0]} />
        <HolderCard background={"#111111"}product={exclusives.products.edges[1]} />
      </div>
    </div>
  );
};

export default Exclusives;
