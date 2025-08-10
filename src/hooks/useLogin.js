import { useState, useEffect } from 'react'
import { supabase } from '../supabase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

        if (authError || !data.user) {
            if (!isCancelled) {
                setError(authError ? authError.message : 'Login failed')
                setIsPending(false)
            }
            return
        }

        const {error: updateError } = await supabase
            .from('users')
            .update({ is_online: true })
            .eq('user_id', data.user.id)
        if (updateError) {
            if (!isCancelled) {
                setError(updateError.message)
                setIsPending(false)
            }
            return
        }

        dispatch({ type: 'LOGIN', payload: data.user })

        if (!isCancelled) {
            setIsPending(false)
            setError(null)
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { login, isPending, error }
}