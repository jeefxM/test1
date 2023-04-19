import { prisma } from "@/utils/database/dbJeefx"
import { createCollection } from "@/utils/shopifyadminJeefx"




export default async function handler(req,res) {
    if(req.method !== 'POST'){
        return res.status(400).json({message:'request should be post'})
    }

    const data = JSON.parse(req.body)
    const {name,  user, category, description } = data




    const checkStore = await prisma.store.findUnique({
        where:{
            name: name
        }
    })

    if(checkStore){
        return res.status(500).json({message:`Store with name ${name} already exists`})
    }   

    const createshopifyCollection = await createCollection({input:{handle: name.toLowerCase().replace(' ', '-'), title: name,  ruleSet:{
        appliedDisjunctively:false,
            rules:{
          column:"VENDOR",
          relation:"EQUALS",
          condition:name
          
          
        },
        },
        descriptionHtml:description,
        seo:{title: `${name} - ThirdMerch ` , description:description}, sortOrder:"CREATED_DESC",
         } })

    
    const id  = createshopifyCollection.data.collectionCreate.collection.id



    if(!id){
        return res.json({message:createshopifyCollection.data.collectionCreate.userErrors[0].message})
    }


    const createStore = await prisma.store.create({
        data:{
        
        name: name.toLowerCase().replace(' ', '-'),
        id: id,
        category: category,
        logo: 'https://api.dicebear.com/5.x/pixel-art/svg?seed=JohnDoe',
        user:{
            connect: {
                id: user
            }
        }
    }
    })

    return res.status(200).json({messaged: 'created'})


}