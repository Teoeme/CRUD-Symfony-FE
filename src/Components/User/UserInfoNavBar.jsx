import { LogoutOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useAuth } from '../Providers/AuthProvider'

const UserInfoNavBar = () => {
    const{logout,user}=useAuth()
    console.log(user)
  return (
    <div className={` h-16 w-40 bg-white/5 efecto-vidrio flex items-center gap-2 p-2 z-50
    `}>
        <div className='h-full aspect-square overflow-hidden'>
            <Image src={user?.image || '/assets/user.png'} height={60} width={60} className='h-full w-full rounded-full shadow-md overflow-hidden object-cover' />
        </div>
        <div className=' text-2xs font-thin text-white'>
            <p className=' font-light'>{user?.name}</p>
            <p>{user?.username}</p>
        </div>
        <div className='absolute bottom-0 right-0 '>

        <IconButton size='small' onClick={logout}><LogoutOutlined  fontSize='small' className=' text-white/60'/></IconButton>
        </div>
    
    </div>
  )
}

export default UserInfoNavBar