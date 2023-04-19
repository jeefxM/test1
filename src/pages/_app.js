import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/LayoutJeefx";
import { useState, useEffect } from "react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { CartProvider } from "@shopify/hydrogen-react";
import { ShopifyProvider } from "@shopify/hydrogen-react";
import { ShoppingCartProvider } from "../context/ShoppingCartProvider";
import { getAllProducts } from "@/utils/shopifyJeefx";
import { ProductsProvider } from "@/context/AllProductsProviderJeefx";

export default function App({ Component, pageProps, session }) {
  
  const [avatar, changeAvatarImg] = useState("");
  
  useEffect(() => {
    
    if(!pageProps.user?.username ){
      
      changeAvatarImg('https://api.dicebear.com/5.x/pixel-art/svg?seed=JohnDoe')
    }else{

      changeAvatarImg(`https://api.dicebear.com/5.x/pixel-art/svg?seed=${pageProps.user.username}`)
    }
  }, [pageProps])



  

  

  return (
    <SessionProvider session={session}>
      <ShoppingCartProvider>
      <ThirdwebProvider
        activeChain={ChainId.Mumbai}
        authConfig={{
          // Here we specify the domain, which should match the domain
          // conigured on the backend
          domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
          authUrl: '/api/third',

        }}
        
      >
        <ProductsProvider>
        <ShopifyProvider storeDomain="https://thirdmerch.myshopify.com" storefrontToken="7627dc0e276c4b485eb9caaac1167a12" storefrontApiVersion='2023-01'   countryIsoCode="US"
      languageIsoCode="EN" >
        <CartProvider
       
        >
          <Layout avatar={avatar} changeAvatar={changeAvatarImg}>
            <Component
              {...pageProps}
              avatar={avatar}
              changeAvatar={changeAvatarImg}
            />
          </Layout>
        </CartProvider>
        </ShopifyProvider>
        </ProductsProvider>
      </ThirdwebProvider>
      </ShoppingCartProvider>
    </SessionProvider>
  );
}



