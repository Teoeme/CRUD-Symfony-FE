
'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router=useRouter()
  router.push('/productos')
  
  return (
    <div>
      <h1 className=' text-5xl font-thin'>
        BIENVENIDOS
      </h1>
      <h1 className=' text-5xl font-extralight'>
        BIENVENIDOS
      </h1>
      <h1 className=' text-5xl font-light'>BIENVENIDOS</h1>

    
    </div>
  )
}

export default page