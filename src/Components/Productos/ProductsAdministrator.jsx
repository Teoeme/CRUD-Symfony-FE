import React, { useState } from 'react'
import ProductosList from './ProductosList'
import ProductModal from './ProductModal'

const ProductsAdministrator = () => {
    const [form, setForm] = useState({});   
  return (
    <>
        <ProductosList setForm={setForm} />
        <ProductModal form={form} setForm={setForm}  />
    </>
  )
}

export default ProductsAdministrator