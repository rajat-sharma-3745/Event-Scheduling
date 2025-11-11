import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

const useGetUserEvents = () => {
  const [events,setEvents] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
      const getUserEvents = async() =>{
        try {
          setLoading(true)
            const {data} = await axiosInstance.get(API_PATHS.EVENTS.GETUSEREVENTS);
            if(data?.success){
              setEvents(data?.events)
            }
        } catch (error) {
            toast.error((error?.response?.data?.message||error?.message)||"Something went wrong")
        }finally{
          setLoading(false)
        }
      }
      getUserEvents()
  },[])

  return {events,setEvents,loading}
}

export default useGetUserEvents