import { useCategory } from '@/Hooks/useCategory'
import React, { useEffect, useState } from 'react'
import CategoriesList from './CategoriesList'

const CategoriesAdmin = () => {
    const {categoriesList}=useCategory()
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories([...categoriesList]?.filter(el => !el?.parent))
    }, [categoriesList]);

  return (
    <>
        <CategoriesList categories={categories} setCategories={setCategories} />
    </>
  )
}

export default CategoriesAdmin