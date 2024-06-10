'use client'
import Link from 'next/link'
import React from 'react'
import UserInfoNavBar from './User/UserInfoNavBar'
import { usePathname } from 'next/navigation'
import { useAuth } from './Providers/AuthProvider'

const items=[
    {
        label:'Productos',
        href:'/productos',
        public:true
    },
    {
        label:'Categorias',
        href:'/categorias',
        public:false
    },
    {
        label:'Usuarios',
        href:'/usuarios',
        public:false
    },
    // {
    //     label:'Atributos',
    //     href:'/atributos',
    //     public:false
    // },
   
]

const NavBar = ({children}) => {
    const {isAuthenticated}=useAuth()

  return (
    <div className=' h-full flex'>
        <div className=' flex flex-col h-full text-5xl font-thin gap-6 p-6 text-white w-[15%] min-w-[300px]'>
            {items?.map((el,idx)=>{
                const path=usePathname()
                if(!el.public && !isAuthenticated) return
                return(
                    <Link href={el.href}
                    className={`
                        hover:font-extralight
                        ${path===el.href && 'font-light'}
                        `}
                    >{el.label}</Link>
                )
            })}
        </div>
      {isAuthenticated ?  <div className='absolute right-3 top-3'>
            <UserInfoNavBar />
        </div> : <Link href={'/login'}
        className='absolute top-1 right-4 text-xxs text-white'
        >Ingresar</Link>}
        <main className='  w-full p-6'>
        {children}
        </main>

    </div>
  )
}

export default NavBar