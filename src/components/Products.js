import React from "react";
import { User } from "@geist-ui/core";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/CurrencyFormaterJeefx";

const Products = ({ homepageCollection }) => {

  
  const products = homepageCollection.products.edges.map((item) => {
    return (
      <motion.div
        key={item.node.title}
        className="example-grid  border-2 border-black dark:border-white max-h-full relative"
      >
        <div className=" p-12 sm:p-10 ">
          <Image
            width={400}
            height={300}
            src={item.node.featuredImage.url}
            className="h-full hover:bg-main  object-cover pt-2 "
            alt={`${item.node.title} | ThirdMerch` }
          />
          <div className='viewbtn py-2 '>
          <Link href={`/products/${item.node.id.replace('gid://shopify/Product/', '')}` }> <div className="bg-red rounded-md w-auto cursor-pointer whitespace-nowrap border-black border-2 text-sm text-center font-bold text-white hover:bg-hover "> BUY NOW</div> </Link>
          </div>
        </div>{" "}
        <div className="info bg-white w-20 h-10 absolute top-3 left-1 text-center"></div>
        <div className="authorinfo bg-white w-[auto] h-[auto] absolute bottom-0 left-0 text-center">
          <User
            src="https://api.dicebear.com/5.x/pixel-art/svg?seed=GugaGaprindashvili"
            name={"Guga Gaprindashvili"}
          >
            <User.Link href="https://www.instagram.com/pataratedi/">
              @{item.node.vendor}
            </User.Link>
          </User>
        </div>
        <div className="limitededtion absolute top-2 left-2  w-20 h-10 bg-button text-white">
          <p className="text-2xl">{formatCurrency(item.node.variants.edges[0].node.price.amount)}</p>
        </div>
        <div className="absolute top-2 sm:top-4 right-2 bg-buttonsecond rounded-xl h-10 text-center font-bold flex items-center">
          <p className="p-3">HOLDERS DISCOUNT</p>
        </div>
      </motion.div>
    );
  });

  
  return (
    <div className="h-[auto] w-full">
      <div className="grid grid-rows-2 grid-cols-4 sm:grid-cols-1 sm:grid-rows-4 h-full   ">
        <div className="TextGrid col-span-2 sm:col-span-1 border-x-2 border-b-2 sm:border-t-2 border-black  dark:border-white h-full w-full">
          <div className="header flex items-center justify-center flex-col h-full gap-4">
            <h2 className="text-5xl">FEATURED COLLECTION</h2>
            <button className="bg-button color-white p-3 text-white rounded-md border-b-4 border-2 border-black dark:border-white hover:bg-hover active:bg-buttonsecond w-52">
              VIEW FULL COLLECTION
            </button>
          </div>
        </div>
        {products}
      </div>
    </div>
  );
};

export default Products;
