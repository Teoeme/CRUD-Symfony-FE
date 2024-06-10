import { Autocomplete, IconButton, TextField, createFilterOptions } from '@mui/material'
import React from 'react'
// import AddAttrinuteModal from './AddAttrinuteModal'
import { AddCircleOutline, Close } from '@mui/icons-material'
import { useAttribute } from '@/Hooks/useAttribute'

const AtributesSelector = ({ attributes, onChange }) => {
    const { attributeList, handleSubmit } = useAttribute()
    // console.log(attributes,'Atributos del prod')
    console.log(attributeList, 'Atributos disponibles')

    const filter = createFilterOptions();

    const handleAdd = () => {
        let newAttibutes = []
        if (attributes?.length > 0) {
            newAttibutes = [...attributes]
        }
        newAttibutes.push({ name: '', value: '' })
        onChange(newAttibutes)
    }

    return (
        <div className='px-2'>
            <span className='flex w-full justify-between items-center '>

                <p className=' text-3xs text-zinc-800'>
                    Atributos
                </p>
                <IconButton onClick={handleAdd} size='small'><AddCircleOutline fontSize='small' /></IconButton>
            </span>
            <div className='flex flex-col gap-2'>

                {attributes?.map((el, idx) => {
                    const handleChangeAttribute = (newValue, key) => {
                        let newAttibutes = [...attributes]
                        newAttibutes[idx][key] = newValue
                        onChange(newAttibutes)
                    }

                    const handleRemoveAttribute=()=>{
                        const newAttibutes=[...attributes]
                        newAttibutes?.splice(idx,1)
                        onChange(newAttibutes)
                    }


                    let valueOptions = el?.Options || []
                    if (!el?.Options && attributeList?.length > 0) {
                        valueOptions = attributeList?.filter(e => e.name === el.name)?.[0]?.Options
                    }

                    return (

                        <div className='w-full flex gap-1 items-center  '>

                            <Autocomplete className='w-1/2'
                                options={attributeList}
                                renderInput={(params) => <TextField {...params} variant='standard' size='small' />}
                                getOptionLabel={opt => opt?.name ? opt?.name : opt}
                                isOptionEqualToValue={(opt, val) => opt?.name === val}
                                onChange={(e, nv) => {
                                    if (nv?.Value === 'new') {
                                        // setForm({ Open: true })
                                    } else {
                                        handleChangeAttribute(nv?.name, 'name')
                                    }

                                }}

                                // filterOptions={(options, params) => {
                                //     const filtered = filter(options, params);
                                //     filtered.push({
                                //         Value: 'new',
                                //         name: `+ Agregar nuevo atributo`,
                                //     });

                                //     return filtered;
                                // }}
                                value={el.name}

                            />
                            <TextField
                                value={el.value}
                                variant='standard'
                                size='small'
                                className=' w-1/2'
                                onChange={(e) => handleChangeAttribute(e.target.value, 'value')}
                            />
                            <IconButton size='small' onClick={handleRemoveAttribute}><Close fontSize='small'/></IconButton>
                        </div>
                    )
                })}
            </div>





            {/* <AddAttrinuteModal /> */}
        </div>
    )
}

export default AtributesSelector