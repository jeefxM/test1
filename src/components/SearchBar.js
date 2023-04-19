import React, {useState, useRef, useEffect} from 'react'
import { AutoComplete } from '@geist-ui/core'
import { Input } from './ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { Button } from './ui/button'
import { useRouter } from 'next/router'
import { getAllProducts } from '@/utils/shopifyJeefx'
import { useProductsProvider } from '@/context/AllProductsProviderJeefx'
const SearchBar = ({}) => {
    const {products} = useProductsProvider()
    const router = useRouter()


    const allProducts = products?.map(item => {
        return {value:item.title, data:item}
    })


 
      
      const [options, setOptions] = useState()
      const [searchText, setSearchText]  = useState('')

      //Finds product which includes search result term
      const searchHandler = (currentValue) => {
        setSearchText(currentValue)
        if (!currentValue) return setOptions([])
        const relatedOptions = allProducts.filter(item => item.value.toLowerCase().includes(currentValue.toLowerCase()))
        setOptions(relatedOptions)
      }
    
    const [showResults, setShowResults] = useState('hidden')

    const ref = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            setShowResults("hidden");
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);

      const productsSearchResult =   options?.map(item => {
        return <Link key={item.data.id} href={`/products/${item.data.id.replace('gid://shopify/Product/', '')}`}> <div  className='w-full flex border-b-2 border-black p-3 gap-2 hover:bg-[#F3F9F6] cursor-pointer '>
            <div className='h-[100px] w-[100px]'> <Image src={item.data.featuredImage.url} alt={`${item.value}| ThirdMerch`} width={100} height={100}  className='object-fit'/> </div> 
            <div className='flex-col gap-2 items-center py-5'> <p>{item.value}</p> <p className='underline text-[#4F92D7]'>@{item.data.vendor}</p></div></div></Link>
    })

    const redirectToSearchResults = () => {
        router.push(`/results?search=${searchText}`)
    }

  return (
    <div>
    <div className='w-[500px] flex gap-2 sm:w-[auto]'>
   <Input placeholder='Search Items' className="text-black relative" onChange={(e) => searchHandler(e.target.value)} onClick={() => setShowResults('visible')}/> 
    <Button variant='outline' onClick={redirectToSearchResults}> <FaSearch /></Button>
   <div className={`absolute w-[500px] h-[300px] sm:hidden text-black top-12 bg-white rounded-xl mt-2 transition-all overflow-y-scroll ${showResults} flex flex-col border-2 border-black `} ref={ref}>
    {options?.length ?
    productsSearchResult 
   : 
    <div className=' py-2 h-full flex items-center justify-center '>{"Empty"}</div>}

   </div>
   </div>
    </div>
  )
}

export default SearchBar
