import React from 'react'
import DialogModal from '../Commons/DialogModal'
import UserForm from './UserForm'
import { useUser } from '@/Hooks/useUser'
import { enqueueSnackbar } from 'notistack'

const UserModal = ({form,setForm}) => {
  const {sendUser,loading}=useUser()

    const handleChange=(e)=>{
        const {name,value}=e.target
        setForm(pv=>({...pv,[name]:value}))
    }   

    const handleSubmit=async()=>{
        let res=await sendUser(form)
        if(res?.status<=300){
          setForm({Open:false})
          enqueueSnackbar(res?.data?.message,{variant:'success'})
        }
        console.log(res,"RES")
      }
  return (
    <DialogModal open={form?.Open} title={form?.Title} setOpen={()=>setForm(pv=>({Open:false}))} maxWidth={'xs'}>
        <UserForm form={form} setForm={setForm} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading}/>
    </DialogModal>
)
}

export default UserModal    