import EditProject from "./EditProject"
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

const ProjectDetails = (props) =>{
    const{project, setProject} = props
    console.log(project)
    const [projectToEdit, setProjectToEdit] = useState(null)
    const date = new Date(project[0].targetDate)

    const deliverablesList = project[0].deliverables.map((deliverable,idx)=>{
        return(
            <div key = {deliverable._id}>
                <h4>{deliverable.deliverableName}</h4>
                <p>{deliverable.deliverableBody}</p>
                <p>{deliverable.estimatedCost}</p>
                <p>{deliverable.estimatedTime}</p>
            </div>
        )
    })

    const constraintsList = project[0].constraints.map((constraint,idx)=>{
        return(
            <div key={constraint._id}>
                <h4>{constraint.constraintName}</h4>
                <p>{constraint.constraintBody}</p>
                <p>{constraint.estimatedCost}</p>
                <p>{constraint.estimatedTime}</p>
            </div>
        )
    })

    return(
        <div key={project._id}>
            {!projectToEdit ? (<div><h1>Project Details</h1>
            <p>{project[0].title}</p>
            <p>{project[0].client}</p>
            <p>${project[0].budget}</p>
            <p>{date.toDateString()}</p>
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