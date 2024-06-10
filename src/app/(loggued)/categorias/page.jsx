'use client'
import CategoriesAdmin from '@/Components/Categories/CategoriesAdmin'
import { useAuth } from '@/Components/Providers/AuthProvider'
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
      <CategoriesAdmin />
      </div>
  )
}

export default page