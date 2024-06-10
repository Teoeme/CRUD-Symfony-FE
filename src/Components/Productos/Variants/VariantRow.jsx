import { formatPeso } from '@/utils/dateHelpers'
import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { FormControlLabel, IconButton, Switch } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const VariantRow = ({variant,onEditClick,onDeleteClick}) => {
    const {active,description,images,sell_price,name}=variant
  return (
    <div className=' text-zinc-500 text-xs font-light flex items-center p-1 efecto-vidrio rounded'>
        <div className=' w-1/4'>
            <Image width={70} height={70} src={images?.[0] ? images[0] : '/assets/product.png'} className=' object-cover' />
        </div>
        <div className='w-3/4' >
            <div className=' flex justify-between items-center'>
                <p className=' w-3/4'>{name}</p>
                <span>
                    <IconButton size='small' color='warning' onClick={onEditClick}><EditOutlined /></IconButton>
                    <IconButton size='small' color='error' onClick={onDeleteClick}><DeleteOutline /></IconButton>
                </span>
            </div>
            <p className=' w-full text-wrap whitespace-pre-wrap'>{description}</p>
            <div className='flex justify-between'>
                <FormControlLabel control={<Switch checked={active} size='small' />} label='Activo' />
                <p className=' font-normal'>{formatPeso(sell_price)}</p>
            </div>
        </div>
    </div>
  )
}

export default VariantRow