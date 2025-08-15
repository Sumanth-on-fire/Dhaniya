// styles
import { useState } from 'react'
import Select from 'react-select'
import './Create.css'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { useAuthContext } from '../../hooks/useAuthContext'
import { supabase, timestamp } from '../../supabase/config'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useCreateProject } from '../../hooks/useCreateProject'

const categories = [
  {value: 'development', label: 'Development'},
  {value: 'design', label: 'Design'},
  {value: 'sales', label: 'Sales'},
  {value: 'marketing', label: 'Marketing'}
]

export default function Create() {

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
  const {userList, fetchError, now, isPending} = useFetchUsers()
  const {user} = useAuthContext()
  const history = useHistory()
  const createProject = useCreateProject()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setFormError(null)

    if(!category){
      setFormError('Please select a project category.')
      return
    }
    if(assignedUsers.length < 1){
      setFormError('Please assign the project to at least 1 user')
      return
    }

    const assignedUsersList = assignedUsers.map(u => {
      const tempUser = userList.find(ind => ind.id === u.value)
      return {
        displayName: tempUser.user_first_name + ' ' + tempUser.user_last_name,
        photoURL: tempUser.photo_url,
      }
    })

    const createdBy = {
      displayName: user.displayName,
      photoURL: userList.find(ul => ul.user_id === user.id).photo_url,
      id: user.id
    }

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp(dueDate),
      assignedUsersList,
      createdBy,
      comments: []
    }

    const projectApiData = {
      user_id: user.id,
      project_name: name,
      project_details: details,
      due_date: timestamp(dueDate),
      project_category: category.value,
      assigned_to: assignedUsersList,
    }

    console.log(project)
    const insertError = await createProject(projectApiData)
    if (insertError){
      console.log("Error creating project :", )
    }else{
      history.push('/')
    }
  }

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          >
          </textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type='date'
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          ></input>
        </label>
        <label>
          <span>Project category: </span>
          <Select 
            onChange={option => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={option => setAssignedUsers(option)}
            options={userList ? userList.map(user => ({value: user.id, label: `${user.user_first_name} ${user.user_last_name}`})) : 'loading'}
            isMulti
          />
        </label>

        <button className='btn'>Add Project</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}