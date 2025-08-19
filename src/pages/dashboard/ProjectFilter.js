import { useState } from "react"
import './Dashboard.css'

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']
const ProjectFilter = ({handleChangeFilter}) => {
    const [currentFilter, setCurrentFilter] = useState('all')

    const handleClick = (newFilter) => {
        setCurrentFilter(newFilter)
        handleChangeFilter(newFilter)
    }

    return (
        <div className="project-filter">
            <nav>
                <p>Filter by: </p>
                {
                    filterList.map(f =>(
                        <button
                        key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                        >
                            {f}
                        </button>
                    ))
                }
            </nav>
        </div>
    )
}

export default ProjectFilter