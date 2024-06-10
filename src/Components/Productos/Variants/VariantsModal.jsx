import DialogModal from '@/Components/Commons/DialogModal'
import { DialogContent } from '@mui/material'
import React from 'react'
import VariantRow from './VariantRow'
import ProductForm from '../ProductForm'
import ProductVariantModal from './ProductVariantModal'

const VariantsModal = ({ open, setForm, variants,form }) => {

    const handleSaveVariantChanges=(newVariant)=>{
        let newVariantsArray=[...variants]
        let variantIdx=variants.findIndex(e=>e.id===newVariant.id)
        if(variantIdx!==-1){
            newVariantsArray[variantIdx]=newVariant
            setForm(pv=>({...pv,variants:newVariantsArray,variantForm:{Open:false}}))
        }
    }
   
    
    return (
        <>
        <DialogModal open={open} setOpen={() => setForm(pv => ({ ...pv, OpenVariants: false }))} title={'Variantes del producto'} maxWidth={'xs'} fullWidth>
            <DialogContent>
                <div className=' flex flex-col gap-3'>

                {variants?.map((v, idx) => {
                    const handleEditClick = () => {
                        setForm(pv=>({...pv,variantForm:{...v,Open:true,Title:"Editar Variante"}}))
                    }
                    const handleDeleteClick = () => {

                    }

                    return (
                        <VariantRow variant={v} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
                    )
                })}
                </div>

            </DialogContent>
        </DialogModal>
        <ProductVariantModal open={form?.variantForm?.Open} form={form?.variantForm} setForm={setForm} handleSaveVariantChanges={handleSaveVariantChanges} />
        </>

    )
}

export default VariantsModal