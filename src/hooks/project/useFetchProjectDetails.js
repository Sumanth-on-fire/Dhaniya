import { useEffect, useState } from "react"
import { supabase } from "../../supabase/config"

export const useFetchProjectDetails = (projectId) => {
    const [projectDetails, setProjectDetails] = useState(null)
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const fetchProjectDetails = async () => {
        setIsLoading(true)
        try {
            setIsLoading(true)
            const {data: projectDetailsList, error: projectError} = await supabase.from('projects').select('*').eq('project_id', parseInt(projectId)).eq('is_deleted', false)
            if (projectError) {
                setFetchError("Could not fetch project details")
            } else {
                setProjectDetails(projectDetailsList[0])
                setFetchError(null)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProjectDetails()
    } , [])

    return {
        projectDetails,
        fetchError,
        isLoading
    }
}