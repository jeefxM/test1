import React, { useEffect, useState } from 'react'
// import { useShoppingCart } from '@/pages/context/ShoppingCartProviderJeefx'
import { formatCurrency } from '@/utils/CurrencyFormaterJeefx'
import { useCart } from '@shopify/hydrogen-react'

const CartProductBlock = () => {

  const {linesRemove, lines,  linesAdd, linesUpdate} = useCart()

  // const {cartItems, removeItem,  } = useShoppingCart()


  const cartRemove =(obj) => {
   
    const line = lines.find(cart=> cart.merchandise.id === obj.merchandiseId)
    
    linesRemove(line.id)
    // removeItem(obj)

  }



  const cartIncrease = (obj) => {  

    const line = lines.find(cart=> cart.merchandise.id === obj.id)


    linesUpdate([{id: line.id, quantity: line.quantity + 1}])



  }



  const cartDecrease =  (obj) => {
    const line = lines.find(cart=> cart.merchandise.id === obj.id)

  
    linesUpdate([{id: line.id, quantity: line.quantity - 1}])



  



  }

   

  return (
    <div className='h-[80%] overflow-y-scroll overflow-x-hidden'>
        {lines.length === 0 ? 
        <h1>EMPTY CART </h1> :
        lines.map(item => {

            return(<div key={item.id} className='w-[400px] sm:w-[250px] relative py-6 '>
                <button className='remove absolute right-10 top-0 text-xl font-bold text-red' onClick={() => cartRemove({ merchandiseId: item.merchandise.id, size:item.merchandise.selectedOptions.value})} >X</button>
<div className="product-img w-[full] h-[100px] flex" >
              <img
                src={item.merchandise.image.url}
                alt={item.merchandise.image.alt}
                className="w-[100px] h-[100px] object-cover rounded-md border-black border-2 "
              />
              <div className="product-info px-3 font-bold flex flex-col">
                <p className='text-left'>{item.merchandise.product.title}</p>

               <p className="text-left text-[#13EA5B] ">{formatCurrency(item.merchandise.price.amount * item.quantity )}</p> 
               <div className="text-left flex  ">
                 <p  className='border-2 border-black w-[20px] text-center mx-1 '> {item.merchandise.selectedOptions[0].value} </p>
         </div> 
            <div className='flex pt-1'>
               <button
          className="w-8 h-8 border-black dark:border-white text-white border-2 text-xl font-bold text-center rounded-md bg-button"
          onClick={() =>cartIncrease({id:item.merchandise.id,  size:item.merchandise.selectedOptions[0].value, })}
        >
          +
        </button>
        <div className="quantitystate px-5 font-bold text-xl ">{item.quantity}</div>

        <button
                  onClick={() =>cartDecrease({id:item.merchandise.id,  size:item.merchandise.selectedOptions[0].value, })}

          className="w-8  h-8 border-black dark:border-white text-white border-2 text-xl font-bold text-center rounded-md bg-button"
        >
            -
      
        </button>
        </div>
              </div>
            </div>
                </div>
                 )
        })}
      
    </div>
  )
}

export default CartProductBlock
