import { useState, useEffect } from 'react'
import { supabase } from '../supabase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { displayName }
                }
            })
            if (signUpError) {
                throw new Error(signUpError.message)
            }
            const user = signUpData.user
            if (!user) {
                throw new Error('User not created')
            }

            const uploadPath = `thumbnails/${user.id}/${thumbnail.name}`
            const { error: uploadError } = await supabase
                .storage
                .from('dhaniya-storage')
                .upload(uploadPath, thumbnail)
            if (uploadError) {
                throw new Error(uploadError.message)
            }

            const { data: publicData } = supabase
                .storage
                .from('dhaniya-storage')
                .getPublicUrl(uploadPath)
            const imgUrl = publicData.publicUrl

            const { error: updateError } = await supabase.auth.update({
                data: { photoURL: imgUrl }
            })
            if (updateError) {
                throw new Error(updateError.message)
            }

            const { error: insertError } = await supabase
                .from('users')
                .insert([
                    { id: user.id, online: true, displayName, photoURL: imgUrl }
                ])
            if (insertError) {
                throw new Error(insertError.message)
            }

            dispatch({ type: 'LOGIN', payload: user })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { signup, error, isPending }
}