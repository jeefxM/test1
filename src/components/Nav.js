import React, { useEffect } from 'react'
import { FaHome } from 'react-icons/fa'
import { FaStore } from 'react-icons/fa'
import { FaTshirt } from 'react-icons/fa'
import { nftLogo } from './assets'
import Link from 'next/link'
import SearchBar from './SearchBar'
import { useState } from 'react'


const Nav = ({leftNavWidth, mobileNav}) => {

  //check screen size
  const [notMobileScreen , setMobileScreen] = useState(true)  
  useEffect(() => {
    if(typeof window !== undefined){
      if(window.innerWidth < 640){
        setMobileScreen(false)
      }else{
        setMobileScreen(true)
      }

    }
  }, [])
    

    


  return (
    <div className={` border-r-2 border-black dark:border-white fixed left-0 m-0 h-screen  ${leftNavWidth} transition-all ease-out z-[100] bg-white dark:bg-main sm:${mobileNav} sm:w-[300px]`}>
        {leftNavWidth  === 'w-[66px]' && notMobileScreen ? <ul className='gap-5 flex flex-col justify-start items-center h-full py-20 '>
                <Link href='/'><li className='text-[10px] font-bold text-center hover:text-hover'><FaHome size={30} className='hover:text-hover' /> Home</li></Link>
                <Link href='/collections'><li className='text-[10px] font-bold text-center hover:text-hover'><FaStore size={30} className='hover:text-hover' />Shop</li></Link>
                <Link href='/configurator'><li className='text-[10px] font-bold text-center hover:text-hover'><FaTshirt size={30} className='hover:text-hover' />Editor</li></Link>
                <Link href='/claim'><li className='text-[10px] font-bold text-center hover:text-hover'>

{nftLogo}NFT`s</li></Link>
            </ul> : <>
                <ul className='flex flex-col justify-start h-full py-5 w-full'>
                 <li className='hidden sm:block'> <SearchBar/></li>
                <Link href='/'><li className='border-b-2 border-black px-2 dark:border-white w-full dark:hover:bg-hover hover:bg-[#F5F6FF]'><p className='py-2 flex '><FaHome size={25} className='mr-3'/> Home</p></li></Link>
                <Link href='/collections'> <li className='border-b-2 border-black px-2 dark:border-white w-full dark:hover:bg-hover hover:bg-[#F5F6FF]'><p className='py-2 flex '><FaStore size={25} className='mr-3'/>Shop</p></li></Link>
                <Link href='/configurator'> <li className='border-b-2 border-black px-2 dark:border-white w-full dark:hover:bg-hover hover:bg-[#F5F6FF]'><p className='py-2 flex '><FaTshirt size={25} className='mr-3'/> 3D Product Editor</p></li></Link>
                <Link href='/claim'>  <li className='border-b-2 border-black px-2 dark:border-white w-full dark:hover:bg-hover hover:bg-[#F5F6FF]'><p className='py-2 flex '><FaTshirt size={25} className='mr-3'/> NFT Discounts </p></li></Link>

                </ul>
            </> }
            

      
    </div>
  )
}

export default Nav
