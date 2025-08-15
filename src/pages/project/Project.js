import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useFetchProjectDetails } from "../../hooks/useFetchProjectDetails"
import ProjectSummary from "./ProjectSummary"

const Project = () => {
  const {id} = useParams()
  const {projectDetails, fetchError, isLoading} = useFetchProjectDetails(id)
  if(fetchError){
    return <div className="error">{fetchError}</div>
  }

  if(isLoading){
    return <div className='loading'>Loading...</div>
  }

  if(!projectDetails) {
    return <div className="error">Project Details not available</div>
  }

  return !isLoading && projectDetails && (
    <div className='project-details'>
      <ProjectSummary projectDetails={projectDetails}/>
      {/* <h1>{projectDetails.project_name}</h1> */}
    </div>
  )
}

export default Project