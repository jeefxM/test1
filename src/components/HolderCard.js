import React from "react";
import Link from "next/link";

const HolderCard = ({ background, product }) => {
  return (
    <div
      className={`border-2 border-black dark:border-white w-1/2 h-full sm:w-full p-10 flex flex-col  `}
      style={{ backgroundColor: background }}
    >
      <div className="img w-full h-3/4">
        <img
          src={product.node.featuredImage.url}
          className="border-2 border-black dark:border-white"
          alt="tes"
        />
      </div>
      <div className="text text-center pt-2">
        <h2 className="text-4xl text-white">{product.node.title}</h2>
      </div>
      <div className="button flex w-full justify-center pt-4">
        <Link href={`products${product.node.id.replace("gid://shopify/Product", "")}` }>
        <button className="bg-red color-white p-3 text-white rounded-md border-b-4 border-2 border-white hover:bg-hover active:bg-buttonsecond w-52">
          VIEW
        </button>
        </Link>
      </div>
    </div>
  );
};

export default HolderCard;
