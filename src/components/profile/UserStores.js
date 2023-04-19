import React, { useEffect, useState } from "react";
import { Modal, Select, Popover } from "@geist-ui/core";
import { Input } from "../ui/input";
import { createStore } from "@/utils/database/createstoreJeefx";
import { FaTrash } from "react-icons/fa";
import { deleteStore } from "@/utils/database/removestoreJeefx";
import { createCollection } from "@/utils/shopifyadminJeefx";
import {
  ConnectWallet,
  useNFTBalance,
  useContract,
  useAddress,
  useNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import Link from "next/link";
import NFTCard from "../ui/NFTCard";

const editionDropAddress = "0xA14905F7283Af60AD1228EB713F8Ff5f0AfCd0Cf";

const UserStores = ({ storeInfo, user, setStoreData }) => {
  const [store, setStore] = useState("");
  const [storeError, setStoreError] = useState("");
  const address = useAddress();
  const { contract: editionDrop } = useContract(
    editionDropAddress,
    "edition-drop"
  );

  const { data: nftBalance, isLoading: nftBalanceLoading } = useNFTBalance(
    editionDrop,
    address,
    0
  );

  const { data: nfts, isLoading: nftsLoading } = useNFTs(editionDrop);

  if (!nftsLoading) {
    console.log(nfts);
  }

  if (!nftBalanceLoading) {
    console.log(nftBalance.toNumber());
  }
  // const handler = val => {
  //   setStore((pervState) => ({
  //     ...pervState, category: val
  //   }))
  //}
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const saveStoreInfo = (e) => {
    const field = e.target.id;
    const value = e.target.value;

    setStore((prevState) => ({
      ...prevState,
      [field]: value,
      user: user.id,
      createdDate: `${day}/${month}/${year}`,
    }));
  };

  const [modalState, setModalState] = useState(false);
  const closeHandler = () => setModalState(false);

  const createCollectionInShopify = async () => {
    const res = await createStore(store);
    if (res.status === 200) {
      setModalState(false);
    } else {
      setStoreError("Store with that name already exists");
    }
  };

  const [storeId, setStoreId] = useState();

  const popoverContent = () => (
    <div className="px-3">
      <h2
        className="text-red cursor-pointer"
        onClick={() => deleteStoreFromPage()}
      >
        Delete
      </h2>
    </div>
  );

  const deleteStoreFromPage = () => {
    const filteredStores = storeInfo.filter((item) => item.id != storeId);
    setStoreData(filteredStores);
    deleteStore(storeId);
  };

  console.log(modalState);

  return (
    <div className="flex gap-4">
      {storeInfo?.map((store) => {
        return (
          <div
            key={store.id}
            className="store-1 border-2  rounded-md border-main dark:border-white w-1/4 h-20 flex justify-center items-center text-xl cursor-pointer hover:text-hover relative"
          >
            {" "}
            <Link href={`/shop/${store.name}`}>
              <button> {store.name}</button>{" "}
            </Link>
            <div
              className="absolute right-2 bottom-2"
              onClick={() => setStoreId(store.id)}
            >
              {" "}
              <Popover content={popoverContent}>...</Popover>
            </div>
          </div>
        );
      })}

      {address ? (
        <div
          onClick={() => setModalState(true)}
          className="store-1 border-2 rounded-md border-main dark:border-white w-1/4 h-20 flex justify-center items-center text-5xl cursor-pointer hover:text-hover"
        >
          <button> +</button>

          <Modal visible={modalState} onClose={closeHandler}>
            {!nftBalanceLoading && nftBalance.toNumber() > 0 ? (
              <div>
                <Modal.Title>Create Store</Modal.Title>
                <span className="text-red"> {storeError}</span>
                <div>
                  <Input
                    type="text"
                    name="storename"
                    id="name"
                    placeholder="Store Name"
                    className="my-3"
                    onChange={(e) => saveStoreInfo(e)}
                  />

                  <Input
                    type="text"
                    name="description"
                    placeholder="Little Description"
                    className="my-3"
                    onChange={(e) => saveStoreInfo(e)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <Modal.Title>You haven`t claimed Creator NFT !</Modal.Title>
                <p>
                  To join the creator community you have to mint creator NFT
                </p>
                <div className="px-10">
                  {!nftsLoading && (
                    <NFTCard
                      NftImage={nfts[3].metadata}
                      CollectionName={nfts[1].metadata.name}
                      Decsription={nfts[1].metadata.description}
                      TokenId={nfts[1].metadata.id}
                      MintButton={
                        <Web3Button
                          contractAddress={editionDropAddress}
                          accentColor="#a4fc51"
                          action={(contract) => {
                            contract.erc1155.claim(1, 1);
                          }}
                        >
                          Mint Creator NFT
                        </Web3Button>
                      }
                    ></NFTCard>
                  )}
                </div>
              </div>
            )}

            <Modal.Action onClick={() => setModalState(false)}>
              Cancel
            </Modal.Action>
            {!nftBalanceLoading && nftBalance.toNumber() > 1 && (
              <Modal.Action onClick={() => createCollectionInShopify()}>
                Create
              </Modal.Action>
            )}
          </Modal>
        </div>
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
};

export default UserStores;
