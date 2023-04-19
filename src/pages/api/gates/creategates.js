import { createGates } from "@/utils/shopifyadminJeefx";
import { createGateSubject } from "@/utils/shopifyadminJeefx";

export default async function handler(req,res) {
    if(req.method !== "POST"){
        return res.status(500).json({message:"Req Method Should Be POST"})
    }

    const {requirements, reaction, products,name,shopId} = JSON.parse(req.body)
    try{
    const createGate = await createGates({input: {
        name:name ,
        handle:shopId.replace('gid://shopify/Collection/', ''),
        metafields: [{
          namespace: shopId.replace('gid://shopify/Collection/', ''),
          key: "requirements",
          type: "json",
          value: JSON.stringify(requirements)
        }, {
            namespace: shopId.replace('gid://shopify/Collection/', ''),
            key: "reaction",
            type: "json",
            value: JSON.stringify(reaction)
          }]
    }})


    const id = createGate.data.gateConfigurationCreate.gateConfiguration.id
    for(const item of products){
        const subjectGate = await createGateSubject({input:{
            gateConfigurationId:id,
            subject:item.id,
            active: true
    
        }})

        console.log(subjectGate.data)
    }
         
        
    
    

    }catch(error){
        console.log(error)
        return res.json(500).message({error:error})
    }

    return res.status(200).json({message:"Gate Created"})

} 