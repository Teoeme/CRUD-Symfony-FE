import { useCategory } from '@/Hooks/useCategory'
import { ArrowDropDown, ArrowDropUp, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'

const CategoriesFilter = ({onFilter}) => {
    const {categoriesList}=useCategory()
const [selectedCategories, setSelectedCategories] = useState([]);
const [visibleCategories, setVisibleCategories] = useState({});



    const CategoryFilterItem=({data,nivel})=>{
        const selected=selectedCategories?.includes(data?.id)

        const handleSelect=()=>{
            let newSelection=[...selectedCategories]
            if(selected){
                newSelection=newSelection?.filter(el=>el!==data.id)
            }else{
                newSelection.push(data.id)
            }
            setSelectedCategories(newSelection)
        }

        const isVisible=visibleCategories[`${nivel}`]

const handleVisible=()=>{
    setVisibleCategories(pv=>({...pv,[nivel]:!isVisible}))
}
        return(
            <div >
                <span className='flex w-36 text-xs text-white items-center justify-between'>
                    <span className='flex justify-start items-center'>
                    <IconButton onClick={handleSelect}>{selected ?<CheckBox /> :<CheckBoxOutlineBlank />}</IconButton>
                    <p>{data?.name}</p>
                    </span>
                    {data?.children?.length >0 && <IconButton onClick={handleVisible}>{isVisible?<ArrowDropUp />:<ArrowDropDown />}</IconButton>}
                </span>
                <div className={`${isVisible ? 'max-h-[900px]' : 'max-h-0'} transition-all ease-in overflow-hidden`}
                style={{
                    paddingLeft:`${String(nivel)?.split('-')?.length*8}px`
                }}
                >
                {data?.children?.map((e,i)=>(<CategoryFilterItem data={e} nivel={`${nivel}-${i}`} />))}
                </div>
            </div>
        )
    }

    useEffect(() => {
        onFilter(selectedCategories)      
    }, [selectedCategories]);
  
    return (
    <div className='flex flex-col gap-1'>
        {categoriesList?.filter(el=>!el?.parent)?.map((el,idx)=>{

            return(
                <CategoryFilterItem data={el} nivel={idx} />
            )
        })}
    </div>
  )
}

export default CategoriesFilter