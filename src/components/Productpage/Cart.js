import React, {useState, useEffect} from "react";
import { Drawer } from "@geist-ui/core";
import CartProductBlock from "./CartProductBlock";
import { formatCurrency } from "@/utils/CurrencyFormaterJeefx";
import { useRouter } from "next/router";
import { useCart } from "@shopify/hydrogen-react";
import { useShoppingCart } from "@/context/ShoppingCartProviderJeefx";
const Cart = ({  }) => {



  const {lines} = useCart()
  // Update cartQuantity when ca rtItems changes
  const [cartPrice, setCartPrice] = useState(0)

  useEffect(() => {
    const itemPrice = lines.reduce((total, item) =>  item.cost.totalAmount.amount , 0)
    setCartPrice(itemPrice)
  }, [lines])

  const {cart, openCart} = useShoppingCart()

  //redirect to checkout
  
  const router = useRouter()
  
  const {checkoutUrl} = useCart()


  const redirectToCheckout = async () => {
    router.push(checkoutUrl)
    
  }
 
  return (
    <>

      <Drawer
        visible={cart}
        onClose={() => openCart(false)}
        placement="right"
        className="relative"
      >
        <div className="w-[400px] sm:w-[250px] h-[80%] ">
          <h2 className="w-full text-center font-bold text-3xl pb-4">
            My Cart
          </h2>
          <CartProductBlock />
         
        </div>
        <div className="Sum flex justify-between w-full font-bold text-2xl">
          <div className="subtotal">
            <h3 className="">Subtotal</h3>
          </div>
          <div className="">
            {formatCurrency(cartPrice)}
          </div>
          
        </div>
        <div className="absolute checkout bottom-5">
          <button  onClick={redirectToCheckout} className="bg-button color-white p-3 text-white font-bold text-3xl rounded-md border-b-4 border-2 border-black  hover:bg-hover active:bg-buttonsecond w-full">CHECKOUT</button>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
