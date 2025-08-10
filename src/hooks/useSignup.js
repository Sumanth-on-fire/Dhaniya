import { useState, useEffect } from 'react'
import { supabase } from '../supabase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const addUser = async (user, email, displayName, photoUrl) => {
        try {
            const [firstName, ...lastNameParts] = displayName.split(" ");
            const lastName = lastNameParts.join(" ") || "";

            const currentTime = new Date().toISOString();

            const userData = {
                user_id: user.id, 
                user_first_name: firstName,
                user_last_name: lastName,
                is_online: false,
                user_email: email,
                photo_url: photoUrl,
                created_at: currentTime,
                updated_at: currentTime
            };

            const { error } = await supabase
                .from('users')
                .insert([userData]);

            if (error) {
                console.error("Error inserting user data:", error);
                return false;
            }

            console.log("User added to database successfully");
            return true;
            
        } catch (error) {
            console.error("Unexpected error in addUser:", error);
            return false;
        }
    };
    
    const activateUser = async (email, password, displayName) => {
        const { data: signUpData, error: signUpError} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    displayName
                }
            }
        })

        if(signUpError) {
            throw new Error(signUpError.message)
        }
        const user = signUpData.user
        if(!user){
            throw new Error('User not created')
        }

        return user
    }

    const addThumbnail = async (user, thumbnail) => {
        const uploadPath = `thumbnails/${user.id}/${thumbnail.name}`
        const { error: uploadError } = await supabase
            .storage
            .from('dhaniya-storage')
            .upload(uploadPath, thumbnail)
        if (uploadError) {
            console.log("Failed to upload the image;")
            throw new Error(uploadError.message)
        }

         const { data: publicData, error: urlError } = await supabase
        .storage
        .from('dhaniya-storage')
        .getPublicUrl(uploadPath);

        if (urlError) {
        console.error('Error getting public URL:', urlError);
        return;
        }

        return publicData.publicUrl;
    }

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
            const user = await activateUser(email, password, displayName)
            const photoURL = await addThumbnail(user, thumbnail)
            await addUser(user, email, displayName, photoURL)

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