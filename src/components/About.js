import React from "react";
import Link from "next/link";
import CanvasModel from "@/canvasJeefx";

const About = () => {
  //Animate when visible

  return (
    <div
      className="h-[auto] w-full border-y-2 border-black dark:border-white xl:border-y-0"
      id="about"
    >
      <div className="w-[80%] mx-auto flex py-10 gap-4 xl:flex-col">
        <div className="text h-full  w-1/2 xl:w-full">
          <div className="header border-2 border-black dark:border-white">
            <h1 className="text-5xl p-5 text-center">ABOUT US</h1>
          </div>
          <div className="text text-3xl p-10 border-x-2 border-b-2 border-black dark:border-white leading-10 sm:text-xl">
            <p>
              ThirdMerch is a unique blend of the web3 sphere and traditional
              ecommerce, where we offer store owners and customers the
              opportunity to create exclusive collections using NFTs and
              personalize their shopping experience with AI-powered 3D
              merchandise customization. We want to build stronger relationships
              between you and your favorite brands by providing a more
              personalized experience and increasing engagement through
              innovative features{" "}
            </p>
          </div>
        </div>
        <div className="image h-[400px] sm:h-[500px] sm:mb-44  w-1/2  xl:w-full text-center relative">
          <h2 className="text-4xl font-bold sm:absolute sm:text-center sm:top-12 ">
            CREATE YOUR OWN EXCLUSIVE SHIRT
          </h2>
          {/* <CanvasModel /> */}

          <Link href="/configurator">
            <button className="bg-[#FFAA00] color-white p-3 text-white rounded-md border-b-4 border-2 border-black dark:border-white hover:bg-hover active:bg-buttonsecond w-52">
              CONFIGURE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
