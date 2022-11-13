import {useState, useEffect} from "react"
import ProjectDetails from "../components/ProjectDetails"

const ProjectsPage = (props) =>{
const [project, setProject] = useState(null)
const{projects}=props

const display = projects.map((project,idx)=>{
    
    const date = new Date(project.targetDate)
   
    return(

        <div key = {project._id}>
            <h2>{project.title}</h2>
            <button onClick={(e)=>{setProject(projects.filter(p=>p._id===project._id))}}>Select Project</button>

        </div>
    ) 
})

    return (
        <div>
            <h1>Projects Page</h1>         
            {project?null: display}
            {project?<ProjectDetails project ={project} setProject={setProject}/>:null}

        </div>
    )
}

export default ProjectsPage



