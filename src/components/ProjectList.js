import { Link } from "react-router-dom/cjs/react-router-dom.min"
import Avatar from "./Avatar"
import './ProjectList.css'

const ProjectList = ({projectList}) => {
    return (
        <div className="project-list">
            {projectList.length === 0 && <p>No Projects yet !</p>}
            {projectList.map((project) => (
                    <Link to={`/projects/${project.project_id}`} key={project.project_id}>
                        <h4>{project.project_name}</h4>
                    <p>Due by {project.due_date.split('T')[0]}</p>
                    <div className="assigned-to">
                        <p><strong>Assigned to: </strong></p>
                        <ul>
                            {project.assigned_to.map(user => (
                                <li className='user-avatar' key={user.photoURL}>
                                    <div>{user.displayName}</div>
                                    <Avatar src={user.photoURL}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProjectList