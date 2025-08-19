import { useEffect, useState } from "react"
import { useAddComments } from "../../hooks/project/useAddComments"
import { useRef } from "react"
import { useFetchUsers } from "../../hooks/user/useFetchUsers"
import { useAuthContext } from "../../hooks/auth/useAuthContext"
import Avatar from "../../components/Avatar"
import { useFetchProjectDetails } from "../../hooks/project/useFetchProjectDetails"

export const ProjectComments = ({projectId}) => {
    const {user} = useAuthContext()
    const {fetchUserById} = useFetchUsers()
    const [newComment, setNewComment] = useState('')
    const { addComments } = useAddComments(projectId)
    const {projectDetails, isLoading} = useFetchProjectDetails(projectId)
    const commentsRef = useRef([])
    
    useEffect(() => {
        if(!isLoading && projectDetails && projectDetails.comments && projectDetails.comments.length){
            console.log("printing the value of project details: ", projectDetails.comments)
            commentsRef.current = projectDetails.comments
        }
    }, [isLoading])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newComment) {
            console.log("Current project Id: ", projectId)
            const userDetails = await fetchUserById(user.id) 
            console.log("Printing the value of the user: ", userDetails)
            const currComment = {
                displayName: userDetails.user_first_name + ' ' + userDetails.user_last_name,
                photoUrl: userDetails.photo_url,
                content: newComment,
            }
            commentsRef.current.push(currComment)
            await addComments(commentsRef.current)
            setNewComment('')
        }
    }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>

            <ul>
                {!isLoading && commentsRef.current.length > 0 && commentsRef.current.map(comment => {
                   return  <li key={comment.displayName}>
                        <div className="comment-author">
                            <Avatar src={comment.photoUrl}/>
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>data here</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                })}
            </ul>

            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add new comment: </span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    >
                    </textarea>
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    )
}