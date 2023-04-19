import React, {useState,} from 'react'
import { useAddress } from '@thirdweb-dev/react';
import {  useAuth, useMetamask } from "@thirdweb-dev/react";
import {  signOut,  } from "next-auth/react";

const Discount = ({isLogged, setLogState}) => {


  const auth = useAuth();
  const address = useAddress();
  const connect = useMetamask();


 
 
  

  const [generatedDiscount, setGeneratedDiscount] = useState("");


  const loginWithWallet = async () => {

    const test = await auth?.login();
    setLogState(true)



  };
  return (
    <div className='my-3'>

{isLogged ? (
        <button className="discountbtn  font-bold color-white p-3 text-white rounded-md border-b-4 border-2 border-black  w-full" onClick={() => signOut()}>Logout</button>
      ) : address ? (
        <button className=" discountbtn  font-bold color-white p-3 text-white rounded-md border-b-4 border-2 border-black  w-full" onClick={() => loginWithWallet()}>Verify To Get Discount</button>
      ) : (
        <button className=" discountbtn  font-bold color-white p-3 text-white rounded-md border-b-4 border-2 border-black  w-full" onClick={() => connect()}>Connect Wallet </button>
      )}
     
        
     {address && (
        <pre className='text-black'>
          Connected Wallet: {address.slice(0, 4)}...{address.slice(-6)}
        </pre>
      )}

        
     

      
    </div>
  )
}

export default Discount
