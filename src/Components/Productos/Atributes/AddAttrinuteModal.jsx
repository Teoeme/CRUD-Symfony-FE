import DialogModal from '@/Components/Commons/DialogModal'
import LoadingButton from '@/Components/Commons/LoadingButton'
import { useAttribute } from '@hooks/useAttribute'
import { useGlobalForm } from '@hooks/useGlobalForm'
import { AddCircleOutline, Close } from '@mui/icons-material'
import {  FormControl, IconButton, OutlinedInput, TextField } from '@mui/material'
import React from 'react'

const AddAttrinuteModal = () => {
const {form,setForm,handleChange}=useGlobalForm('AddAttributeModal')
const {addAttribute,loading}=useAttribute()

const handleAdd=async()=>{
    let res=await addAttribute(form)
    console.log(res,'ADD ATTR')
}

const addOption=()=>{
    let newOptions=[]
    if(form?.Options?.length>0){
        newOptions=[...form?.Options]
    }
    newOptions.push('')
    setForm(pv=>({...pv,Options:newOptions}))
}


  return (
<DialogModal open={form?.Open} setOpen={setForm} title='Agregar nuevo atributo'>
<div className=' flex p-2 flex-col gap-3'>
    <TextField
    value={form?.Name}
    onChange={handleChange}
    label='Nombre'
    name='Name'
    />

    <div className='flex flex-col gap-3 px-1 h-4/5 overflow-auto'>
        <span className=' w-full flex justify-between items-center'>
        <p>Valores posibles</p>
        <IconButton size='small' onClick={addOption} color='primary'><AddCircleOutline  /></IconButton>
        </span>
        {form?.Options?.map((el,idx)=>{

const removeItem=()=>{
    let newOptions=form?.Options?.filter(e=>e!==el)
    setForm(pv=>({...pv,Options:newOptions}))
}
const handleOption=(e)=>{
    let newOptions=[...form?.Options]
    newOptions[idx]=e.target.value
    setForm(pv=>({...pv,Options:newOptions}))
}

            return (<FormControl size='small'>
                
                <OutlinedInput value={el}
                onChange={handleOption}
                endAdornment={<IconButton size='small' onClick={removeItem}><Close fontSize='small' /></IconButton>}
                />
                 </FormControl>
                )
        })}
    </div>

<div className='flex w-full justify-end'>
    <LoadingButton color='success' variant='outlined' title={"Agregar"} onClick={handleAdd} loading={loading}  />
</div>
</div>

</DialogModal>
)
}

export default AddAttrinuteModal