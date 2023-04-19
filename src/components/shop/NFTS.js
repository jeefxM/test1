import { Modal } from "@geist-ui/core";
import NFTInputs from "./NFTInputs";
import React, { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useNFTBalance,
  useClaimIneligibilityReasons,
  useNFTs,
  ThirdwebNftMedia,
  useOwnedNFTs,
  Web3Button,
  useContractWrite,
  useNFT,
  useStorageUpload,
  MediaRenderer,
  useActiveClaimCondition,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import MaxUint256 from "@ethersproject/constants";
import NFTCard from "../ui/NFTCard";
import LottieLoading from "../../../public/LottieLoading.json";
import LottieSuccess from "../../../public/LottieSuccess.json";

import Lottie from "lottie-react";

const editionDropAddress = "0xA14905F7283Af60AD1228EB713F8Ff5f0AfCd0Cf";

const NFTS = ({ store }) => {
  const [formData, setFormData] = useState({
    collectionName: "",
    description: "",
    image: "",
    maxClaimableSupply: "",
    maxClaimablePerWallet: "",
    price: "",
  });
  const [newTokenId, setNewTokenId] = useState(0);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hasCreted, setHasCreated] = useState(false);
  const [modalState, setModalState] = useState(false);
  const closeHandler = () => setModalState(false);
  const address = useAddress();

  // Handling formData state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const isFormValid = Object.values(formData).every((val) => val !== "");

  console.log(isFormValid);

  // Handling image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // get the first file selected by the user
    setFormData({ ...formData, image: file }); // update the formData state with the selected image file
    const input = document.getElementById(event.target.id);
    let myImage = "";
    const parent = input.parentNode;
    for (let i = 0; i < parent.children.length; i++) {
      const childNode = parent.children[i];

      // If image element already exists, use it
      if (childNode.tagName === "IMG") {
        myImage = childNode;
        break;
      }
    }
    // If image element doesn't exist, create it
    if (!myImage) {
      myImage = document.createElement("img");
      parent.appendChild(myImage);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
      myImage.src = e.target.result;
      myImage.style.position = "relative";
      myImage.style.zIndex = "10";
    };
  };

  // Authorazing the user
  const sdk = ThirdwebSDK.fromPrivateKey("aad8ad55a0fd2c083da1ea9b3005bf1cccc36860f9584b35523650da9a5c519e", "mumbai");

  // Uploading the image to IPFS
  const { mutateAsync: upload, isLoading: uploadLoading } = useStorageUpload({
    uploadWithGatewayUrl: true,
  });

  // Getting the contract
  const { contract: editionDrop } = useContract(
    editionDropAddress,
    "edition-drop"
  );

  // Getting the NFTs
  const { data: nfts, isLoading } = useNFTs(editionDrop);

  

  // Setting saleRecipient
  const { mutateAsync: setSaleRecipientForToken, isLoading: SaleToken } =
    useContractWrite(editionDrop, "setSaleRecipientForToken");

  // Creating NFT batch in the drop and setting claim conditions
  const createNFTBatch = async () => {
    if (!isFormValid) {
      alert("Please fill out all the fields");
      return;
    }
    setFormSubmitted(true);
    const filesToUpload = [formData.image];
    const uris = await upload({ data: filesToUpload });
    console.log(uris);
    console.log(uris[0]);

    const editionDrop = await sdk.getContract(
      "0xA14905F7283Af60AD1228EB713F8Ff5f0AfCd0Cf",
      "edition-drop"
    );
    const nextTokenId = await editionDrop.erc1155.nextTokenIdToMint();
    setNewTokenId(nextTokenId);

    try {
      await editionDrop.createBatch([
        {
          name: formData.collectionName,
          description: formData.description,
          owner: address,
          image: uris[0],
          shopId: store.id,
        },
      ]);
      console.log("✅ Successfully created a new NFT in the drop!");
      setShowMessage(true);

      const data = await setSaleRecipientForToken([nextTokenId, address]);
      console.info("contract call successs", data);
    } catch (error) {
      console.error("failed to create the new NFT", error);
    }

    try {
      const claimConditions = [
        {
          startTime: new Date(), //When does the sale start
          maxClaimableSupply: formData.maxClaimableSupply, //Total supply
          price: formData.price, //Price
          maxClaimablePerWallet: formData.maxClaimablePerWallet, //Max claimable per wallet
          waitInSeconds: MaxUint256, //How long to wait before the next claim
        },
      ];

      await editionDrop.claimConditions.set(nextTokenId, claimConditions);
      console.log("✅ Sucessfully set claim condition!");
    } catch (error) {
      console.error("Failed to set claim condition", error);
    }
    setHasCreated(true);
  };

  const checkForm = () => {
    if (!isFormValid) {
      alert("Please fill all the fields");
    }
  };

  return (
    <div>
      <div>
        <div>
          <button onClick={() => setModalState(true)}>Add</button>

          <Modal
            visible={modalState}
            onClose={closeHandler}
            className="md:w-20"
          >
            {formSubmitted ? (
              <div>
                {hasCreted ? (
                  <div>
                    <h1 className="text-2xl">Great job! </h1>
                    <h2>You have created your own NFT Batch !</h2>
                    <Lottie
                      animationData={LottieSuccess}
                      loop={false}
                      className="w-96"
                    />
                  </div>
                ) : (
                  <div>
                    {showMessage ? (
                      <Modal.Title>
                        Please Sign the Message in Metamask to set the claim
                        conditions
                      </Modal.Title>
                    ) : (
                      <Modal.Title>
                        Creating NFT Batch Please wait...
                      </Modal.Title>
                    )}
                    <Lottie animationData={LottieLoading} className="mb-20" />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Modal.Title>Create NFT Collection</Modal.Title>
                <Modal.Content>
                  <NFTInputs
                    handleChange={handleChange}
                    handleImageChange={handleImageChange}
                  />
                </Modal.Content>
                <Modal.Action passive onClick={() => setModalState(false)}>
                  Cancel
                </Modal.Action>
                <Modal.Action onClick={() => createNFTBatch()}>
                  Submit
                </Modal.Action>
              </div>
            )}
          </Modal>
        </div>
        <div className="flex flex-row gap-5 p-3 flex-wrap">
          {!isLoading &&
            nfts
              .filter((nft) => nft.metadata.shopId === store.id)
              .map((nft, index) => {
                return (
                  <div key={index}>
                    <NFTCard
                      className=""
                      NftImage={nft.metadata}
                      CollectionName={nft.metadata.name}
                      Decsription={nft.metadata.description}
                      TokenId={nft.metadata.id}
                      MintButton={
                        <Web3Button
                          contractAddress={editionDropAddress}
                          accentColor="#a4fc51"
                          action={(contract) => {
                            contract.erc1155.claim(nft.metadata.id, 1);
                          }}
                        >
                          Mint your NFT
                        </Web3Button>
                      }
                    ></NFTCard>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default NFTS;
