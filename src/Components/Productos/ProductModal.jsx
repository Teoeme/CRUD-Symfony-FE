import React from 'react'
import DialogModal from '../Commons/DialogModal'
import ProductForm from './ProductForm'
import VariantsModal from './Variants/VariantsModal'
import { useProduct } from '@/Hooks/useProduct'

const ProductModal = ({form,setForm}) => {
const {sendProduct}=useProduct()

  const handleChange = (e) => {
    const { value, name } = e.target
    setForm(pv => ({ ...pv, [name]: value }))
}

const handleSaveProduct=async()=>{
let res=await sendProduct(form)
if(res?.status <300){
  setForm({Open:false})
}
}
  return (

<DialogModal open={form?.Open} setOpen={setForm} maxWidth={'xs'} fullWidth={true} title={form?.Title}> 
    <ProductForm form={form} setForm={setForm} handleChange={handleChange} handleSave={handleSaveProduct} />
    <VariantsModal open={form?.OpenVariants} setForm={setForm} variants={form?.variants} form={form} />

</DialogModal>)
}

export default ProductModal