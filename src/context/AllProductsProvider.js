import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { getAllProducts } from "@/utils/shopifyJeefx"
import React from "react"
const ProductsContext  = createContext()


export const useProductsProvider = () => {
    return useContext(ProductsContext)
    
}

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([])
  
    const getShopifyProducts = useCallback(async () => {
      const res = await getAllProducts()
      setProducts(res)
    }, [])
  
    useEffect(() => {
      getShopifyProducts()
    }, [getShopifyProducts])
  
    return (
      <ProductsContext.Provider value={{products:products}}>
        {children}
      </ProductsContext.Provider>
    )
  }