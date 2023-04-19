import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="h-[35vh] sm:h-[30vh] border-t-2 border-black dark:border-white flex justify-between">
      <div className=" dark:border-white w-1/6 px-10 sm:px-5 py-5 sm:w-3/6">
        <Link href='/'><h2 className="logo text-4xl font-bold mb-4 sm:text-2xl">THIRDMERCH</h2></Link>
        <p className="font-semibold overflow-wrap">contact@thirdmerch.com</p>
      </div>
      <div className="border-l-2 border-black dark:border-white w-2/6 sm:w-3/6 px-10 py-5">
        <ul className="text-xl font-bold">
         <Link href='#about'><li className="my-3">ABOUT US</li></Link>
         <Link href='/claim'> <li className="my-3">MINT NFT</li></Link>
         <Link href='/createstore'> <li className="my-3">CREATE STORE</li></Link>        
         <Link href='/configurator'> <li className="my-3">CONFIGURE</li></Link>          

        </ul>
      </div>
    </div>
  );
};

export default Footer;
