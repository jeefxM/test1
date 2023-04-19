import React, { useEffect, useState } from "react";
import {
  Web3Button,
  useActiveClaimCondition,
  useContract,
  useTotalCirculatingSupply,
} from "@thirdweb-dev/react";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";

const editionDropAddress = "0xA14905F7283Af60AD1228EB713F8Ff5f0AfCd0Cf";

const NFTCard = (props) => {
  const [tokenPrice, setTokenPrice] = useState([]);
  const { contract: editionDrop } = useContract(
    editionDropAddress,
    "edition-drop"
  );
  const { data: ActiveClaimCondition, isLoading: loadingConditions } =
    useActiveClaimCondition(
      editionDrop,
      props.TokenId // Token ID required for ERC1155 contracts here.
    );

  // console.log(ActiveClaimCondition);

  const getPrice = async () => {
    if (!loadingConditions) {
      const hexValue = await ActiveClaimCondition.price._hex;
      const bigNumberValue = BigNumber.from(hexValue);
      const decimalValue = bigNumberValue.toString();
      const price = decimalValue / "1000000000000000000";
      setTokenPrice(price);
    }
  };

  const { data: totalCirculatingSupply, isLoading } = useTotalCirculatingSupply(
    editionDrop,
    props.TokenId
  );

  useEffect(() => {
    getPrice();
  }, [ActiveClaimCondition]);

  return (
    <div className="bg-[#6a51fc] sm:max-w-[250px] rounded-2xl p-4 flex flex-col  justify-center">
      <ThirdwebNftMedia metadata={props.NftImage} width={250} height={200} />
      <div className="flex justify-between">
        <p className="font-semibold">{props.CollectionName}</p>
      </div>
      <div className="flex justify-between">
        <p className="font-semibold">{props.Decsription}</p>
      </div>
      <div className="flex justify-between">
        {/* <p>id: </p>
        <p> {props.TokenId}</p> */}
      </div>
      <div className="flex justify-between">
        <p className="text-lg text-[#e7d805]">
          {!loadingConditions ? tokenPrice : ""} BNB
        </p>
      </div>

      <div className="">{props.MintButton}</div>
    </div>
  );
};

export default NFTCard;
