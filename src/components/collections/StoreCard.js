import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {User} from '@geist-ui/core'


const StoreCard = ({name, logo, category, description,id}) => {
    
  return (
    <div
    className="h-[330px] w-[300px]   border-2 border-black dark:border-white max-h-full relative"
  >
    <div className=" p-12 sm:p-10 ">
      <img
      
        src={logo}
        className="h-full hover:bg-main h-[300px]  w-[300px] object-fit pt-2 "
        alt={`${name} | ThirdMerch` }
      />
      <div className='viewbtn py-2 '>
      <Link href={`/shop/${name}` }> <div className="bg-red rounded-md w-auto cursor-pointer whitespace-nowrap border-black border-2 text-sm text-center font-bold text-white hover:bg-hover "> VISIT</div> </Link>
      </div>
    </div>{" "}
    <div className="info bg-white w-20 h-10 absolute top-3 left-1 text-center"></div>
    <div className="authorinfo bg-white w-[auto] h-[auto] absolute bottom-0 left-0 text-center">
      <User
        src="https://api.dicebear.com/5.x/pixel-art/svg?seed=GugaGaprindashvili"
        name={category || ''}
      >
        <User.Link href={`http://localhost:3000/shop/${name}`}>
          @{name}
        </User.Link>
      </User>
    </div>
    <div className="limitededtion absolute top-2 left-2  w-20 h-10 bg-button text-white">
        {category}

    </div>
    <div className="absolute top-2 sm:top-4 right-2 bg-orange rounded-xl h-10 text-center font-bold flex items-center">
      <p className="p-3">PREMIUM</p>
    </div>
  </div>
  )
}

export default StoreCard
