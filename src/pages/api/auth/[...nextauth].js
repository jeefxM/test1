import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()



export default NextAuth({
  // session:{
  //   strategy:"jwt"
  // },
  adapter: PrismaAdapter(prisma),
  
  providers: [
    CredentialsProvider({
      type:'credentials',
      credentials: {
       
        email: { label: "Email", type: "text ", placeholder: "jsmith@mail.com" },
        password: { label: "Password", type: "password" },
      },
      
      


      async   authorize(credentials, req) {


        const user = await prisma.user.findUnique({
          where:{
            email: credentials.email,
          }
        })



        if(!user){
          throw new Error('Email does not exists. Please make sure you insert the correct email .')

        }

        const checkPassword = await compare(credentials.password, user.password  )

        

         if (!checkPassword || credentials.email !== user.email ){
          throw new Error('User does not exists. Please make sure you insert the correct email & password.')

          }
          else {
            return user
          }

      }
     
    }),

    GoogleProvider({
      clientId: "242002028289-9oj2h4n6j328megkhk258jt58fhl7tff.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  pages:{
    signIn: '/profile',
    signOut: '/'
  },
  
  secret: "7ce4626b1a63f930f4964624538cfe9b",
  
});



