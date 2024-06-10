'use client'
import { useAuth } from '@/Components/Providers/AuthProvider'
import UsersAdmin from '@/Components/Users/UsersAdmin'
import { useRouter } from 'next/navigation'
import React from 'react'


const page = () => {
    const {isAuthenticated}=useAuth()
    const router=useRouter()
    if(!isAuthenticated){
router.push('/login')
    }

  return (
    <div className=' h-full w-full flex items-center'>
        <UsersAdmin />
    </div>
  )
}

export default page