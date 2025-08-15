import Avatar from "../../components/Avatar"
import './Project.css'

const ProjectSummary = ({projectDetails}) => {
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
        </div>
    )
}

export default ProjectSummary