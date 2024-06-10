import { Button, TextField, ThemeProvider } from '@mui/material'
import React from 'react'
import { lightTheme } from '../Providers/Providers'
import AtributesSelector from './Atributes/AtributesSelector'
import LoadingButton from '../Commons/LoadingButton'
import CategoriesSelector from './CategoriesSelector'
import ProductModal from './ProductModal'
import VariantsModal from './Variants/VariantsModal'
import ProductImages from './Imagenes/ProductImages'

const ProductForm = ({ form, setForm,handleChange,handleSave }) => {
 console.log(form)

    return (
        <>
        <div className='p-2 grid grid-cols-3 gap-4 pt-5'>
            <ThemeProvider theme={lightTheme}>

                <TextField
                    name='name'
                    value={form?.name}
                    label='Nombre'
                    className=' col-span-3'
                    onChange={handleChange}
                />

                <TextField
                    name='description'
                    value={form?.description}
                    label='Descripción'
                    className=' col-span-3'
                    multiline
                    onChange={handleChange}

                />

               {!form?.is_variant && <div className=' col-span-3 '>
                    <CategoriesSelector value={form?.categories || []} onChange={(value) => {
                        handleChange({ target: { name: 'categories', value } })
                    }} />
                </div>}


                <TextField
                    name='purchase_price'
                    value={form?.purchase_price}
                    label='Precio Compra'
                    className=' col-span-1'
                    onChange={handleChange}

                />

                <TextField
                    name='margin'
                    value={form?.margin}
                    label='Margen'
                    className=' col-span-1'
                    onChange={handleChange}

                />

                <TextField
                    name='sell_price'
                    value={form?.sell_price}
                    label='Precio Venta'
                    className=' col-span-1'
                    onChange={handleChange}

                    
                />


                <div className=' col-span-3'>
                    <AtributesSelector attributes={form?.attributes} onChange={(value)=>{
                        handleChange({ target: { name: 'attributes', value } })
                    }} />
                </div>

                <div className=' col-span-3'>
                    <ProductImages images={form?.images} onChange={(value)=>{
                        handleChange({ target: { name: 'images', value } })
                    }} />
                </div>



             {!form?.is_variant && <Button
                    variant='contained'
                    color='info'
                    onClick={()=>setForm(pv=>({...pv,OpenVariants:true}))}
                >Variantes</Button>}

                <LoadingButton
                    title={'Guardar'}
                    className=' col-end-4'
                    color='primary'
                    onClick={()=>handleSave(form)}
                />

            </ThemeProvider>

        </div>
        </>
    )
}

export default ProductForm