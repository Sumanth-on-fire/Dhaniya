import {useEffect, useState} from 'react'
import { supabase } from '../../supabase/config'
import { useAuthContext } from '../auth/useAuthContext'

export const useFetchUsers = () => {
    const [userList, setUserList] = useState()
    const [fetchError, setFetchError] = useState('')
    const [now, setNow] = useState(() => Date.now())
    const [isPending, setIsPending] = useState(false)
    const {user} = useAuthContext()

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

    const fetchUserById = async (id) => {
        setIsPending(true)
        const {data: userById, error: userByIdFetchError} = await supabase.from('users').select('*').eq('user_id', id)
        if (userByIdFetchError) {
            console.log("Error fetching the user data: ", userByIdFetchError)
            setFetchError(userByIdFetchError.message)
        }
        setIsPending(false)
        return userById[0]
    }

    useEffect(() => {   
        fetchAuthUsers()
    }, [now])

    return { userList: userList, fetchError: fetchError, now: now, isPending: isPending, fetchUserById: fetchUserById}
}