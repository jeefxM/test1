import React, {useEffect, useState, useRef } from 'react'
import Banner from '@/components/shop/BannerJeefx'
import { getCollection } from '@/utils/shopifyJeefx'
import ShopInfo from '@/components/shop/ShopInfoJeefx'
import { useSession } from 'next-auth/react'
import ShopProducts from '@/components/shop/ShopProductsJeefx'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'

const Store = ({store,storeData, user, currentPage, followers, }) => {



  const router = useRouter();


  const {data: session} = useSession()

  const [shopifyStoreProducts, setShopifyStoreProducts] = useState(storeData.data?.collection?.products.edges)

  useEffect(() => {
    if(shopifyStoreProducts?.length < 10){
      setBlocked(true)
    }else if(shopifyStoreProducts?.length == 10){
      setBlocked(false)
    }
  }, [])

  const [blocked, setBlocked] = useState(true);

  const loadMore = async () => {
    await router.push(`/shop/${stoerName}?page=${currentPage + 1}`);
  };


  const [storeState, setStoreState] = useState(store)




  const logoImg = useRef()
  
  return (
    <div className='w-full min-h-screen relative mb-20'>
      <Banner  banner={storeData.data?.collection?.image.url}  session={session} userEmail={user?.email} refLogo={logoImg} store={store} storeState={storeState}  setStoreState={setStoreState}/>
      <ShopInfo  user={user} router={router} followers={followers} store={storeState} userEmail={user?.email} logoRef={logoImg} />
      <ShopProducts  storeName={storeState.name} user={user} store={store} storeProducts={shopifyStoreProducts} session={session} setShopifyStoreData={setShopifyStoreProducts} loadMore={loadMore} blocked={blocked}  />
        
      
    </div>
  )
}


export const getServerSideProps = async(context) => {
  const {name, page = 1} = context.query

  const perPage = 10 * page;





  const storeData = await getCollection(name, perPage)

//store owner
  const prisma = new PrismaClient()


  if(!storeData){


  return {
   
      notFound: true
    
  }

  
  }

    
  const store =await prisma.store.findUnique({
    where:{
      name: name
    }
  })
  console.log(store)
  if(!store){
    const createStore = await prisma.store.create({
      data:{
        name:name,
      }
    })

    const followers = await prisma.storeFollowers.findMany({
      where: {
        store: {
          every:{
          name: name
          }
        }
      }
    })

    return {
      props: {
         store:createStore,
         storeData,
         user:undefined,
         currentPage: parseInt(page),
         followers,
         
      }
    }

  }

  const user = await prisma.user.findFirst({
    where: {
      stores: {
        some: {
          name: name
        }
      }
    }
  })

  const followers = await prisma.storeFollowers.findMany({
    where: {
      store: {
        every:{
        name: name
        }
      }
    }
  })
  return {
    props: {
       store,
       storeData,
       user,
       currentPage: parseInt(page),
       followers,
       
    }
  }
  
}




export default Store
