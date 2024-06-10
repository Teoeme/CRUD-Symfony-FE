import { useProduct } from '@/Hooks/useProduct'
import { formatPeso } from '@/utils/dateHelpers'
import { AddOutlined, CheckBoxOutlineBlankOutlined, CheckBoxOutlined, CloseOutlined, EditOutlined } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import React from 'react'

const ProductosList = ({ setForm, form }) => {
  const { productsList,deleteProduct } = useProduct()
const confirm=useConfirm()


return (
    <div className='h-3/4 w-3/4 efecto-vidrio flex flex-col relative'>
      <div className='  w-full flex justify-between px-2 items-center py-2'>
        <IconButton color='success' onClick={() => {
          setForm(pv => ({ ...pv, Open: true, Mode: 'Add', Title: "Nuevo producto" }))
        }}>
          <AddOutlined />
        </IconButton>

        
      </div>

      <div className=' flex flex-col p-4  h-[90%] '>


        <div className=' grid grid-cols-12 text-white text-xs font-light w-full border-b-[.5px] border-white/20 pb-2'>
          <p className=' col-span-4'>Nombre</p>
          <p className=' col-span-2'>P.Compra</p>
          <p className=' col-span-1 text-center w-full'>Margen</p>
          <p className=' col-span-2 text-right'>P.Venta</p>
          <p className=' col-span-1 text-center'>Activo</p>
          <p className=' col-span-2 text-right pr-2'>Acciones</p>
        </div>

        <div className='flex gap-3 flex-col overflow-auto h-full '>
          {productsList?.filter(e=>!e?.is_variant)?.map((prod, idx) => {

            const handleDelete=async ()=>{
              confirm({title:'Eliminar producto',description:"¿Desea eliminar el producto? Esta accion es irreversible",
                confirmationButtonProps:{title:'Eliminar',color:'primary'},
                cancellationButtonProps:{title:'Cancelar',color:'error'},
                confirmationText:"Eliminar",
                cancellationText:'Cancelar'
              }).then(async()=>{
                await deleteProduct(prod.id)
              })
            }

            return (
              <div key={prod?.id} className='grid grid-cols-12 font-extralight text-xs text-white items-baseline'>
                <p className=' col-span-4'>{prod.name}</p>
                <p className=' col-span-2'>{formatPeso(prod.purchase_price)}</p>
                <p className=' col-span-1 text-center'>{prod.margin}</p>
                <p className=' col-span-2 text-right'>{formatPeso(prod.sell_price)}</p>
                <p className=' col-span-1 text-white/80 text-center'>{!prod.active ? <CheckBoxOutlineBlankOutlined fontSize='small' /> : <CheckBoxOutlined fontSize='small' />}</p>
                <div className=' col-span-2 flex justify-end'>
                  <IconButton size='small' color='success'
                    onClick={() => {
                      setForm(pv => ({ ...pv, Open: true, Mode: 'Edit', Title: "Editar producto", ...prod }))
                    }}>
                    <EditOutlined fontSize='small' />
                  </IconButton>

                  <IconButton size='small' color='error' onClick={handleDelete}>
                    <CloseOutlined fontSize='small' />
                  </IconButton>
                </div>
              </div>
            )
          })}
        </div>

      </div>


    </div>
  )
}

export default ProductosList