import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Avatar from "../../components/Avatar"
import './Project.css'
import { useAuthContext } from "../../hooks/auth/useAuthContext"
import { useDeleteProject } from "../../hooks/project/useDeleteProject"

const ProjectSummary = ({projectDetails}) => {
    const {user} = useAuthContext()
    const {deleteProject} = useDeleteProject(projectDetails.project_id)
    const history = useHistory()
    const handleClick = async () => {
        await deleteProject()
        history.push('/')
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{projectDetails.project_name}</h2>
                <p className="due-date">
                    Project due by {projectDetails.due_date.split('T')[0]}
                </p>
                <p className="details">
                    {projectDetails.project_details}
                </p>
                <h4>Project is assigned to: </h4>
                <div className="assigned-users">
                    {projectDetails.assigned_to.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL}/>
                        </div>
                    ))}
                </div>
            </div>
            {user.id === projectDetails.user_id && (
                <button className="btn" onClick={handleClick}> Mark as Complete </button>
            )}
        </div>
    )
}

export default ProjectSummary