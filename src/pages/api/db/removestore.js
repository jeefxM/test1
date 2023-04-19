import { prisma } from "@/utils/database/dbJeefx";
import { deleteShopifyCollection } from "@/utils/shopifyadminJeefx";

export default async function handler(req,res)  {
    if(req.method !== "POST"){
        return res.status(500).json({message:"POST methods only"})
    }

    const data = JSON.parse(req.body)
    const {id} = data

    const deleteStore = await prisma.store.delete({
        where:{
            id: id
        }
    })
    const deleteShopifyStore = await deleteShopifyCollection({input:{id:id}})



    return res.status(200).json({message: 'success'})



}