import EditProject from "./EditProject"
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";


const ProjectDetails = (props) =>{
    const{project, setProject} = props
    console.log(project, "PROJECT FROM PROJECT DETAILS PAGE")
    const [projectToEdit, setProjectToEdit] = useState(null)
    const date = new Date(project[0].targetDate)

    const deliverablesList = project[0].deliverables.map((deliverable,idx)=>{
        return(
            <div key = {deliverable._id}>
                
                <h5 style={{color:"green"}}>{deliverable.deliverableName}</h5>
                <p>Details: {deliverable.deliverableBody}</p>
                <p>Estimated Cost: ${deliverable.estimatedCost}</p>
                <p>Estimated Time (days): {deliverable.estimatedTime}</p>
            </div>
        )
    })

    const constraintsList = project[0].constraints.map((constraint,idx)=>{
        return(
            <div key={constraint._id}>
                
                <h5 style={{color:"red"}}>{constraint.constraintName}</h5>
                <p>Details: {constraint.constraintBody}</p>
                <p>{constraint.estimatedCost}</p>
                <p>{constraint.estimatedTime}</p>
            </div>
        )
    })

    return(
        <div key={project._id}>
            
            {!projectToEdit ? (<div>
            <h4>{project[0].title}</h4>
            <p>Client: {project[0].client}</p>
            <p>Budget: ${project[0].budget}</p>
            <p>Target Date: {date.toDateString()}</p>
            <div>{deliverablesList}</div>
            <div>{constraintsList}</div>
            <button onClick={()=>{setProject(null)}}>Back</button>
            <button onClick={()=>{setProjectToEdit(project)}}>Edit Project</button>
            </div>):

            (<>
            <Routes>
            <Route path="" element={<EditProject projectToEdit={projectToEdit} setProjectToEdit={setProjectToEdit} setProject={setProject} project={project}/>}/>
            </Routes>
            </>)}
        </div>
    )
}

export default ProjectDetails