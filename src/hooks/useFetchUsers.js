import {useEffect, useState} from 'react'
import { supabase } from '../supabase/config'

export const useFetchUsers = () => {
    const [userList, setUserList] = useState()
    const [fetchError, setFetchError] = useState('')
    const [now, setNow] = useState(() => Date.now())
    const [isPending, setIsPending] = useState(false)

    useEffect(()=>{
        const id = setInterval(() => setNow(Date.now()), 300000)
        return () => clearInterval(id)
    }, [])

    const fetchAuthUsers = async () => {
        setIsPending(true)
        const {data: userList, error: userError} = await supabase.from('users').select('*')
        if (userError){
            console.log("Error fetching userList data: ", userError.message)
            setFetchError(userError.message)
        }
        setUserList(userList)
        setIsPending(false)
    }
    useEffect(() => {   
        fetchAuthUsers()
    }, [now])

    return {userList, fetchError, now, isPending}
}