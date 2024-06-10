import { useEffect, useState } from "react";
import useSWR from "swr"
import axios from "@/utils/axiosConfig";
import { DataArray } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";

export const useProduct = (isPublic=false) => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);


  const getAllProducts = async () => {
    try {
      
    let res = await axios.get(isPublic? '/api/public/products' : '/api/products')
    let data = res.data

    if (res.status !== 200) {
      const error = new Error(data.message)
      error.info = data
      error.status = res.status
      throw error
    } else {
      return data
    }

  } catch (error) {
    console.log(error)
      
  }
  }
  const { data, error, isLoading, mutate } = useSWR('/api/products', getAllProducts, {
    onErrorRetry: (error) => {
      if (error.status === 403) {
        return
      }
    }
  })

  useEffect(() => {
    setProductsList(data || [])
  }, [data]);


  const sendProduct = async (data) => {
    setLoading(true)
    let productData = {
      ...data,
      sellPrice: data?.sell_price,
      margin: data?.margin,
      purchasePrice: data?.purchase_price,
      attributes: data?.attributes?.reduce((obj, item) => {
        obj[item.name] = item.value
        return obj
      }, {}),
      variants: data?.variants?.map(v => ({
        ...v, attributes: v?.attributes?.reduce((obj, item) => {
          obj[item.name] = item.value
          return obj
        }, {}),
      }))
    }

    try {
      let res = data?.Mode === 'Add' ? await axios.post('/api/product', {
        ...productData
      }) : await axios.put('/api/product', { ...productData })

      if (res.status >= 400) {
        throw new Error('Error al agregar producto')
      }
      enqueueSnackbar(res?.data?.message, { variant: 'success' })

      setLoading(false)
      mutate()
      return res
    } catch (error) {
      console.log('error', error.message)
      setLoading(false)
      return
    }

  }

  const deleteProduct = async (id) => {
    try {
      let res = await axios.delete('/api/product', { data: { id } })
      if (res.status !== 200) {
        console.log("Error al eliminar el producto.")
      } else {
        enqueueSnackbar(res.data?.message, { variant: 'success' })

        await mutate()
        console.log(res)
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })

    }
  }

  // const validateForm = (form) => {
  //   let errors = {}

  //   if (!form.Active || form.Active === undefined) {
  //     errors.Active = 'Deve seleccionar un estado para el producto'
  //   }

  //   if (!form.Name?.trim() || form.Name === undefined) {
  //     errors.Name = 'El nombre no puede quedar vacío'
  //   } else {
  //     if (form.Name.length > 50) {
  //       errors.Name = 'La longuitud del nombre no puede ser mayor a 50 caracteres'
  //     }
  //   }


  //   if (!form.Description?.trim() || form.Description === undefined) {
  //     errors.Description = 'La descripción no puede quedar vacía'
  //   }
  //   if (form.Family?._id === null || !form?.Family) {
  //     errors.Family = 'La familia no puede quedar vacía'
  //   }
  //   if (form.Class?._id === null || !form?.Class) {
  //     errors.Class = 'La clase no puede quedar vacía'
  //   }
  //   if (form.Line?._id === null || !form?.Line) {
  //     errors.Line = 'La linea no puede quedar vacía'
  //   }
  //   if (form.Type?._id === null || !form?.Type) {
  //     errors.Type = 'El tipo no puede quedar vacío'
  //   }


  //   if (form.PurchasePrice === null || form.PurchasePrice === '') {
  //     errors.PurchasePrice = 'Debe colocar un precio de compra'
  //   }
  //   if (form.IVA === null || form.IVA === '') {
  //     errors.IVA = 'Debe seleccionar una condicion de iva'
  //   }

  //   if (form.Unity === null || form.Unity === '') {
  //     errors.Unity = 'Debe seleccionar una unidad de compra'
  //   }
  //   if (form.Margin === null || form.Margin === '') {
  //     errors.Margin = 'Debe colocar una utilidad al articulo'
  //   }
  //   if (form.Equivalence === null || form.Equivalence === '') {
  //     errors.Equivalence = 'Debe colocar una Equivalencia de venta'
  //   }
  //   if (form.SellUnity === null || form.SellUnity === '') {
  //     errors.SellUnity = 'Debe colocar una Unidad de Venta'
  //   }


  //   return errors

  // }




  return {
    sendProduct,
    getAllProducts,
    productsList,
    isLoading,
    // validateForm,
    loading,
    deleteProduct
  }
}