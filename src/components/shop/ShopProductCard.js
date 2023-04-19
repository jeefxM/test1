import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '@/utils/CurrencyFormaterJeefx'
import { Button } from '../ui/button'
import { Popover } from '@geist-ui/core'
import { deleteShopifyProduct } from '@/utils/shopifyadminJeefx'

const ShopProductCard = ({ title, featuredImg, price,id, storeProducts, setShopifyStoreProducts, user,session}) => {

  const deleteProduct = async() => {

    const filteredProducts = storeProducts.filter(item => item.node.id != id)
    
    setShopifyStoreProducts(filteredProducts)
    const res = await deleteShopifyProduct({
      input: {
        id: `${id}`
      }
    })

  }


  const content = () => (
    <div className='px-3'>
      <h2 onClick={deleteProduct} className='text-red cursor-pointer'>Delete</h2>
    </div>
  )
  return (
    <div className='border-2 border-black dark:border-white relative h-[320px] w-[300px]'>
    <div className=" p-12 sm:p-10 ">
    <Image
      width={400}
      height={400}
      src={featuredImg}
      className="h-full hover:bg-main  object-fit pt-2 "
      alt={`| ThirdMerch` }
    />
    <div className='viewbtn py-2 '>
    <Link href={`/products/${id.replace('gid://shopify/Product/', '')}` }><div className="bg-red rounded-md w-auto cursor-pointer whitespace-nowrap border-black border-2 text-sm text-center font-bold text-white hover:bg-hover "> BUY NOW</div> </Link>
    </div>
  </div>{" "}
  <div className="authorinfo bg-white w-[100px] h-[auto] absolute bottom-0 left-0 text-center">
        <p className='text-black font-bold'>{title}</p>
  </div>
  <div className="info bg-white w-20 h-8 absolute top-3 left-1 text-center"></div>
 
  <div className="limitededtion absolute top-2 left-2  w-20 h-8 bg-button text-white">
    <p className="text-xl">{formatCurrency(price)}</p>
  </div>
  <div className="absolute top-2 sm:top-4 right-2 bg-buttonsecond rounded-xl h-10 text-center font-bold flex items-center">
    <p className="p-3 text-sm">HOLDERS DISCOUNT</p>
  </div>
  {session?.user?.email === user?.email ?     <div className='absolute right-2 bottom-2 z-10 border-2 border-black dark:border-white rounded-md p-2'>  
  <Popover content={content} className='cursor-pointer'>...</Popover>  </div>
 : ""
}

  </div>
  )
}

export default ShopProductCard
