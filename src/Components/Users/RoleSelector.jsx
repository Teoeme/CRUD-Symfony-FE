import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const RoleSelector = ({value,onChange}) => {
    let options=[
        { value:'ROLE_USER',label:"Usuario"},
       { value:'ROLE_ADMIN',label:"Administrador"},
       { value:'ROLE_SUPER_ADMIN',label:"SuperAdmin"},
    ]
  return (
<FormControl>
    <InputLabel id='label-role-selector'>Rol</InputLabel>
    <Select value={value} onChange={onChange}
label='Rol'
    labelId='label-role-selector'
    name='roles'
    >
        {options?.map(el=><MenuItem value={el.value}>{el.label}</MenuItem>)}
    </Select>
</FormControl>  )
}

export default RoleSelector