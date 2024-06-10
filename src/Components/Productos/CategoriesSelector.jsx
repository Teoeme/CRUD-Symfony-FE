'use client'
import { useCategory } from '@/Hooks/useCategory'
import { ArrowDownwardOutlined, ArrowDropDown, ArrowDropUp, CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material'
import { Autocomplete, Chip, IconButton, TextField, createFilterOptions } from '@mui/material'
import React, { useState } from 'react'

const CategoriesSelector = ({ value, onChange }) => {
    const { categoriesList } = useCategory()
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState({});

    const OptionItem = ({ data, lvl}) => {
        const selected = value?.some(el => el === data?.id)

        const handleSelect = () => {
            let newValue = [...value]
            if (selected) {
                newValue = newValue?.filter(el => el !== data?.id)
            } else {
                newValue.push(data.id)
            }
            // setVisible(false)
            onChange(newValue)
        }


        const isVisible=open[`${lvl}`]

        const handleVisible=()=>{
            setOpen(pv=>({...pv,[lvl]:!isVisible}))
        }


        return (
            <div>
                <div className='flex justify-between items-center '>
                    <span className='flex gap-1 items-center '>
                        <IconButton size='small' onClick={handleSelect}>
                            {selected ? <CheckBoxOutlined fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
                        </IconButton>
                        <p className=' pt-1'>{data?.name}</p>
                    </span>
                    {data?.children?.length > 0 && <IconButton onClick={handleVisible}>

                        {isVisible ? <ArrowDropUp /> : <ArrowDropDown />}
                    </IconButton>}
                </div>
                {isVisible &&
                    <div 
                        style={{
                    paddingLeft:`${String(lvl)?.split('-')?.length*8}px`

                        }}>
                        {data?.children?.map((el,i) => <OptionItem data={el} lvl={`${lvl}-${i}`} />)}
                    </div>
                }
            </div>

        )
    }

    return (
        <div className=' relative w-full '>
            <div className='w-full border-b border-zinc-500 flex justify-between items-end pt-4 pb-1'>
                <p className='text-3xs  absolute top-0 text-zinc-600 font-helvetica'>Categorías</p>
                <div className='flex gap-1 flex-wrap'>
                    {value?.map(el => {
                        const cat = categoriesList?.find(e => e.id === el)

                        const handleRemove = () => {
                            let newValue = [...value].filter(e => e !== el)
                            onChange(newValue)
                        }
                        return (<Chip label={cat?.name} onDelete={handleRemove} size='small' className=' font-thin' />)
                    })}

                </div>
                <IconButton onClick={() => setVisible(!visible)}>{visible ? <ArrowDropUp /> : <ArrowDropDown />}</IconButton>
            </div>
            <div className={` bg-zinc-100 shadow w-full overflow-hidden  z-50  absolute text-zinc-800 text-xxs font-light ${visible ? 'max-h-[400px]' : 'max-h-0'} transition-all ease-in`}>
                {categoriesList.filter(el => !el.parent)?.map((cat, idx) => {

                    return (
                        <OptionItem data={cat} lvl={idx}/>
                    )
                })}

            </div>


        </div>
    )
}

export default CategoriesSelector