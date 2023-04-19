import React, { useState } from 'react'
import ModalComponent from '../Modal'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { sendUpdatedImage } from '@/utils/generateImageLinkJeefx'
import { createShopifyProduct } from '@/utils/shopifyadminJeefx'
import { Select } from '@geist-ui/core'
import { publishProductToChannels } from '@/utils/shopifyadminJeefx'
import { Edges } from '@react-three/drei'


const  AddProduct = ({storeName, setShopifyStoreData, storeProducts}) => {

  const [modalState, setModalState] = useState(false)
  const closeHandler = () => {
    setModalState(false)
  }



  


  const handleImageUpload = (e) => {

    const file = e.target.files[0]

    const input = document.getElementById(e.target.id)
    let myImage = ''

    const parent = input.parentNode
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
      myImage = document.createElement('img');
      parent.appendChild(myImage);
    }
  

    const reader = new FileReader()
    reader.readAsDataURL(file)

    
    reader.onload = function(e)  {
      myImage.src = e.target.result
      myImage.style.position='relative'
      myImage.style.zIndex ='10'



    }




  }


  const [image, saveImages] = useState([])
  const [productName, setProductName] = useState()
  const [productDescription, setProductDescription] = useState()
  const [prouductTag, setProductTag] = useState()
  const [productQuantity, setProductQuantity] = useState()
  const [productPrice, setProductPrice] = useState()
  const [productOptions, setProductOptions] = useState([])


  const sliceOptions = (e) => {
    setProductOptions(e.target.value.split(' '))
    
  }


  const uploadProductPhotos = async(e) => {
    const file = document.getElementById(e.target.id).files[0]


    const {key,url} = await sendUpdatedImage(file)

    saveImages(pervImages => ({...pervImages, src:`${url}/${key.value}`, altText:"test" }))
    
  }

  const uploadProduct = async() => {
    // const uploadProductData = {
    //   node:{
      
    //     featuredImage : {url:image.src},
    //     descriptionHtml: productDescription,
    //     id:'123',
    //     vendor: storeName,
    //     title: productName,
    //     tags: prouductTag,
    //     options: productOptions,
    //     variants:{ edges: [{ node:
    //       {price:{amount:parseInt(productPrice)} }}
            
    //     ]}
        
        
  
    //   }
    //   }
    

    // setShopifyStoreData(pervState => ([...pervState, 
    //   uploadProductData
   
    // ]))

    const res = await createShopifyProduct({input:{
      images : image,
      descriptionHtml: productDescription,
      published: true,
      vendor: storeName,
      title: productName,
      status: "ACTIVE",
      tags: prouductTag,
      options: productOptions,
      variants:[
        {price: parseInt(productPrice),
          inventoryQuantities:{
            availableQuantity:parseInt(productQuantity),
            locationId:"gid://shopify/Location/80800710977"
          }}
      ]
      
      

    }})

    console.log(res)
    const id = res.data.productCreate.product.id

    const publishProducts = await publishProductToChannels(id)

  }






  const content = (
    <div className='w-full flex flex-col gap-4  '>
    <div className='w-full flex flex-row gap-4 '>
      <div className='border-2 border-black border-dashed h-20 w-1/4 relative flex justify-center items-center'  tabIndex="0"  >
        <label htmlFor='main-img' className='cursor-pointer absolute z-0 text-4xl font-bold'  >+</label>
        <input type='file' id='main-img' accept='*/image' onChange={(e) => {handleImageUpload(e),uploadProductPhotos(e)} } />
      </div>
      <div className='border-2 border-black border-dashed h-20 w-1/4 relative flex justify-center items-center'  tabIndex="0"  >
        <label htmlFor='secndary-img' className='cursor-pointer absolute z-0 text-4xl font-bold'  >+</label>
        <input type='file' id='secndary-img' onChange={(e) => {handleImageUpload(e),uploadProductPhotos(e)}} />
      </div>
      <div className='border-2 border-black border-dashed h-20 w-1/4 relative flex justify-center items-center'  tabIndex="0"  >
        <label htmlFor='third-img' className='cursor-pointer absolute z-0 text-4xl font-bold'  >+</label>
        <input type='file' id='third-img' onChange={(e) => {handleImageUpload(e),uploadProductPhotos(e)}} />
      </div>


      <div className='border-2 border-black border-dashed h-20 w-1/4 relative flex justify-center items-center'  tabIndex="0"  >
        
        <label htmlFor='fourth-img' className='cursor-pointer absolute z-0 text-4xl font-bold'  >+</label>
        <input type='file' id='fourth-img' onChange={(e) => {handleImageUpload(e),uploadProductPhotos(e)}} />
      </div>




    </div>
    <Input variant='outlined' placeholder='Name' required onChange={(e) => setProductName(e.target.value)} />
    <Input variant='outlined' placeholder='description' required onChange={(e) => setProductDescription(e.target.value)} />
    <Input variant='outlined'  type='number' placeholder='Stock Quantity' required onChange={(e) => setProductQuantity(e.target.value)} />
    <Input variant='outlined' type='number' placeholder='price' required onChange={(e) => setProductPrice(e.target.value)} />
    <Input variant='outlined' placeholder='S M L XL' required onChange={(e) => sliceOptions(e)} />
    <Select onChange={(val) => setProductTag(val)}>
      <Select.Option value='1'>Apparel</Select.Option>
      <Select.Option value='2'>Skateboards</Select.Option>
    </Select>


    </div>
  )
  return (
    <div className='border-2 border-black dark:border-white relative h-[320px] w-[200px] flex items-center justify-center'>
        <button className='text-5xl' onClick={() => setModalState(true)}>+</button>
        <ModalComponent state={modalState} changeState={setModalState} closeHandler={closeHandler} title={'Add Product'} content={content} submitFunction={uploadProduct} />
  </div>
  )
}

export default AddProduct
