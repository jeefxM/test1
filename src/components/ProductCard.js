import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {User} from "@geist-ui/core"
import { formatCurrency } from '@/utils/CurrencyFormaterJeefx'

const ProductCard = ({title, featuredImage, price, id, vendor }) => {
  return (
    <div
    key={title}
    className="h-[330px] w-[300px]   border-2 border-black dark:border-white max-h-full relative"
  >
    <div className=" p-12 sm:p-10 ">
      <Image
        width={400}
        height={300}
        src={featuredImage}
        className="h-full hover:bg-main  object-fit pt-2 "
        alt={`${title} | ThirdMerch` }
      />
      <div className='viewbtn py-2 '>
      <Link href={`/products/${id.replace('gid://shopify/Product/', '')}` }> <div className="bg-red rounded-md w-auto cursor-pointer whitespace-nowrap border-black border-2 text-sm text-center font-bold text-white hover:bg-hover "> BUY NOW</div> </Link>
      </div>
    </div>{" "}
    <div className="info bg-white w-20 h-10 absolute top-3 left-1 text-center"></div>
    <div className="authorinfo bg-white w-[auto] h-[auto] absolute bottom-0 left-0 text-center">
      <User
        src="https://api.dicebear.com/5.x/pixel-art/svg?seed=GugaGaprindashvili"
        name={title}
      >
        <User.Link href="https://www.instagram.com/pataratedi/">
          @{vendor}
        </User.Link>
      </User>
    </div>
    <div className="limitededtion absolute top-2 left-2  w-20 h-10 bg-button text-white">
      <p className="text-2xl">{formatCurrency(price)}</p>
    </div>
    <div className="absolute top-2 sm:top-4 right-2 bg-buttonsecond rounded-xl h-10 text-center font-bold flex items-center">
      <p className="p-3">HOLDERS DISCOUNT</p>
    </div>
  </div>
  )
}

export default ProductCard
