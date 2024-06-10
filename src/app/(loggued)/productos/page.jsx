'use client'
import ProductosList from '@/Components/Productos/ProductosList'
import ProductsAdministrator from '@/Components/Productos/ProductsAdministrator'
import ProductsPublic from '@/Components/Productos/Public/ProductsPublic'
import { useAuth } from '@/Components/Providers/AuthProvider'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const {isAuthenticated}=useAuth()
    
  return (
    <div className=' h-full w-full flex items-center'>
        {isAuthenticated ? 
        <ProductsAdministrator
    />
    :
<ProductsPublic />    }
    </div>
  )
}

export default page