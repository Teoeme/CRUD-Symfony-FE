'use client'
import { useAuth } from '@/Components/Providers/AuthProvider'
import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const page = () => {
const [values, setValues] = useState({username:'',password:''});

const handleChange=(e)=>{
    const {value,name}=e.target
    setValues(pv=>({...pv,[name]:value}))
}
    const{login}=useAuth()

const handleLogin=async()=>{
    await login(values.username,values.password,'/productos')
}
  return (
    <div className='h-full items-center flex w-full justify-center'>
        <div className=' efecto-vidrio h-[200] w-[300px] flex flex-col gap-3 p-10'>
            <TextField 
            size='small'
            onChange={handleChange}
            name='username'
            value={values.username}
            label='usuario'/>

            <TextField label='contraseña' size='small' type='password' onChange={handleChange} name='password'
            value={values.password}
            onKeyUp={(e)=>{
                if(e.key==='Enter'){
                    handleLogin()
                }
            }}
            
            />

            <Button variant='outlined' onClick={handleLogin}>Iniciar Sesión</Button>
        </div>
    </div>
  )
}

export default page