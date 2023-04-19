import React, { useEffect, useState, useCallback } from 'react'
import { Pagination } from '@geist-ui/core'
import { useRouter } from 'next/router'
import ProductCard from '@/components/ProductCardJeefx'
import Filter from '@/components/collections/FilterJeefx'
import StoreCard from '@/components/collections/StoreCardJeefx'
import { useProductsProvider } from '@/context/AllProductsProviderJeefx'
import { getAllCollections } from '@/utils/shopifyJeefx'




const Collection = ({stores}) => {

  const {products} = useProductsProvider()



  const [pageNumber, setPageNumber] = useState(1) 

  const start = (pageNumber - 1) * 10;
  const end = start + 10;
  const pages = Math.ceil(products.length / 10)

  //retrieve tags from products
  const [nonDuplicateTags, setNonDuplicateTags] = useState([]);
  const [nonDuplicateCategories, setNonDuplicateCategories] = useState([])


    //store products
    const [storeProducts, setStoreProducts] = useState() 

    const [storeState, setStoreState] = useState(stores)

    useEffect(() => {
      setStoreProducts(products);
    }, [products]);


  const memorizedTags = useCallback(() => { 

   const items = products.map(item => {
      return item.tags[0]
    })

    const filteredTags = items.filter((tag, index) => {
      return items.indexOf(tag) === index
    })


     setNonDuplicateTags(filteredTags)
  }, [products])

  const memorizedCategories = useCallback(() => { 

    const items = stores.map(item => {
       return item.category
     })
 
     const filteredTags = items.filter((tag, index) => {
       return items.indexOf(tag) === index
     })
 
 
     setNonDuplicateCategories(filteredTags)
   }, [stores])


  
  useEffect(() => {
    memorizedTags()
    memorizedCategories()
  }, [products, stores])



  const pageProducts = products.slice(start,end).map(item => {
    return  <ProductCard key={item.id} id={item.id} title={item.title} featuredImage={item.featuredImage.url} price={item.priceRange.minVariantPrice.amount} vendor={item.vendor} />
  })

  const storeList = storeState.slice(start, end).map(item => {
    if(item.handle === 'homepage' || item.handle === 'exclusives' || item.handle === 'frontpage' ){
      return
    }else{
    return <StoreCard  key={item.id} id={item.id} name={item.handle} category={item?.category} description={item?.description} logo={item.image?.url}  seo={item.seo}  />
    }
  })
  const router = useRouter()
  const changePage = (val) => {

    setPageNumber(val)
  }

 
     const [activeFilter, setActiveFilter ] = useState('products')



  return (
    <div className='min-h-screen relative '>
      <Filter router={router} productTags={nonDuplicateTags} page={pageNumber} activeFilter={activeFilter} setActiveFilter={setActiveFilter} categories={nonDuplicateCategories} setStoreState={setStoreState} stores={stores} storeProducts={products} setStoreProducts={setStoreProducts} />
    
     
      <div className='w-full justify-center px-[10%]  flex gap-10 flex-wrap py-10 pb-24'>
        { activeFilter === 'products' ?
       <>{pageProducts}</> :
        <>{storeList}</>
        }
      </div>

      <div className='absolute w-full flex justify-center bottom-4'>
      <Pagination count={pages} onChange={(val) => changePage(val)} initialPage={1} />
      </div>
    </div>
  )
}
export const getServerSideProps = async() => {


  const collections = await getAllCollections()


  return {
    props:{
      stores:collections

     

    }
  }




}

export default Collection


