import React, {useState} from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Modal } from '@geist-ui/core'
import { formatCurrency } from '@/utils/CurrencyFormaterJeefx'
import { createGates } from '@/utils/shopifyadminJeefx'
import { useStorageUpload } from "@thirdweb-dev/react";

import NFTPicker from './NFTPicker'
import { id } from 'ethers/lib/utils'
const Discounts = ({storeProducts, storeInfo, setPage, gatesState, setGatesState}) => {


    
    const [modalState , setModalState] = useState(false)
    const closeHandler = () => setModalState(true)
    const [selectedItems, setSelectedItem] = useState([])
    const checkAction = (e) => {
        const item = JSON.parse(e.target.dataset.item);
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedItem([...selectedItems, item]);
        } else {
            setSelectedItem(selectedItems.filter(product => product.id !== item.id));
          }
    }
    const [discountMark, changeDiscountMark] = useState('percentage')

    const [discountValue, setDiscountValue] = useState('')
    const [tokenAddress, setTokenAddress] = useState('')
    const [tokenGateName, setTokenGateName] = useState('')
    const [imageUrl, setImageUrl] = useState('')


    const { mutateAsync: upload } = useStorageUpload({
        uploadWithGatewayUrl: true,
      });

      

    const uploadNFTImage = async (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        const image = document.getElementById('NFTImage')

     

        reader.onload =  async function(e)  {
            image.src = e.target.result  
        }
        reader.readAsDataURL(file)

        const fileData= await upload({data:[{file}]})
        const imagedata = await fetch(fileData[0])
        const imageLink = await imagedata.json()
        setImageUrl(imageLink)
    }
    
    const itemsToChooseFrom = storeProducts?.data.collection?.products?.edges.map(item => {

        return <div key={item.node.id} className='flex gap-2'>
            <div>
            <input type='checkbox' value={item.node.id}  data-item={JSON.stringify(item.node)} className='p-10 '   onChange={(e) => checkAction(e)} />
            </div>
            <div className='h-[100px] w-[100px]'><img src={item.node.featuredImage.url} className='object-fit'/> </div>
            <div><p>{item.node.title}</p>
            </div>
        </div>
    })

    const [pickedNFT, setPickedNFT] = useState('')



    const createGatesInstance =async () => {

        if(!tokenGateName){
            alert('TokenGate Name Should be filled')
            return
        }else if(!pickedNFT){
            alert('Token Address should be Picked')
            return
        }else if(!discountValue){
            alert('Discount should be filled')
            return
        }else if(!selectedItems){
            alert('Products should be selected')
            return
        }
        const segment  = [
            {
                name: tokenGateName, // Replace with your gate name
                conditionsDescription: "Any token", // Replace with your condition description
                contractAddress: pickedNFT.metadata.id,
                imageUrl: pickedNFT.metadata.image, // Replace with NFT collection image URL
            }
        ]
    
        const gateConfigurationRequirements = {
            logic: "ANY",
            conditions: segment,
          }
    
    
          const gateConfigurationReaction = {
            name: tokenGateName,
            type: "discount",
            discount: {
              type: "percentage",
              value: discountValue,
            },
          };
          setPage('main')

          try{
          const res = await fetch('/api/gates/creategates', {
            method:"POST",
            body: JSON.stringify({requirements: gateConfigurationRequirements, reaction:gateConfigurationReaction, products:selectedItems, name:tokenGateName, shopId:storeInfo[0].id})

          })
          const data = await res.json(
          )


          }catch(error){
            console.log(error)
          }



    }


  return (
    <div>
        <div className='w-full h-[100vh] dark:bg-white  bg-main rounded-xl my-5 p-10'>
            <div className=''>
                <Label htmlFor='name' className='dark:text-black text-white'>Name </Label>
                <Input variant='outline' placeholder='name' id='name' className='border-2 dark:border-black text-black ' value={tokenGateName} onChange={(e) => setTokenGateName(e.target.value)}/>
            </div>
            <div>
                <NFTPicker storeInfo={storeInfo} pickedNFT={pickedNFT} setPickedNFT={setPickedNFT} />
            </div>
            
            <div className='my-5'>
                <h2 className='dark:text-black text-white py-5'>Discount</h2>
                <div className='flex'>
                <Button variant='outline' className={`border-2 dark:border-black text-white dark:text-black w-32 mx-2 ${discountMark ==='percentage' ? 'bg-buttonsecond text-white' :''}` } onClick={() => changeDiscountMark('percentage')}>
                    %
                </Button>
                <Button variant='outline'  className={`border-2 dark:border-black text-white dark:text-black w-32 mx-2 ${discountMark ==='amount' ? 'bg-buttonsecond text-white' :''}`} onClick={() => changeDiscountMark('amount') }>
$
                </Button>
                <Input variant='outline' placeholder='Amount' id='name' className='border-2 dark:border-black text-black' type='number' value={discountValue} onChange={(e) => setDiscountValue(e.target.value)}/>
                </div>

            </div>
            {/* <div className='my-5'>
                <Label htmlFor='address' className='dark:text-black text-white'>Token Address</Label>
                        <Input variant='outline' placeholder='Token Address' id='address' className='border-2 dark:border-black text-black ' value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)}/>


            </div> */}
            <div className='flex justify-center items-center'>

            <Button variant='outline' onClick={() => {setModalState(true)}}  className={`border-2 dark:border-black text-white dark:text-black w-32 mx-2 `} > Choose Products </Button>
                <Modal visible={modalState} closeHandler={closeHandler}>
                    <Modal.Title>Choose Products</Modal.Title>
                    <Modal.Content>
                        <div>
                            {itemsToChooseFrom}
    
                        </div>
                    </Modal.Content>

                    <Modal.Action onClick={() => setModalState(false)}>Cancel</Modal.Action>
                    <Modal.Action onClick={() => setModalState(false)}>Add</Modal.Action>

                </Modal>

            </div>
            <div className='border-t-2 border-black w-full my-5 overflow-y-scroll'>
                {selectedItems ? 
                selectedItems.map(item => {
                    return <div key={item.id} className='flex py-5 gap-2'>
                            <div className='h-[100px] w-[100px]'> <img src={item.featuredImage.url} className='object-fit rounded-md' /> </div>
                            <div> <p className='font-bold text-2xl dark:text-black '>{item.title}</p>
                            <p className='font-bold text-xl text-buttonsecond '>{formatCurrency(item.variants.edges[0].node.price.amount)}</p> </div>

                        </div>
                }): "" }


            </div>
            <div className='py-5 flex w-full justify-center'>
            <Button variant='outline'  onClick={() => {createGatesInstance()}} className='border-black border-2 bg-button w-44 '> Publish </Button>
            </div>


        </div>

      
    </div>
  )
}

export default Discounts
