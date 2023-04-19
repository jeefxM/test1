import { createBasicDiscount } from "@/utils/shopifyadminJeefx"
import uuid4 from "uuid4"
import { applyDiscountsCheckout } from "@/utils/shopifyJeefx"


export default async function handler(req,res) {
    if(req.method !== 'POST'){
        return res.status(500).json({method:"Method should be POST"})
    }
    const {checkout, productId} = JSON.parse(req.body)
  const now = new Date()
  const randomid = uuid4()

  const toISO = now.toISOString() 

    const discountApply = await createBasicDiscount( {basicCodeDiscount:{
        title:"test",
        customerSelection:{
          all:true
        },
        startsAt:toISO,
        usageLimit:1,
        customerGets:{
            items:{
                products:{
                  productsToAdd:[productId]
                }
              },
          value:{
            percentage: 0.15
          }
        },
        code:randomid
      }})
   const dicountCode = discountApply.data.discountCodeBasicCreate.codeDiscountNode
   

}