import { prisma } from "@/utils/database/dbJeefx";
import { updateShopifyCollection } from "@/utils/shopifyadminJeefx";
import { stageImageUpload } from "@/utils/shopifyadminJeefx";
import sharp from 'sharp'

 export default  async function handler(req,res)  {
    if(req.method !== 'POST'){
        return res.status(500).json({message: "Invalid method"})
    }
    const info = JSON.parse(req.body)
    const { data, changed } = info

    const checkStore = await prisma.store.findMany({
        where:{
            name: data.name
        }
    })

    if(checkStore && changed){
        return res.json({message: "Store with this name already exists"})
    }

    const updateStore = await prisma.store.update({
        where:{
            id: data.id
        },
        data: data
    })




    


    return res.status(200).json({message: "updated"})



} 