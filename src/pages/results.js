import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProductCard from '@/components/ProductCardJeefx'
import { useProductsProvider } from '@/context/AllProductsProviderJeefx'
const Results = ({}) => {
    const router = useRouter()

    const {products} = useProductsProvider()



    const allProducts = products.map(item => {
        return {value:item.title, data:item}
    })
    const {search} = router.query


    const [options, setOptions] = useState([])
   
    
    useEffect(() => {
        const searchHandler = (currentValue) => {
            if (!currentValue) return setOptions([])
            const relatedOptions = allProducts?.filter(item => item.value.toLowerCase().includes(currentValue.toLowerCase()))
            setOptions(relatedOptions)
          }
        searchHandler(search)
    }, [search])
    
    if(!products){
        return <div>Loading...</div>
    }
  return (
    <div className='min-h-screen '>
        <div  className='w-[80%] flex flex-wrap justify-center mx-auto gap-5 py-12'>
        {options?.length ? options.map(item =>{
            return <ProductCard key={item.data.id}  title={item.value} featuredImage={item.data.featuredImage.url} id={item.data.id} vendor={item.data.vendor} price={item.data.priceRange.minVariantPrice.amount} /> 
        }) :<h1 className='text-5xl'>Item Not Found</h1> }
      </div>
    </div>
  )
}

export default Results
