import {useState, useEffect} from "react"
import ProjectDetails from "../components/ProjectDetails"

const ProjectsPage = (props) =>{
const [project, setProject] = useState(null)
const{projects}=props

const display = projects.map((project,idx)=>{
    
    const date = new Date(project.targetDate)
   
    return(

        <div key = {project._id}>
            <h3>{project.title}</h3>
            <h5>Client: {project.client}</h5>
            <h5>Target Date: {date.toDateString()}</h5>
            <button onClick={(e)=>{setProject(projects.filter(p=>p._id===project._id))}}>Select Project</button>

        </div>
    ) 
})

    return (
        <div >
            
            <h1>Projects</h1>  
            <br/>       
            {project?null: display}
            {project?<ProjectDetails project ={project} setProject={setProject}/>:null}

        </div>
    )
}

export default ProjectsPage


const styles ={
    h3:{backgroundColor: "blue"}, 
    projCard:{display: "flex", flexDirection:"column"},
    body: {display:"flex", flexWrap:"wrap"}
}
