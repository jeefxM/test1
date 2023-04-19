import { shopifyAdmin } from "@/utils/shopifyadminJeefx"

export default async function handler(req, res) {
  try{
    const queryJson = JSON.parse(req.body)


    const resposne = await fetch('https://thirdmerch.myshopify.com/admin/api/unstable/graphql.json',{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": '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',
      },
      body: JSON.stringify({ query: queryJson.query, variables: queryJson.variables })
  
    })
    const data =  await resposne.json()

  
    return res.json({data:data})
  
  }catch(error){
    console.log(error)
    return res.json(error)
  }

}

export const deleteGateConfiguration = async (input) => {
  const res = await shopifyAdmin(`mutation($input:GateConfigurationDeleteInput!){
    gateConfigurationDelete(input:$input){
      deletedGateConfigurationId
    }
  }`, input)
  return res.data
} 