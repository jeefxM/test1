import React, {  useState, useRef } from 'react'
import { FaImage } from 'react-icons/fa'

import { updateShopifyCollection } from '@/utils/shopifyadminJeefx'
import { sendUpdatedImage } from '@/utils/generateImageLinkJeefx'
import { useStorageUpload } from "@thirdweb-dev/react";
import { Button } from '../ui/button';
import { Modal } from '@geist-ui/core';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select } from '@geist-ui/core';


const Banner = ({storeState,setStoreState, banner,  session, userEmail, refLogo,store}) => {



  const [error, setErrorMessage] = useState('')
  const [storeNameChanged, setStoreNameChanged]= useState(false)
  const modifyStoreData = (e) => {
    
    const field = e.target.id
    let data = e.target.value

    if(field === 'name'){
      if(store.name  !==  data){
      setStoreNameChanged(true)

      }else{
        setStoreNameChanged(false)

      }
    }
    
     setStoreState(pervState => ({...pervState, [field]: data}))

   

  }

  const { mutateAsync: upload } = useStorageUpload({
    uploadWithGatewayUrl: true,
  });


    //
    const handleProfileFiles = async (image, file) => {
        const reader = new FileReader()

        const form = new FormData()
        form.append('file',file)
        reader.readAsDataURL(file)
     
        reader.onload =  async function(e)  {
            image.src = e.target.result  
                if(image.id.includes('logo')){

                  const fileData= await upload({data:[{file}]})
                  const image = await fetch(fileData[0])
                  const imageLink = await image.json()
                  const saveToDb = await fetch('/api/db/updatestore',{
                    method: "POST",
                    body: JSON.stringify({data:{ id:store.id,logo:imageLink.file}})
                  })              
             }
        }
      }

    const changeEditProfileFiles = (e, id) => {
      const image = document.getElementById(id)
        const file = e?.target?.files[0] 
        const reader = new FileReader()


        const form = new FormData()
        form.append('file',file)
        reader.readAsDataURL(file)

     
        reader.onload =  async function(e)  {
            image.src = e.target.result

        }
    }

    


    // update collection image in Shopify

   const uploadShopBanner = async (file) => {

      const {key,url} = await sendUpdatedImage(file)
      const shopifyUpdate = await updateShopifyCollection({input: {id:store.id, image:{src:`${url}/${key.value}`, altText:file.name}}})

  }
   
 





    const [showPic, setShowPic] = useState('opacity-0')
 
    //Edit Profile
    const [modalState, setModalState] = useState(false)
    const closeHandle = () => {
      setModalState(false)
    }
      //input files
    const bannerRef = useRef(null)
    const logoRef= useRef(null)

    // images
    const bannerImg = useRef(null)


    const applyImagesToProfile = () => {

      const bannerFile = bannerRef?.current.files[0]
      const logoFile = logoRef?.current.files[0]
      //profile pics
      if(bannerFile){

        handleProfileFiles(bannerImg?.current, bannerFile)
        uploadShopBanner(bannerFile)

      }
      if(logoFile){

        handleProfileFiles(refLogo?.current, logoFile)

      }

      

      

    }

    const updateStore = async () => {


      for (const key in storeState) {
          if ((key === "instagram" || key === "facebook" || key ==='website' || key === 'twitter') && storeState[key] !== null && !storeState[key].includes("https://")) {
            console.log(key)
            setStoreState({...storeState, [key]: `https://${storeState[key]}`})
          }
      }
      
      applyImagesToProfile()

      try{
      const res = await fetch('/api/db/updatestore', {
        method:"POST",
        body: JSON.stringify({data:storeState, changed: storeNameChanged})
      })
    }catch(error){
      console.log(error)
    }
      
    }

     

  return (
    <div className='w-full h-[30vh]  overflow-hidden relative'>
    <div className='relative h-full bg-gradient-to-r from-[#8a2be2] via-[#00f5a0] to-[#8a2be2] '>

      { banner ?
          <img src={banner} className='object-fit w-full h-full' alt='#' ref={bannerImg}  /> 

 : ''}
      {session?.user?.email === userEmail ?
      
      <div className='absolute bottom-5 right-3 z-10'>
                {/* <input type="file" id="banner-input" className='absolute inset-0 w-full h-full' onChange={(e) => {handleFileChange(e,'bannerimg'), uploadShopPhotos(e)}}/> */}
        <Button variant='outline' className='bg-orange text-white' onClick={() => setModalState(true)}>Edit Profile</Button>
       
      {/* <button className=' w-10  text-center rounded-xl flex justify-center bg-white ' id='changeavatarpic'><label htmlFor='banner-input'  ><FaImage size={25} className='text-black cursor-pointer text-center' /></label></button> */}
    </div>
: ''}
    </div>
   
    
    <Modal visible={modalState} onClose={closeHandle}>
        <Modal.Title>{"Edit Profile"}</Modal.Title>
        <Modal.Content>
          <span className='text-red'>{error}</span>
        <div className='w-full h-auto flex flex-col   '>
      <div className='banner w-full h-[150px] flex items-center justify-center bg-gradient-to-r from-[#8a2be2] via-[#00f5a0] to-[#8a2be2] relative '>
      
      <img src={banner} className='object-fit w-full h-full' alt='#' id='bannerimg' /> 
        <button className=' w-10  text-center rounded-xl flex justify-center bg-white absolute ' id='changebanner[oc'><label htmlFor='banner-input'  ><FaImage size={25} className='text-black cursor-pointer text-center' /></label></button>

      <input type="file" id="banner-input"  ref={bannerRef} className='absolute inset-0 w-full h-full' onChange={(e) => {changeEditProfileFiles(e,'bannerimg')}}/>
      <div className='bg-black rounded-full h-[100px] w-[100px] absolute bottom-[-20px] left-[10px] flex items-center justify-center '>
      <img src={storeState.logo} className='object-fit w-full h-full rounded-full ' alt='#' id='logoimg' /> 

      <button className=' w-10  text-center rounded-xl flex justify-center bg-white absolute ' id='changeavatarpic'><label htmlFor='logoinput'  ><FaImage size={25} className='text-black cursor-pointer text-center' /></label></button>

<input type="file" id="logoinput" ref={logoRef} className='absolute inset-0 w-full h-full' onChange={(e) => {changeEditProfileFiles(e,'logoimg') }}/>
      </div>
      </div>
      <div className='flex flex-col gap-2'>   <Input type='outline' className='mt-8' placeholder={'storeName'} id='name'  value={storeState.name || ''} onChange={modifyStoreData}/>
      <Textarea  placeholder='description' id='description' onChange={modifyStoreData} value={storeState.description || ''} />
      {/* <Select onChange={(e) => console.log(e)} id='category' placeholder='Category' style={{padding: '20px', border:'1px black solid'}}>
        <Select.Option value="Apparel">Apparel</Select.Option>
      </Select> */}
      <Input type='outline' id='instagram'  placeholder={'Instagram'} onChange={modifyStoreData} value={storeState.instagram || ""} />
      <Input type='outline'  id='facebook' placeholder={'Facebook '} onChange={modifyStoreData} value={storeState.facebook || ''}/>
      <Input type='outline'  id='website' placeholder={'Website'} onChange={modifyStoreData} value={storeState.website || ''} />
      <Input type='outline'  id='email' placeholder={'Email'} onChange={modifyStoreData} value={storeState.email || ''} /> </div>
      



    </div>        </Modal.Content>
        <Modal.Action passive onClick={() => setModalState(false)}>Cancel</Modal.Action>
        <Modal.Action onClick={() => {setModalState(false),updateStore() }}>Submit</Modal.Action>
      </Modal>
 
  </div>
      
  )
}

export default Banner
