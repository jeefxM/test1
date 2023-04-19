import { PrismaClient } from "@prisma/client"



const prisma = new PrismaClient()
export default async function handler(req,res) {
    if(req.method !== 'POST'){
        return res.status(500).json({message :"Only POST requests allowed"})
    }

    const data = JSON.parse(req.body)
    const {id, storeId} = data
   
        const deleteFollower = await prisma.StoreFollowers.deleteMany({
            where:{
                id: id,

                store: {
                    some:{
                    id: storeId
                    }
                }
            },

        })
        return res.status(200).json({message:"Unfollowed"})

  
    

}