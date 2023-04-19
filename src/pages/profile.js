import React, { useEffect, useMemo, useState } from "react";
import {  getSession } from "next-auth/react";
import Image from "next/image";
import { Input } from "@/components/ui/inputJeefx";
import {  Progress, useTheme, Tabs } from "@geist-ui/core";
import { ConnectWallet } from "@thirdweb-dev/react";
import NFTSvg from "../../public/nft.svg";
import MySvg from "../../public/svg1.svg";
import uuid4 from "uuid4";
import Discounts from "@/components/profile/DiscountsJeefx";
import DiscountsTable from "@/components/profile/DiscountsTableJeefx";
import {
  useAddress,
  useContract,
  useOwnedNFTs,
  useNFTBalance,
} from "@thirdweb-dev/react";
import { Modal , useModal, Select} from "@geist-ui/core";
import { Button } from "@/components/ui/buttonJeefx";
import UserStores from "@/components/profile/UserStoresJeefx";
import { getCollection } from "@/utils/shopifyJeefx";
import { getAllCreatedGates } from "@/utils/shopifyadminJeefx";
import {  PrismaClient } from "@prisma/client";
import { saveCustomerInfo } from '@/utils/database/updateuserJeefx';
// const createShopifyCustomerAddress = async(info) => {
//   const res = await createCustomerAddress({
//     customerAccessToken: info.token,
//     address: {
//       address1: info.address,
//       city: info.city,
//       country: info.country,
//       firstName: info.firstName,
//       lastName: info.lastName,
//       phone: info.phone,
//       zip: info.zip
//     }
//   })
// }



const Profile = ({ client, avatar, changeAvatar, user, storeInfo, storeProducts, allGates }) => {


  //address info
  const address = useAddress();
  const editionDropAddress = "0x05426bf795B403556e0b4F4535a7745aBFf1E3AE";
  const { contract: editionDrop } = useContract(
    editionDropAddress,
    "edition-drop"
  );

  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");

  const hasClaimedNFT = useMemo(() => {
    if (nftBalance !== undefined) {
      return nftBalance.toNumber();
    }
  }, [nftBalance]);


  const theme = useTheme();
  const colors = {
    20: theme.palette.error,
    40: theme.palette.warning,
    60: theme.palette.success,
    80: "#03976B",
    100: "#008000",
  };

  //save buyer info
  const [buyerIdentity, setBuyerIdentity] = useState(user);
  useEffect(() => {
    setBuyerIdentity(user);
  }, [user]);

  // useEffect(() => {
  //   if(!user.token){
  //   const updateAccessToken = async () => {

  //     const currentTime = new Date().toISOString();
  //     if (buyerIdentity.expiresAt > currentTime) {
  //       return;
  //     }
  //     const access = await createAccessToken({input:{
  //       email: user.email,
  //       password: user.id
  //     }})

  //     const data = access.data.customerAccessTokenCreate.customerAccessToken.accessToken
  //     const expireDate = access.data.customerAccessTokenCreate.customerAccessToken.expiresAt

  //     setBuyerIdentity((prevUser) => ({...prevUser, token: data, expiresAt: expireDate}))

  //   }
  //   updateAccessToken()
  // }
  // }, [])

    //Update * save avatars

  useEffect(() => {
    changeAvatar(
      `https://api.dicebear.com/5.x/pixel-art/svg?seed=${buyerIdentity?.username}`
    );
  }, [buyerIdentity]);


  const setIdentity = async (e) => {
    const value = e.target.value
    const field = e.target.id


    setBuyerIdentity((prevState) => ({
      ...prevState,
      avatar: avatar,
      [field] : value

     
    }));
  };
  
  const [storeData, setStoreData] = useState(storeInfo || undefined)
  const [createOrMain, setCreateOrMain] = useState('main')



  
  const [gatesState, setGatesState] = useState(allGates?.data?.gateConfigurations.nodes)

  return (
    <main>
      <div className="w-full min-h-screen  ">
        <div className="w-[80%] m-auto mt-12  dark:border-white">
          <div className="w-full flex pic sm:flex-col">
            <div className="img">
              <img src={avatar} width={300} height={300} alt="test" />
              <div className="flex flex-col my-3 gap-4">
                <Input
                  placeholder="Avatar Name"
                  onChange={(e) => {
                   
                    setIdentity(e);
                  }}
                  id={"username"}
                  className="dark:text-black"
                 
                />
                 <button
                  className="bg-button color-white p-3 text-white  rounded-md border-b-4 border-black hover:bg-hover active:bg-buttonsecond"
                  onClick={() => saveCustomerInfo(buyerIdentity)}
                >
                  Save
                </button>
              </div>
              <div className="achievements & followers">
                <div className="border-b-2 border-black dark:border-white ">
               <span className="py-2">0 follower</span> <span className="py-2">5 Following</span>
               </div>
               <div className="pt-3">
                <h4 className="text-2xl">Achievements</h4>
                <ul>
                  <li>
                  <Image src={NFTSvg} alt="SVG" />


                  </li>
                </ul>
               </div>
            </div>
            </div>
          
            <div className="user p-5 flex flex-col w-full">
              <div className="welcome">
                <h2 className="uppercase text-5xl">
                  Welcome, {buyerIdentity?.username || client.user.name}
                </h2>
              </div>
              <div className="py-2">
                <Tabs initialValue="1" type="single" collapsible='true' >
                 
                <Tabs.Item key={'Stores'} label="Stores" value="1" className="dark:text-white"> 
                <UserStores storeInfo={storeData} setStoreData={setStoreData} user={user} />
                              
</Tabs.Item>
                      
                    
<Tabs.Item label="Challenges" value="w" key={'Challenges'}>                    <div className="challenge-1 flex flex-wrap">
                        <div>
                          <Image src={MySvg} alt="SVG" />
                        </div>
                        <div className="">
                          {" "}
                          <h3 className="text-2xl px-3 w-full">
                            Buy Item
                          </h3>
                          <h3 className="text-md px-3 w-full ">0% completed</h3>
                        </div>
                        <div className="w-[90%] pt-2">
                          <Progress value={0} max={100} colors={colors} />
                        </div>
                      </div>

                      <div className="challenge-1 flex flex-wrap pt-5">
                        <div>
                          <Image src={NFTSvg} alt="SVG" />
                        </div>
                        <div className="">
                          {" "}
                          <h3 className="text-2xl px-3 w-full">
                            Claim ThirdMerch NFT
                          </h3>
                          <h3 className="text-md px-3 w-full ">
                            {hasClaimedNFT > 0 ? (
                              <p>100% completed</p>
                            ) : (
                              <p>0% completed</p>
                            )}
                          </h3>
                        </div>
                        <div className="w-[90%] pt-2">
                          {hasClaimedNFT > 0 ? (
                            <Progress value={100} max={100} colors={colors} />
                          ) : (
                            <Progress value={0} max={0} colors={colors} />
                          )}
                        </div>
                      </div>
</Tabs.Item>
<Tabs.Item label="Wallets" key={"Wallets"} value="3" className="dark:text-white">                      <ConnectWallet className="max-w-[300px]" />
</Tabs.Item>

<Tabs.Item label='Discounts' keys={'Discounts'}> 
<div className="my-5">
<Button variant='outline' onClick={() => setCreateOrMain(createOrMain ==='main' ?'gate' :'main')}>{createOrMain === 'main' ?'Create TokenGate' : "<" }</Button>
</div>
{createOrMain === 'main' ? <DiscountsTable allGates={allGates} setGatesState={setGatesState} gatesState={gatesState} /> :   <Discounts setGatesState={setGatesState} gatesState={gatesState} storeProducts={storeProducts} storeInfo={storeInfo} setPage={setCreateOrMain} />
}
  
</Tabs.Item>

                  
                </Tabs>
              </div>
              <div className="py-3">
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const prisma = new PrismaClient()
  const client = await getSession(context);
  // console.log(client)
  // if (!client) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //     },
  //   };
  // }

  console.log(client)



  // const user = await prisma.user.findUnique({
  //   where:{
  //     email: client.user.email
  //   }
  // })

  // const storeInfo = await prisma.store.findMany({
  //   where: {
  //     user: {
  //       some: {
  //         id: user.id
  //       }
  //     }
  //   }
  // })


  // const storeProducts = await getCollection(storeInfo[0]?.id, 100)
  // const allGates = await getAllCreatedGates(storeInfo[0]?.id)




    return {
      props: { client, user:[],storeInfo:[], storeProducts:[], allGates:[] },
    };
};

export default Profile;
