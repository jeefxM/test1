import React, { useState } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import {
  useAddress,
  ConnectWallet,
  useContract,
  useNFTBalance,
  useTotalCirculatingSupply,
  useOwnedNFTs,
  useClaimIneligibilityReasons,
} from "@thirdweb-dev/react";
import { useMemo } from "react";

const editionDropAddress = "0x05426bf795B403556e0b4F4535a7745aBFf1E3AE";

const Claim = () => {
  const [totalSupply, setTotalSupply] = useState("");
  const address = useAddress();

  const { contract: editionDrop } = useContract(
    editionDropAddress,
    "edition-drop"
  );
  const {
    data: claimIneligibilityReasons,
    isLoading,
    error,
  } = useClaimIneligibilityReasons(
    editionDrop,
    {
      walletAddress: address || "",
      quantity: 1,
    },
    "1"
  );

  // const eligibleCheck = () => {
  //   console.log(claimIneligibilityReasons);
  // };

  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");

  const { data: TotalNftOwned } = useOwnedNFTs(editionDrop, address);

  const { data: totalCirculatingSupply } = useTotalCirculatingSupply(
    editionDrop,
    "0"
  );

  // if (totalCirculatingSupply !== undefined) {
  //   console.log(totalCirculatingSupply.toNumber());
  // }

  const hasClaimedNFT = useMemo(() => {
    if (nftBalance !== undefined) {
      return nftBalance.toNumber();
    }
  }, [nftBalance]);


  return (
    <div className="min-h-screen text-black p-20 pt-40 ">
      <div className="flex flex-row md:flex-col justify-center gap-10 py-20">
        {hasClaimedNFT >= 1 ? (
          <div className="flex items- items-start flex-col justify-center gap-3 text-5xl text-semibold text-[#c20909] md:text-3xl">
            <p className="">Already Claimed Maxium</p>
            <p>amount of NFTs</p>
          </div>
        ) : (
          <div className="flex items- items-start flex-col justify-center gap-3">
              <div  className="toblurred inset-0 absolute left-[40%] top-[50%] bg-[radial-gradient(#9D50EB,#1C93D4)] w-32 h-32 filter blur-3xl  rounded-full mix-blend-multiply  "></div>
          <div className="toblurred left-[50%] top-[50%] inset-0 absolute bg-[radial-gradient(#F5DE42,#BEFA79)] w-32 h-32 filter blur-3xl  rounded-full mix-blend-multiply  "></div>
            <h1 className="dark:text-white text-black  text-3xl ">
              Discover, Collet and Trade <span className="logo font-bold">THIRDMERCH NFTs</span> 
            </h1>
            <h1 className="dark:text-white text-black text-xl">
              Get discounts & exclusive access to products
            </h1>

            {totalCirculatingSupply !== undefined ? (
              <p className="text-black dark:text-white ">Total NFTs Minted: {totalCirculatingSupply.toNumber()}</p>
            ) : (
              ""
            )}
          </div>
        )}

        <div>
          <img src={'https://gateway.ipfscdn.io/ipfs/QmT8CgZhqzQJG99CgavsZCCdAUakNeZVV3oXBcf4nTSATF/0'} alt="nft" className="my-3" />
          {address ? (
            <Web3Button
              contractAddress={editionDropAddress}
              action={(contract) => {
                if (hasClaimedNFT < 1) {
                  contract.erc1155.claim(0, 1);
                }
              }}
              isDisabled={hasClaimedNFT >= 1}
              onSuccess={() => {
                console.log(
                  `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
                );
              }}
              onError={(error) => {
                if (error.message.includes("insufficient funds")) {
                  setError(
                    "You have insufficient funds in your account to execute this transaction."
                  );
                } else {
                  setError("Transaction rejected.");
                }
              }}
            >
              Mint your NFT (FREE)
            </Web3Button>
          ) : (
            <ConnectWallet />
          )}
        </div>
      </div>
      <div className="pt-auto"></div>
    </div>
  );
};

export default Claim;
