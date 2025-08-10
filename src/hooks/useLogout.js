import { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const {user} = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)
        try {
            const { error: updateError } = await supabase
                .from('users')
                .update({ is_online: false })
                .eq('user_id', user.id)
            if (updateError) throw updateError
            
            const { error: signOutError } = await supabase.auth.signOut()
            if (signOutError) throw signOutError
            
            dispatch({ type: 'LOGOUT' })
                
            localStorage.clear()
            window.location.reload()
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}