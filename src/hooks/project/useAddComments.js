import { supabase } from "../../supabase/config"

export const useAddComments = (projectId) => {
    const addComments = async (comments) => {
        const { error: errorAdding } = await supabase
            .from('projects')
            .update({ comments: comments })
            .eq('project_id', Number(projectId))
        
        if(errorAdding){
            console.log("Printing the error adding the comments: ", errorAdding)
            return false
        }

        return true
    }

    return {
        addComments
    }
}