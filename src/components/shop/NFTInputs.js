import React from "react";
import { Input } from "../ui/input";

const NFTInputs = (props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="">
        <div className="">
          {/* <p className="text-black mb-8">
            Fill out the following fields to create your NFT collection.
          </p> */}

          <div className="flex flex-wrap gap-4">
            <div className="mt-6">
              <label
                htmlFor="image-upload"
                className="bg-[#260aa0] mt-5 hover:bg-hover text-white font-bold py-2 px-4 rounded "
              >
                Upload Image
              </label>

              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={props.handleImageChange}
              />
            </div>
            <div className="flex items-center w-full">
              <span className="w-28  text-gray-600">Name:</span>
              <Input
                type="text"
                id="collectionName"
                placeholder="Enter a name for your collection"
                className="flex-1 text-black"
                onChange={props.handleChange}
              />
            </div>
            <div className="flex items-center w-full">
              <span className="w-28 text-gray-600">Description:</span>
              <Input
                type="text"
                id="description"
                placeholder="Enter a description for your collection"
                className="flex-1 text-black"
                onChange={props.handleChange}
              />
            </div>
            <div className="flex items-center w-full">
              <span className="w-28 text-gray-600">Max Supply:</span>
              <Input
                type="number"
                id="maxClaimableSupply"
                placeholder="Enter the maximum supply of NFTs"
                className="flex-1 text-black"
                onChange={props.handleChange}
              />
            </div>
            <div className="flex items-center w-full">
              <span className="w-28 text-gray-600">Max Per Wallet:</span>
              <Input
                type="number"
                id="maxClaimablePerWallet"
                placeholder="Enter the maximum number of NFTs per wallet"
                className="flex-1 text-black"
                onChange={props.handleChange}
              />
            </div>
            <div className="flex items-center w-full">
              <span className="w-28 text-gray-600">Price:</span>
              <Input
                type="number"
                id="price"
                placeholder="Enter the price of each NFT in BNB"
                className="flex-1 text-black"
                onChange={props.handleChange}
              />
            </div>
          </div>

          {/* <button
            className="bg-[#FFAA00] color-white p-3  text-white rounded-md border-b-4 border-2 border-black dark:border-white hover:bg-hover active:bg-buttonsecond mt-5"
            onClick={props.handleContinue}
          >
            Create Collection
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default NFTInputs;
