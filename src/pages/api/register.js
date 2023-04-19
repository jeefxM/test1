import bcrypt from 'bcrypt'
import { prisma } from '@/utils/database/dbJeefx'
import { hash } from 'bcrypt'

export default async function handler(req,res){

   if(req.method ==='POST'){
      if(!req.body){
         return res.status(404).json({error:'No data'})
      }
      const data = JSON.parse( req.body)
      const {username, email, password} = data



      const checkUserName = await prisma.user.findUnique({
         where:{
            username: username
         }
      })

      const checkEmail = await prisma.user.findUnique({
         where:{
            email: email
         }
      })

      if(checkUserName ){
         return res.status(422).json({message:"Username already exists "})
      }

      if(checkEmail ){
         return res.status(422).json({message:"Email is already registered"})
      }
     

      const user = await prisma.user.create({
         data:{
         email: email,
         password: await hash(password,12),
         username: username
         }
          
     
        })
      
      return res.status(201).json({message: "user created", user:user})

      



   }
   res.status(500).json({message:'HTTP method not valid, Only POST accepted'})


 



   




}