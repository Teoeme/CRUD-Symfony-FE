import { Add, AddCircleOutline, Close } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const ProductImages = ({images,onChange}) => {
    const handleAdd=()=>{
        let newImages=[...images]
        newImages.push('')
        onChange(newImages)

    }
  return (
        <div className=' flex gap-2 w-full overflow-x-auto h-[190px] items-center relative text-sm pt-5 px-2 '>
            <p className=' font-helvetica  absolute top-0 left-2 text-zinc-800 text-3xs'>Imágenes</p>
            

            {images?.map((el,idx)=>{

                const handleChange=(e)=>{
                    let newImages=[...images]
                    newImages[idx]=e.target.value
                    onChange(newImages)
                }

                const handleRemove=()=>{
                    let newImages=[...images]
                    newImages.splice(idx,1)
                    onChange(newImages)
                }

                return(<div className='w-[100px] overflow-hidden relative h-[160px]  flex flex-col gap-3'>
                    <IconButton onClick={handleRemove} className=' !absolute top-0 right-0'><Close/></IconButton>
                    <Image  width={80} height={80} src={el || '/assets/product.png'}  className='w-full object-cover flex-1'/>
                    <TextField value={el} size='small' label="url" onChange={handleChange}/>
                    </div>
                    )
            })}
            <span className=' h-full flex items-center '>
                <IconButton onClick={handleAdd}><AddCircleOutline /></IconButton>
            </span>
        </div>
  )
}

export default ProductImages