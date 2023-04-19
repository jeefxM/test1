import React, { useState } from 'react'
import { Select } from '@geist-ui/core'



const Filter = ({router, productTags,page,activeFilter, setActiveFilter, categories, setStoreState,stores, storeProducts,setStoreProducts}) => {


  //filter products

  const filterProducts= (tag) => {
    if(tag === 'all'){
        setStoreProducts(storeProducts)

    }else{
        const filteredProducts = storeProducts.filter(product => product.tags.includes(tag))
        setStoreProducts(filteredProducts)

    }

  }

  //filterStores
  

  const filterStores= (category) => {
    if(category = 'all'){
      setStoreState(stores)
    }else{
      const filteredStores = stores.filter(item => item.category === category)
      setStoreState(filteredStores)
    }
    
  }



  
 
  return (
    <div className='w-full'>
    <div className='items-center flex  h-16 border-b-2 border-black dark:border-white relative'>
        <div className='headers flex  h-full w-2/4 sm:w-3/4 '>
          <h2 className={`text-2xl sm:text-xl cursor-pointer border-r-2 border-black dark:border-white transition-all   h-full flex items-center font-bold justify-center w-1/2 ${activeFilter === 'products' ? 'bg-buttonsecond text-white' : ''}  `} onClick={() =>setActiveFilter('products')}>Products</h2>
          <h2 className={`text-2xl border-r-2 sm:text-xl  cursor-pointer border-black dark:border-white  h-full flex items-center font-bold justify-center w-1/2 ${activeFilter === 'store' ? 'bg-buttonsecond text-white' : ''}  `} onClick={() =>setActiveFilter('store')}>Stores</h2>

        </div>
        <div className='filter-show w-2/4   px-10 sm:px-2  '>
        <div className='Select w-full'>
            {activeFilter === 'products' ?
            <>
            <Select placeholder='Products' width={'80%'} onChange={filterProducts}  >
            <Select.Option value='all'>All</Select.Option>

                {productTags.map((tag,index) => {
                    return  <Select.Option key={index +1} value={tag}>{tag}</Select.Option>
                })}
            </Select>
            </>
            :
            <>
            <Select placeholder='Stores' width={'80%'} onChange={filterStores} >
            <Select.Option value='all'>All</Select.Option>
              {categories.map((category, index) => {

                    return  <Select.Option key={index +1} value={category}>{category}</Select.Option>

              })}
                

            </Select>
            </>
}
        </div>

        </div>
        

    </div>


      
    </div>
  )
}

export default Filter
