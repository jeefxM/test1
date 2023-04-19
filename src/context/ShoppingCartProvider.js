import React, {createContext, useContext,  useState} from "react"


const ShoppingCartContext = createContext()



export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}




export function ShoppingCartProvider({children}) {

    const [cart, openCart] = useState(false)
    
    return(<ShoppingCartContext.Provider value={{ cart, openCart    }}>
        {children}
    </ShoppingCartContext.Provider>)
}



