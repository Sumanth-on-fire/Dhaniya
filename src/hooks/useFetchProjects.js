import { useEffect, useState } from "react"
import { supabase } from "../supabase/config"

export const useFetchProjects = () => {
    const [projectList, setProjectList] = useState([])
    const [projectError, setProjectError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const fetchProjects = async () => {
        setIsLoading(true)
        const {data: projectList, error: currentProjectError} = await supabase.from('projects').select('*')
        if(currentProjectError){
            console.log("Error fetching projects: ", currentProjectError)
            setProjectError(currentProjectError)
        }
        setProjectList(projectList)
        setIsLoading(false)
    }

    useEffect(()=> {
        fetchProjects()
    }, [])

    return {
        projectList,
        projectError,
        isLoading
    }
}