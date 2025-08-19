import { useState } from "react"
import { supabase } from "../../supabase/config"

export const useDeleteProject = (projectId) => {
    const [deleteErr, setDeleteErr] = useState('')
    const deleteProject = async () => {
        const {error: deleteError} = await supabase.from('projects').update({'is_deleted': true}).eq('project_id', projectId)
        if(deleteError){
            setDeleteErr(deleteErr)
            return false
        }
        return true
    }

    return {
        deleteProject
    }
}