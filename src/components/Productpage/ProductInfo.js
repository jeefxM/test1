import React, { useEffect, useMemo, useState } from "react";
import { User, Collapse, Select } from "@geist-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatCurrency } from "@/utils/CurrencyFormaterJeefx";
import { useShoppingCart } from "@/context/ShoppingCartProviderJeefx";
import { useCart, useShopifyCookies } from "@shopify/hydrogen-react";
import {
  Tokengate,

} from "@shopify/tokengate";
import "@shopify/tokengate/styles.css";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useNFTs,
  useNFTBalance,
} from "@thirdweb-dev/react";
import Discount from "./Discount";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/collapse";
import uuid4 from "uuid4"
import { createBasicDiscount } from "@/utils/shopifyadminJeefx";


const ProductInfo = ({ title, vendor,  id, variants,   gates }) => {

  const [requirements, setRequirements] = useState()
  const [reaction, setReaction] = useState()
  const [contractAddress , setContractAddress] = useState()
  useEffect(() => {
    if(gates[0]){
      const requirements  = JSON.parse( gates[0]?.configuration.requirements?.value)
      const reaction  = JSON.parse( gates[0]?.configuration.reaction?.value)
     setRequirements(requirements)
     setReaction(reaction)
     const contractAddress = requirements.conditions[0].contractAddress
     setContractAddress(contractAddress)
    }
  },[])  

  
  const allConditions = gates?.map(item => {
    const itemInObj = JSON.parse(item.configuration.requirements.value)
    return itemInObj.conditions[0]
  }

    )


  
 



  
  const address = useAddress();
  const editionDropAddress = "0x05426bf795B403556e0b4F4535a7745aBFf1E3AE";
  const [quantity, changeQuantity] = useState(1);
  const [isHolder, setIsHolder] = useState(false);

  const { contract: editionDrop } = useContract(
    editionDropAddress,
    "edition-drop"
  );
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");


  const hasClaimedNFT = useMemo(() => {
    return nftBalance;
    setIsHolder(nftBalance);
  }, [nftBalance]);

  const conditions = [
    {
      name: "smoltedy",
      contractAddress: "0x05426bf795B403556e0b4F4535a7745aBFf1E3AE",
      imageUrl:
        "https://gateway.ipfscdn.io/ipfs/QmT8CgZhqzQJG99CgavsZCCdAUakNeZVV3oXBcf4nTSATF/0",
    },
  ];

  const getMockReq = {
    conditions: conditions,
    logic: "ANY",
  };

  const getMockReaction = () => ({
    type: "exclusive_access",
  });

  const getMockUnlockingTokens = [
    {
      contractAddress: "0x05426bf795B403556e0b4F4535a7745aBFf1E3AE",
      collectionName: "ThirdMerch",
      imageUrl:
        "https://gateway.ipfscdn.io/ipfs/QmT8CgZhqzQJG99CgavsZCCdAUakNeZVV3oXBcf4nTSATF/0",
      name: "wsup",
    },
   
  ];

  const { data: nfts, isLoading } = useNFTs(editionDrop);
  
//   const testFunc = ( )=> {
//     if(!isLoading){
//       setIsHolder(true);
//     }
//   }
// console.log(isHolder)
//   useEffect(() => {
//     testFunc()
    

//   }, [nfts])



  const price = quantity * variants?.node.price.amount;

  const increment = () => {
    changeQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity !== 1) {
      changeQuantity(quantity - 1);
    }
  };

  //Select
  const [selected, changeSelected] = useState("");

  const { openCart } = useShoppingCart();

  const selectHandler = (e) => {
    variants?.map((item) => {
      if (item.node.id === e) {
        changeSelected({ title: item.node.title, id: item.node.id });
      }
    });
  };
  useShopifyCookies({ hasUserConsent: false });

  const notify = () => toast("Please select size");

  const { linesAdd, buyerIdentity, buyerIdentityUpdate, lines, cart } =
    useCart();

  const handleCart = () => {
    if (!selected) {
      notify();
    } else {
      //add to ShopifyCart

      linesAdd({
        merchandiseId: selected.id,
        quantity: quantity,
      });
        openCart(true)
 
      
    }
  };

//exclusive


  const {checkoutUrl, discountCodesUpdate,discountCodes 	} = useCart()

  const [discountCode, setDiscountCode] = useState()
  const applyDiscount = async () => {

    const now = new Date()
    const randomid = uuid4()
    const toISO = now.toISOString() 
  
      const discountApply = await createBasicDiscount( {basicCodeDiscount:{
          title:"test",
          customerSelection:{
            all:true
          },
          startsAt:toISO,
          usageLimit:1,
          customerGets:{
              items:{
                  products:{
                    productsToAdd:[id]
                  }
                },
            value:{
              percentage: 0.15,
            }
          },
          code:randomid
        }})
        setDiscountCode(randomid)
  }

  const { data, isLoading:nftBalanceLoading} = useNFTBalance(
    editionDrop,
   address,
    contractAddress,
  );
  const [isTokenGateLocked, setIsTokenGateLocked] = useState(true)
  const [isLogged, setLogState] = useState(false)

  const checkNftBalance = () => {
    if(!nftBalanceLoading && address){
      if(data.toNumber()){
        setIsTokenGateLocked(false)
        if(isLogged){
          applyDiscount()
        }
      }
    }
  }


  useEffect(() => {
    checkNftBalance()

  }, [nftBalanceLoading,isLogged])


  return (
    <div className="product-info w-1/3 flex flex-col pl-10 sm:pl-0 sm:w-full sm:pt-5 text-black dark:text-white ">
      <ToastContainer />
      <div className="header">
        <h1 className="sm:text-2xl font-bold text-5xl ">{title}</h1>
      </div>
      <div className="collapse w-full h-auto text-black">

      
      </div>
      <div className="vendor w-full pt-5">
        <User
          src="https://api.dicebear.com/5.x/pixel-art/svg?seed=GugaGaprindashvili"
          name={"Guga Gaprindashvili"}
          style={{ fontWeight: "bold", backgroundColor: "purple" }}
          scale={2}
        >
          <User.Link href="https://www.instagram.com/pataratedi/">
            @{vendor}
          </User.Link>
        </User>
      </div>
      <div className="price pt-5">
        <p className="text-3xl font-bold text-[#13EA5B]">
          {formatCurrency(price)}
        </p>
      </div>
      <div className="quantity pt-5 flex">
        <div className="text pr-3">
          <p className="text-lg font-bold">Quantity</p>
        </div>
        <button
          className="w-10 h-10 border-black dark:border-white text-white border-2 text-3xl font-bold text-center rounded-md bg-button"
          onClick={increment}
        >
          +
        </button>
        <div className="quantitystate px-10 font-bold text-xl">{quantity}</div>

        <button
          className="w-10 h-10 border-black dark:border-white text-white border-2 text-3xl font-bold text-center rounded-md bg-button"
          onClick={decrement}
        >
          -
        </button>
      </div>
      <div className="pt-5 flex">
        
        <p className="text-2xl pt-2 pr-3 font-bold ">Size</p>
        <Select
          onChange={selectHandler}
          style={{
            padding: "25px",
            border: "2px solid #781EDB",
            width: "100%",
          }}
        >
          {variants?.map((info) => {
            return (
              <Select.Option key={info.node.title} value={info.node.id}>
                {info.node.title}
              </Select.Option>
            );
          })}
        </Select>
      </div>

      <div className="py-5 ">

          <div className="">
            <button
              className="bg-buttonsecond color-white p-3 text-white font-bold text-3xl rounded-md border-b-4 border-2 border-black dark:border-white hover:bg-hover active:bg-buttonsecond w-full disabled:cursor-not-allowed"
              onClick={handleCart}
            >
              Add To Cart
            </button>
          
          </div>
         
        
        
   { nfts ? 
   <>
   {!isTokenGateLocked ?
   <div className="h-[50px] mt-4 flex items-center  flex-col justify-center py-5 border-2 border-black dark:border-white">
   <span className="text-red">Discount Code:</span> <p className="font-bold"> {discountCode}</p></div> : ""}
    
          <div className="mt-5">
            <Tokengate
              isConnected={Boolean(address)}

              connectButton={<Discount isLogged={isLogged} setLogState={setLogState} />}
              isLoading={false}
              requirements={requirements}

              reaction={reaction}
              isLocked={isTokenGateLocked}
              unlockingTokens={[allConditions]}

             
            />
          </div>
          </>
   
  : "" }
      
    

    
      </div>
      
    </div>
  );
};

export default ProductInfo;
