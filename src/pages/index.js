import HeroSection from "@/components/HeroSectionJeefx";
import About from "@/components/AboutJeefx";
import Products from "@/components/ProductsJeefx";
import Exclusives from "@/components/ExclusivesJeefx";
import { shopifyFetch } from "@/utils/shopifyJeefx";
import { GET_HOMEPAGE_ITEMS, getExclusives } from "@/utils/queries/graphqlJeefx";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";


export default function Home({maincollection, exclusives}) {
  
   const homepageCollection = maincollection.data.data.collection;
   const exclusiveCollection = exclusives.data.data.collection

  return (
    <main>
      <HeroSection />
      <About />
      <Products homepageCollection={homepageCollection} />
      <Exclusives exclusives={exclusiveCollection} />
    </main>
  );
}

export const getServerSideProps = async (context) => {
  const homepageCollections = await shopifyFetch(GET_HOMEPAGE_ITEMS)
  const exclusives = await shopifyFetch(getExclusives)
  const client = await getSession(context)
  const prisma = new PrismaClient()



  if(client !== null){
  const user = await prisma.user.findUnique({
    where:{
      email: client.user.email
    }
  })
  return { props: {
    maincollection: homepageCollections,
    exclusives: exclusives,
    user,
    
  } }
}else{

  return { props: {
    maincollection: homepageCollections,
    exclusives: exclusives,
    user: null,
    
    } 
  }
 
  

  };
}

