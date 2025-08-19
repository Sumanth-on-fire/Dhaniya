import { createContext, useReducer, useEffect } from 'react'
import { supabase } from '../supabase/config' // ensure your Supabase client is configured here

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { user: action.payload, authIsReady: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { 
        user: null,
        authIsReady: false
    })

    // Initialize Supabase storage bucket "dhaniya-storage"
    const storage = supabase.storage.from('dhaniya-storage')

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            dispatch({ type: 'AUTH_IS_READY', payload: session?.user || null })
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch, storage }}>
            {children}
        </AuthContext.Provider>
    )
}