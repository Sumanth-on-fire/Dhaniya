import { supabase } from "../../supabase/config"

export const useCreateProject = () => {

    const createProject = async (projectData) => {
        const {error: insertError} = await supabase.from('projects').insert([projectData])
        if(insertError){
          console.log('Error inserting the project data: ', insertError)
          return insertError
        }
    
        return false
    }

    return createProject
}