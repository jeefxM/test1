import React, { useState } from 'react'
import ShopProductCard from './ShopProductCard'
import AddProduct from './AddProduct'
import NFTS from './NFTS'
import Image from 'next/image'


const ShopProducts = ({storeName, storeProducts,session, user,setShopifyStoreData, blocked,loadMore, store}) => {

  const products =  storeProducts?.map(item => {
  
    return <ShopProductCard key={item.node.title} user={user} session={session} storeProducts={storeProducts} setShopifyStoreProducts={setShopifyStoreData} description={item.node.description} title={item.node.title} featuredImg={item.node.featuredImage.url} price={item.node.variants.edges[0].node.price.amount} id={item.node.id}  />
  })

 
  const [activeBar, setActiveBar] = useState('products')

  return (
    <div className=' ml-[23%]  sm:ml-0 sm:mr-0 sm:justify-center flex gap-4 sm:gap-5 flex-wrap sm:my-10 relative' >
      <div className='flex w-full  '>
        <div className={`w-1/2 h-16 border-2 border-black dark:border-white flex justify-center items-center transition-all ${activeBar ==='products' ? 'bg-buttonsecond text-white' :''}`} onClick={() => setActiveBar('products')}>
          <h2 className='font-bold text-3xl'>Products</h2>

        </div>
        <div className={`w-1/2 h-16 border-2 border-black dark:border-white flex justify-center items-center transition-all ${activeBar ==='NFT' ? 'bg-buttonsecond text-white' :''}`} onClick={() => setActiveBar('NFT')}>
          <h2 className='font-bold text-3xl'>NFT`s</h2>

        </div>

      </div>
      
      {session?.user?.email === user?.email && activeBar === 'products' ?       <AddProduct storeName={storeName} setShopifyStoreData={setShopifyStoreData} storeProducts={storeProducts}/> : ""}
      {activeBar === 'products' ?


     <> {products}</>
: <div className='flex items-center justify-center'>
  <NFTS store={store} /></div>}
<div className='absolute bottom-[-60px] w-full flex justify-center '>
   
      <button className="bg-[#FFAA00] color-white p-3  text-white rounded-md border-b-4 border-2 border-black dark:border-white  active:bg-buttonsecond w-52 disabled:bg-hover " disabled={blocked} onClick={loadMore}>
            Load More
          </button>
          </div>

    </div>
  )
}

export default ShopProducts
