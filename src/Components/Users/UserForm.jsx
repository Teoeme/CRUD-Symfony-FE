import { FormControlLabel, Switch, TextField, ThemeProvider } from '@mui/material'
import React from 'react'
import { lightTheme } from '../Providers/Providers'
import LoadingButton from '../Commons/LoadingButton'
import RoleSelector from './RoleSelector'

const UserForm = ({form,handleChange,handleSubmit,loading}) => {
  return (
    <div className='p-2 flex flex-col gap-4 pt-5'>
        
        <ThemeProvider theme={lightTheme}>
            <TextField 
            name='name'
            value={form?.name}
            onChange={handleChange}
            label="Nombre"
            />
            <TextField 
            name='image'
            value={form?.image}
            onChange={handleChange}
            label="Imagen Url"
            />

      {form?.Mode==='Add' &&      <TextField 
            name='username'
            value={form?.username}
            onChange={handleChange}
            label="Username"
            />}

            <TextField 
            name='email'
            value={form?.email}
            onChange={handleChange}
            label="Email"
            />

            <RoleSelector value={form?.roles} onChange={handleChange}/>
           {form?.Mode==='Edit' && <TextField 
            name='oldPassword'
            value={form?.oldPassword}
            onChange={handleChange}
            label="Contraseña actual"
            />}
            <TextField 
            name='password'
            value={form?.password}
            onChange={handleChange}
            label="Nueva Contraseña"
            />
           
        <FormControlLabel control={<Switch checked={form?.is_active} onChange={(e)=>{handleChange({target:{name:'is_active',value:e.target.checked}})}}  name='is_active'/>} label='Activo' className='text-zinc-400' />

           <div className=' w-full flex justify-end'>
            <LoadingButton 
            title={'Guardar'}
            onClick={handleSubmit}
            loading={loading}
            />
           </div>

        </ThemeProvider>
    </div>
  )
}

export default UserForm