import { useEffect, useState } from "react";
import useSWR from "swr"
import axios from "@/utils/axiosConfig";
import { enqueueSnackbar } from "notistack";

export const useCategory = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);


  const getAllCategories = async () => {
    setLoading(true)
    let res = await axios.get('/api/categories')
    let data = res.data
    setLoading(false)
    if (res.status !== 200) {
      const error = new Error(data.message)
      error.info = data
      error.status = res.status
      throw error
    } else {
      return data
    }
  }
  const { data, error, isLoading, mutate } = useSWR('/api/categories', getAllCategories, {
    onErrorRetry: (error) => {
      if (error.status === 403) {
        return
      }
    }
  })

  useEffect(() => {
    setCategoriesList(data || [])
  }, [data]);



  const updateCategory=async(data)=>{
    try {
      let res=await axios.put('/api/category',{...data})
      enqueueSnackbar(res?.data?.message,{variant:'success'})
      mutate()
      return res
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
    }
  }
  const deleteCategory=async(id)=>{
    try {
      let res=await axios.delete('/api/category',{data:{id}})
      enqueueSnackbar(res?.data?.message,{variant:'success'})
      mutate()
      return res
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
    }
  }
  const addCategory=async(data)=>{
    setLoading(true)
    try {
      let res=await axios.post('/api/category',{...data})
      enqueueSnackbar(res?.data?.message,{variant:'success'})
      mutate()
      return res
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
    }finally{
      setLoading(false)
    }
  }


  return {
    getAllCategories,
    updateCategory,
    deleteCategory,
    categoriesList,
    addCategory,
    isLoading,
    loading
  }
}