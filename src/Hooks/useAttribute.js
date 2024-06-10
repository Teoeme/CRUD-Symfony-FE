import React, { useEffect, useState } from 'react'
import useSWR from "swr"
import { useProduct } from './useProduct';
import axios from '@/utils/axiosConfig';
export const  useAttribute = (filterFunction=(e)=>e) => {
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);
const [attributeList, setAttributeList] = useState([]);

const getAllAttributes = async () => {
  const res = await axios.get('/api/attributes').then(async res=>{
    let data= res.data
    if(res.status !==200){
      const error = new Error(data.message)
      error.info = data
      error.status = res.status
      throw error
    }else{
      return data
    }
  })
  return res
  
};



const { data,error,isLoading,mutate} = useSWR('/api/attributes',getAllAttributes, {
  onErrorRetry: (error) => {
    if (error.status === 403){
      return
    }
  }
})

useEffect(() => {
  let attributesData=  data?.data?.filter(filterFunction) || []
  setAttributeList(attributesData)
}, [data]);

useEffect(() => {
  if(error){
    // console.log(error)
  }
}, [error]);

    const addAttribute = async (data) => {
        setLoading(true);
        const res = await fetch('/api/attribute',{
          method:'POST',
          body:JSON.stringify(data)
        }).then(async res=>{
            let data=await res.json()
          if(!res.ok){
            return {message:data.message,error:true,ok:res?.ok}
          }
          return data
        })
        .finally(()=>{
          setLoading(false);
          mutate()
        })
        return res
      };

      const editAttribute = async (data) => {
        setLoading(true);
        const res = await fetch('/api/attribute',{
          method:'PUT',
          body:JSON.stringify(data)
        }).then(async res=>{
            let data=await res.json()
          if(!res.ok){
            return {message:data.message,error:true}
          }
          return data
        })
        .finally(()=>{
          setLoading(false);
          mutate()
        })
        return res
      };

      const deleteAttribute = async (form) => {
        setLoading(true);
        const res = await fetch('/api/attribute',{
          method:'DELETE',
          body:JSON.stringify(form)
        }).then(async res=>{
            let data=await res.json()
          if(!res.ok){
            return {message:data.message,error:true}
          }
          return data
        })
        .finally(()=>{
          setLoading(false);
          mutate()
        })
        return res
      };

      const handleSubmit=async(form)=>{
        setLoading(true);
        const res = await fetch('/api/attribute',{
          method:form.Mode==='Add' ? 'POST' : 'PUT',
          body:JSON.stringify(form)
        }).then(async res=>{
            let data=await res.json()
          if(!res.ok){
            showResponseToast({res:data,title:'Atributos',color:'error'})
            return {message:data.message,error:true}
          }
          showResponseToast({res:data,title:'Atributos',color:'success'})
          return data
        })
        .finally(async ()=>{
          setLoading(false);
        })
        await mutate()
        return res
      }

      const validateAttribute = (form) =>{
        let newErrors = {}
    if(form.Name ===undefined || form.Name===''){
        newErrors.Name='El Nombre no puede quedar vacío'
    }
    if(form.Address ===undefined || form.Address===''){
        newErrors.Address='Introduzca una dirección'
    }
  
    
    setErrors(newErrors)
    return newErrors
    }


  return {errors,addAttribute,loading,attributeList,validateAttribute,isLoading,editAttribute,deleteAttribute,handleSubmit}
}
