import React, {useState, useEffect} from 'react'
import { prisma } from '@/utils/database/dbJeefx';
import { getSession } from 'next-auth/react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../components/ui/collapse";
import { Input } from '@/components/ui/inputJeefx';
import { Label } from "@/components/ui/labelJeefx";
import { saveCustomerInfo } from '@/utils/database/updateuserJeefx';

const Settings = ({user, client}) => {

    const [buyerIdentity, setBuyerIdentity] = useState(user);
    useEffect(() => {
      setBuyerIdentity(user);
    }, [user]);


    const delivery = [
        "firstName",
        "lastName",
        "phone",
        "city",
        "country",
        "address",
        "zip",
      ];
    
     
    
      const setIdentity = async (e) => {
        const field = e.target.id;
        const value = e.target.value;
    
        setBuyerIdentity((prevState) => ({
          ...prevState,
          [field]: value,
        }));
      };
    
      //Inputs
      const deliveryInputs = delivery.map((input) => {
        return (
          <div className="w-1/3 sm:w-full px-4 py-4" key={input}>
            <Label
              htmlFor={input}
              className="dark:text-white text-black text-2xl pb-2  "
            >
              {input.toLocaleUpperCase()}
            </Label>
            <Input
              id={input}
              className="w-full text-black border-buttonsecond border-2"
              onChange={setIdentity}
              value={buyerIdentity[input] }
            />
          </div>
        );
      });

  return (
    <div className='w-full min-h-screen'>
        <div className='collapses w-[80%] mx-auto py-20'>
            <h1 className='font-bold text-5xl mb-6'>Settings</h1>
        
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-3xl">
                      Account
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="inputfieds flex flex-wrap sm:flex-col w-full h-[auto]">
                        {deliveryInputs}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-3xl">
                      Orders
                    </AccordionTrigger>
                    <AccordionContent>
                      Empty.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-3xl">
                      Wallets
                    </AccordionTrigger>
                    <AccordionContent>
                      {/* <ConnectWallet className="max-w-[300px]" /> */}
                    </AccordionContent>
                  </AccordionItem>
                  
                </Accordion>
                <button
                  className="bg-button color-white p-3 my-3 m text-white  rounded-md border-b-4 border-black hover:bg-hover active:bg-buttonsecond"
                  onClick={() => saveCustomerInfo(buyerIdentity)}
                >
                  Save Account Info
                </button>
        </div>
       
      
    </div>
  )
}


export const getServerSideProps = async (context) => {
    const client = await getSession(context);
    if (!client) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  
    const user = await prisma.user.findUnique({
      where:{
        email: client.user.email
      }
    })
  
      return {
        props: { client, user },
      };
  };
  

export default Settings
