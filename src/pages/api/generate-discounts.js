import { ThirdwebSDK, getContract } from "@thirdweb-dev/sdk";
import { useAddress } from "@thirdweb-dev/react";
import '@shopify/shopify-api/adapters/node'
import { getUser } from "./third/[...thirdweb]";
import { shopifyApi, Session} from "@shopify/shopify-api";

const {
    SHOPIFY_SITE_URL,
    SHOPIFY_ACCESS_TOKEN,
    NFT_COLLECTION_ADDRESS,
    SHOPIFY_DISCOUNT_ID,
  } = process.env;

 


  export default async function handler(req, res) {

    const shopify = shopifyApi({
        
        // The next 4 values are typically read from environment variables for added security
        privateAppStorefrontAccessToken:SHOPIFY_ACCESS_TOKEN,
        apiKey:"ae3486a1ad332c0cb7a37970c80072e4",
        apiSecretKey: "46fd34de0eb61d5666687449ad7bfca5",
        scopes:['read_discounts, write_discounts,write_products, read_products,'],
        hostName:"http://thirdmerch.store"
      });

    const session = new Session({
        id: '123123',
        state: 'state',
        shop: SHOPIFY_SITE_URL,
        accessToken:SHOPIFY_ACCESS_TOKEN,
        isOnline: true,
    })
    
    const {thirdwebUser} = req.body 


   


 if (thirdwebUser === undefined) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }


    const sdk = new ThirdwebSDK("mumbai")
    const edition = await sdk.getContract(NFT_COLLECTION_ADDRESS, 'edition-drop')  
    const balance = await edition.balanceOf(thirdwebUser, 0)  // const balance = await edition.balanceOf(thirdWebUser, 0)
    if (balance.eq(0)) {
        return res.status(401).json({ error: "Unauthorized" });
      }
     
   

     const client  = new shopify.clients.Rest({
        session
     })

     const product = await client.get({
        path: `/admin/api/2022-10/price_rules/${SHOPIFY_DISCOUNT_ID}/discount_codes.json`,
        data: {
          discount_code: {
            code: thirdwebUser,
            usage_count: 1,
          },
        },
      });

   

      res
      .status(200)
      .json({ discountCode: product.body.discount_codes[0].code });


  }