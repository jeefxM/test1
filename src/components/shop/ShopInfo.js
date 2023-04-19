import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Popover, User } from '@geist-ui/core'
import { FaPlus , FaFlag, FaInstagram, FaFacebook, FaTwitter, FaEnvelope, FaGlobe} from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { Modal } from '@geist-ui/core'
import Link from 'next/link'

const ShopInfo = ({ user, router, followers,  logoRef,store}) => {
    const {data: session} = useSession()
    //popover content
    const content = () => (
        <div className='text-red w-20 text-center'>
            <p> Block</p>
        <div className='flex'><FaFlag  size={15} className='px-1'/> <p> Report</p></div>
        </div>
    )

    const [followersCount, addFollower] = useState(followers.length)
    const [followed, markedAsFollower] = useState('Follow')

    useEffect(() => {
        const checkIsFollow = async () => {
            const res = await fetch('/api/db/followers/checkFollower', {
                method:"POST",
                body: JSON.stringify({email: session.user.email})
    
            })
    
            const data = await res.json()
            if(data.message === 'User already exists'){
                markedAsFollower('Followed')
                
            }
        }
        //check if user is following store or not
        if(session?.user?.email && followersCount > 0){
            
           
            checkIsFollow()
        }
        

        

    }, )
  


    const followBrand = async () => {
        

        if(session?.user?.email){
            if(followed === 'Follow'){
        addFollower( followersCount + 1 )
        markedAsFollower("Followed" ) 
        const res = await fetch('/api/db/followers/addfollower', {
            method:"POST",
            body:JSON.stringify({id:user.id, username:user.username, email:user.email, avatar: user.avatar, storeId:store.id})
        })
    }else{

        addFollower( followersCount - 1 )
        markedAsFollower("Follow" ) 

        const res = await fetch('/api/db/followers/removefollower', {
            method:"POST",
            body:JSON.stringify({id:user.id, storeId:store.id})
        })
    }
    //modal Controls



    }else{
        router.push('/login')

    }
    }
    const [modalState, setModalState] = useState(false)
    const closeHandler = () => {
        setModalState(false)
    }

    const copyLink = () => {
        const link =`https://thirdmerch.store/shop/${store.name}`
        navigator.clipboard.writeText(link)
    }



  return (
    <div className='ml-10 sm:ml-0 absolute sm:relative sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-center top-[100px] sm:top-0 '>
  <div className='storelogo  w-[200px] h-[200px] rounded-full left-10 bottom-0 bg-white  sm:left-[25%] flex justify-center items-center'>
        <img src={store.logo} className='object-fit rounded-full border-4 border-black dark:border-white' id='logopic' ref={logoRef}  />
      
    </div>         
        <div className='pt-3'>
            <h2 className='text-4xl font-bold'>{store.name}</h2>
        </div>
        <div className='owner pt-3 flex'>
        <User src={user?.avatar}  style={{padding:0}} />
        <p className='font-semibold'>{user?.name}</p>

        </div>
        <div className='follow flex pt-3 gap-2'>
            <Button variant='outline' className={`h-6 w-20 ${followed ==='Followed' ? "bg-buttonsecond" :""}`} onClick={() => followBrand() }> {followed} </Button>
            <Button variant='outline' className='h-6 w-20 whitespace-nowrap' id='copy-button' onClick={copyLink} > Copy Link </Button>
            <Popover content={content}>
            <Button variant='outline' className='h-6 w-5 whitespace-nowrap' > ... </Button>

    </Popover>

        </div>
        <div className='followers flex gap-2 pt-3'>
            <p onClick={() => setModalState(true)} className='cursor-pointer'>{followersCount} Followers</p>
            <Modal visible={modalState} onClose={closeHandler}>
        <Modal.Title>Followers</Modal.Title>
        <Modal.Content>
          <div className='w-full overflow-y-scroll'>
            <div>
                {followers?.map(follower=> {
            return <User key={follower.id}  src={follower.avatar} name={follower.username} scale={2}/>

                })}
            </div>
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={() => setModalState(false)}>Cancel</Modal.Action>
      </Modal>
        </div>
        <div className='pt-3 flex gap-2'>
        {store?.instagram ?
                <Link href={store.instagram || ''} target='_blank'><FaInstagram size={30} /></Link> : ""
            }
            {store.facebook ?        <Link href={store.facebook || ''} target='_blank' rel="noopener noreferrer"><FaFacebook size={30} /></Link> : 
            ""
 }
 {store.twitter ?         <Link href={store.twitter || ''}><FaTwitter size={30} /></Link> : ""
}
       {store.email?  <Link href={store.email || ''}><FaEnvelope size={30} /></Link> : "" }
       {store.website ?  <Link href={store.website || ''}><FaGlobe size={30} /></Link> : "" }
        </div>
    
      
    </div>
  )
}

export default ShopInfo
