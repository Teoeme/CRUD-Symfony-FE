import { useEffect, useState } from "react";
import useSWR from "swr"
import axios from "@/utils/axiosConfig";
import { enqueueSnackbar } from "notistack";

export const useUser = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);


  const getAllUsers = async () => {
    let res =await axios.get('/api/users')
    console.log(res,'RES USERS')
    let data =res.data

    if (res.status !==200) {
      const error = new Error(data.message)
      error.info = data
      error.status = res.status
      throw error
    } else {
      return data
    }
  }
  const { data, error, isLoading, mutate } = useSWR('/api/users', getAllUsers, {
    onErrorRetry: (error) => {
      if (error.status === 403) {
        return
      }
    }
  })

  useEffect(() => {
    setUserList(data || [])
  }, [data]);


  const sendUser = async (data) => {
    setLoading(true)

    try {
      let res = data?.Mode ==='Add' ? await axios.post('/api/user', {
        ...data
      }) : await axios.put('/api/user',{...data,active:data?.is_active,roles:[data.roles]})
      setLoading(false)
      mutate()
      return res
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
      setLoading(false)
      return
    }

  }

  const deleteUser=async(id)=>{
    try {
      let res=await axios.delete('/api/user',{data:{id}})
      console.log(res,'RESPONSE DELETE')
      enqueueSnackbar(res?.message,{variant:'success'})
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
    }
  }

  return {
    sendUser,
    getAllUsers,
    userList,
    isLoading,
deleteUser,    loading
  }
}