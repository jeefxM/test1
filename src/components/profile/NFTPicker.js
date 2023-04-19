import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Modal } from '@geist-ui/core'
import { useNFTs, useContract,ThirdwebNftMedia } from '@thirdweb-dev/react'



const NFTPicker = ({storeInfo, pickedNFT,setPickedNFT}) => {
    const [modalState, setModalState] = useState(false)
    const closeHandler = () => setModalState(false)

    
    const editionDropAddress = "0xA14905F7283Af60AD1228EB713F8Ff5f0AfCd0Cf";

    const { contract: editionDrop } = useContract(
        editionDropAddress,
        "edition-drop"
      );
    
      // Getting the NFTs
      const { data: nfts, isLoading } = useNFTs(editionDrop);


        const [chosenId, setChosenId] = useState()

      const handleCheckboxChange = (e) => {
        const nodeData = JSON.parse(event.target.dataset.node)
        setChosenId(e.target.value)
        setPickedNFT(nodeData);


      };

      

  return (
    <div className='mt-5'>
    <Button variant='outline' onClick={() => setModalState(true)} className='text-black border-black'>PICK NFT</Button>
      <Modal visible={modalState} closeHandler={closeHandler} >
        <Modal.Title>Pick NFT</Modal.Title>
        <Modal.Content>
            <div>
                {nfts ? 
                nfts.filter(nft => nft.metadata.shopId === storeInfo[0].id ).map((item,index) => {
                                                        return <div key={index}  className='flex gap-3' > 
                    <input type='checkbox' value={item.metadata.id}     data-node={JSON.stringify(item.metadata)}          checked={chosenId === item.metadata.id}
 onChange={(e) => handleCheckboxChange(e) }  />
                     <ThirdwebNftMedia metadata={item.metadata} width={100} height={100} />
                     <div><h2 className='font-bold'>{item.metadata.name}</h2> </div>
                      </div>
                })
            : ""}

            </div>
        </Modal.Content>
        <Modal.Action onClick={() => setModalState(false)}>Cancel</Modal.Action>
        <Modal.Action onClick={() => setModalState(false)}>Submit</Modal.Action>

      </Modal>
    </div>
  )
}

export default NFTPicker
