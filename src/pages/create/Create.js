// styles
import { useEffect, useState } from 'react'
import Select from 'react-select'
import './Create.css'
import { useFetchUsers } from '../../hooks/useFetchUsers'

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
  

  const handleSubmit = async (e) =>{
    e.preventDefault()

    console.log(name, details, dueDate, category.value, assignedUsers)
  }

  useEffect(() => {
    console.log("Printing the users list: ", userList)
  }, [])

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
            // isOptionDisabled={isPending}
            onChange={option => setAssignedUsers(option)}
            // isLoading={isPending}
            // isSearchable={!isPending}
            options={userList ? userList.map(user => ({value: user.id, label: `${user.user_first_name} ${user.user_last_name}`})) : 'loading'}
          />
        </label>

        <button className='btn'>Add Project</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}