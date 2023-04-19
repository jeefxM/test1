import React, { useEffect } from "react";
import { getExclusives } from "@/utils/queries/graphqlJeefx";
import ProductImages from "@/components/Productpage/ProductImagesJeefx";
import ProductInfo from "@/components/Productpage/ProductInfoJeefx";
import { productGateChecker } from "@/utils/shopifyadminJeefx";
import { findCollection } from "@/utils/shopifyJeefx";
import { shopifyFetch } from "@/utils/shopifyJeefx";
const ProductPage = ({data, gatesRes, product}) => {
  const gatesConfig =  gatesRes.data.product.gates.filter(item => item.configuration.reaction)

  return (
    <main className=" text-black dark:text-white w-full min-h-screen">
      <div className="w-[80%] h-full m-auto flex pt-20  sm:flex-col">
        <ProductImages
          featuredImage={product.featuredImage?.url}
          image={product?.images}
        />
        <ProductInfo
          title={product?.title}
          vendor={product?.vendor}
          featuredImage={product?.featuredImage?.url}
          id={product?.id}
          variants={product?.variants?.edges[0]}
          gates={gatesConfig}
        />
      </div>
    </main>
  );
};

export async function getServerSideProps(context) {
  const { id} = context.query;






    const response = await shopifyFetch(
      `query($id:ID!){product(id: $id){
        title
        id
        description
        vendor
        featuredImage{
          url
        }
        collections(first:1){
          nodes{
           id
         }
        }
        images(first:3){
          edges{
            node{
              url
            }
          }
        }
        variants(first:10){
          edges{
            node{
              id
              title
              price{
                amount
              }
              compareAtPrice{
                amount
              }
            }
          }
        }
      }}`,
      { id: `gid://shopify/Product/${id}` }
    );

    const product = response.data
    

      
      // check for product gates
      const gatesRes = await productGateChecker({id:`gid://shopify/Product/${id}`}, response.data.data.product.collections.nodes[0].id)

  
    return {
      props: {
        product,
        gatesRes
        
      },
    };
}

export default ProductPage;
