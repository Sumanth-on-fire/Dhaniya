// styles
import { useFetchProjects } from '../../hooks/useFetchProjects'
import ProjectList from '../../components/ProjectList'
import { useEffect } from 'react'
import './Dashboard.css'

export default function Dashboard() {
  const {projectList, projectError, isLoading} = useFetchProjects()
  useEffect(() => {
    if(projectList.length){
      console.log("Printing the project list: ", projectList)
      console.log("Printing the project error: ", projectError)
    }
  }, [isLoading])

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {
        isLoading ? 
          <div> loading </div>
        :
          <div>
            {projectError && <p className='error'>{projectError}</p>}
            <ProjectList projectList={projectList}/>
          </div>
      }
    </div>
  )
}