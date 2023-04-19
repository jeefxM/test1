import React, { useEffect } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

const HeroSection = () => {

  useEffect(() => {
   const root  = document.documentElement
   root.style.setProperty('--viewport-width', `${window.innerWidth}px`);



  })

  return (
    <div className=" h-[80vh] sm:h-[70vh] relative w-full   " id="slatez">
      <main className="w-[80%] mx-auto py-20 flex justify-center">
        <div className="pt-20 sm:pt-6 relative ">
          <div  className="toblurred inset-0 absolute bg-[radial-gradient(#9D50EB,#1C93D4)] w-32 h-32 filter blur-3xl  rounded-full mix-blend-multiply  "></div>
          <div className="toblurred left-32 inset-0 absolute bg-[radial-gradient(#F5DE42,#BEFA79)] w-32 h-32 filter blur-3xl  rounded-full mix-blend-multiply  "></div>
          <div className="w-full ">
          <h1 className="text-5xl text-black dark:text-white pb-5 font-bold text-center  ">
          THIRDMERCH -  NFTs, 3D Customization, and Personalized Collections
          </h1>
          <div className="w-full justify-center flex">
          <div className="w-[300px]">
          <ConnectWallet className=""/>
          </div>
          </div>
          </div>
        
         
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
