import { PrismaClient } from "@prisma/client"



const prisma = new PrismaClient()
export default async function handler(req,res) {
    if(req.method !== 'POST'){
        return res.status(500).json({message :"Only POST requests allowed"})
    }

    const data = JSON.parse(req.body)
    const {email} = data
   
    const checkFollower = await prisma.StoreFollowers.findUnique({
        where:{
            email: email
        }
    })

    if(checkFollower){
        return res.status(301).json({message:'User already exists'})
    }
    return res.json({message: 'No Follower'})
  
    

}