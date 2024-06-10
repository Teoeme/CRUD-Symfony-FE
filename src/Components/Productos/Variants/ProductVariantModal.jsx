import DialogModal from '@/Components/Commons/DialogModal'
import React from 'react'
import ProductForm from '../ProductForm'

const ProductVariantModal = ({open,setForm,form,handleSaveVariantChanges}) => {
    const handleVariantChange =(e)=>{
        const {name,value}=e.target
        setForm(pv=>({...pv,variantForm:{...pv.variantForm,[name]:value}}))
    }

   

  return (
    <DialogModal open={open} title={form?.Title} maxWidth={'xs'} setOpen={()=>{
        setForm(pv=>({...pv,variantForm:{...pv.variantForm,Open:false}}))
    }}>
                <ProductForm form={form} handleChange={handleVariantChange} handleSave={handleSaveVariantChanges} />
    </DialogModal>
)
}

export default ProductVariantModal