// styles
import { useFetchProjects } from '../../hooks/project/useFetchProjects'
import ProjectList from '../../components/ProjectList'
import { useEffect, useState } from 'react'
import './Dashboard.css'
import ProjectFilter from './ProjectFilter'
import { useAuthContext } from '../../hooks/auth/useAuthContext'

export default function Dashboard() {
  const [filter, setFilter] = useState('all')
  const {user} = useAuthContext()
  const {projectList, projectError, isLoading} = useFetchProjects()

  const handleChangeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  const filteredProjectList = projectList && projectList.length ? 
    projectList.filter((project)=> {
      switch(filter) {
        case 'all':
          return true
        case 'mine':
          return project.user_id === user.id
        case 'development':
        case 'design':
        case 'sales':
        case 'marketing':
          return project.project_category === filter
        default:
          return true
      }
   })
  : []
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {
        isLoading ? 
          <div> loading </div>
        :
          <div>
            {projectError && <p className='error'>{projectError}</p>}
            <ProjectFilter handleChangeFilter={handleChangeFilter}/>
            <ProjectList projectList={filteredProjectList}/>
          </div>
      }
    </div>
  )
}