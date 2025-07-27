import { useReducer, useEffect, useState } from "react"
import { supabase } from "../supabase/config"  // make sure this exports your configured supabase client

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const storageReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useSupabaseStore = () => {
    const [response, dispatch] = useReducer(storageReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)
    const bucketName = "dhaniya-storage"

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const { data, error } = await supabase
                .storage
                .from(bucketName)
                .upload(doc.filePath, doc.file, { cacheControl: '3600', upsert: false })

            if (error) {
                throw error
            }

            const createdAt = new Date().toISOString()
            const uploadedDetails = { ...data, createdAt }

            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: uploadedDetails })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    const deleteDocument = async (filePath) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const { data, error } = await supabase
                .storage
                .from(bucketName)
                .remove([filePath])

            if (error) {
                throw error
            }

            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message || 'could not delete' })
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }
}