import { useProduct } from '@/Hooks/useProduct'
import { useUser } from '@/Hooks/useUser'
import { formatPeso } from '@/utils/dateHelpers'
import { AddOutlined, CheckBoxOutlineBlankOutlined, CheckBoxOutlined, CloseOutlined, EditOutlined } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import React from 'react'

const UserList = ({ setForm, form }) => {
  const { userList,deleteUser,loading} = useUser()
  const confirm=useConfirm()


  return (
    <div className='h-3/4 w-3/4 efecto-vidrio flex flex-col'>
      <div className='  w-full flex justify-between px-2 items-center py-2'>
        <IconButton color='success' onClick={() => {
          setForm(pv => ({ ...pv, Open: true, Mode: 'Add', Title: "Nuevo usuario" }))
        }}>
          <AddOutlined />
        </IconButton>

    
      </div>

      <div className=' flex flex-col p-4  flex-1'>


        <div className=' grid grid-cols-12 text-white text-xs font-light w-full border-b-[.5px] border-white/20 pb-2'>
          <p className=' col-span-3'>Nombre</p>
          <p className=' col-span-1'>Usuario</p>
          <p className=' col-span-3'>Email</p>
          <p className=' col-span-2 '>Roles</p>
          <p className=' col-span-1 text-center'>Activo</p>
          <p className=' col-span-2 text-right pr-2'>Acciones</p>
        </div>

        <div className='flex gap-3 flex-col'>
          {userList?.map((usr, idx) => {

            const handleDeleteUser=async()=>{
              confirm({
                title:'Eliminar usuario',
                description:`¿Desea eliminar el usuario: '${usr.username}'? Esta accion es irreversible`,
                cancellationText:"Cancelar",
                confirmationText:"Aceptar",
                cancellationButtonProps:{color:'error'},
                confirmationButtonProps:{color:"success"}
              }).then(async()=>{
                await deleteUser(usr.id)
                })
            }
            return (
              <div key={usr?.id} className='grid grid-cols-12 font-thin text-xs text-white items-baseline'>
                <p className=' col-span-3'>{usr.name}</p>
                <p className=' col-span-1'>{usr.username}</p>
                <p className=' col-span-3 '>{usr.email}</p>
                <p className=' col-span-2 '>{usr.roles}</p>
                <p className=' col-span-1 text-white/80 text-center'>{!usr.is_active ? <CheckBoxOutlineBlankOutlined fontSize='small' /> : <CheckBoxOutlined fontSize='small' />}</p>
                <div className=' col-span-2 flex justify-end'>
                  <IconButton size='small' color='success'
                    onClick={() => {
                      setForm(pv => ({ ...pv, Open: true, Mode: 'Edit', Title: "Editar usuario", ...usr }))
                    }}>
                    <EditOutlined fontSize='small' />
                  </IconButton>

                  <IconButton size='small' color='error'
                  onClick={handleDeleteUser}
                  >
                    <CloseOutlined fontSize='small' />
                  </IconButton>
                </div>
              </div>
            )
          })}
        </div>

      </div>


    </div>
  )
}

export default UserList