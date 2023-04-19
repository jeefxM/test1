import { PrismaClient } from "@prisma/client"



const prisma = new PrismaClient()
export default async function handler(req,res) {
    if(req.method !== 'POST'){
        return res.status(500).json({message :"Only POST requests allowed"})
    }

    const data = JSON.parse(req.body)
    const {id, username, email, avatar, storeId,remove} = data
//remove follower
 

    //check if user is following when page loads

   

    const addFollowerToDb = await prisma.StoreFollowers.create({
        data:{
        id: id,
        username: username,
        email: email,
        avatar: avatar,
        user: {
            connect:{
                id: id
            }
        },
        store:{
            connect: {
                id: storeId
            }
        }
        
        
    }})


    return res.status(200).json({message:"Created"})
    

}