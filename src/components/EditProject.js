import {useState} from "react"
import * as projectsService from "../utilities/projects-service"

const EditProject = (props) =>{
    const{project, setProject, projectToEdit, setProjectToEdit} = props
    const [deliverableToEdit, setDeliverableToEdit] = useState({
        deliverableName: "",
        deliverableBody: "",
        estimatedCost: "",
        actualCost: "",
        estimatedTime: "",
        actualTime: "",
})

const [constraintToEdit, setConstraintToEdit] = useState({
    constraintName: "",
    constraintBody: "",
    showStopper: false
})

   console.log(deliverableToEdit)
   console.log(constraintToEdit)
   console.log(projectToEdit)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            //put in update function for PUT request
            const proj = await projectsService.updateProject(projectToEdit)
            setProject(proj)

        setProjectToEdit(null)
        } catch (error) {
            console.log(error)
        }
    }

    const updateDeliverable = (e)=>{
        e.preventDefault()
        setDeliverableToEdit(deliverableToEdit)
    }

    const updateConstraint = (e) =>{
        e.preventDefault()
        setConstraintToEdit(constraintToEdit)
    }

    const handleHeaderChange = (e)=>{
        setProjectToEdit({...projectToEdit, [e.target.name]: e.target.value})
    }

    const handleDeliverableToEditChange = (e)=>{
        setDeliverableToEdit({...deliverableToEdit, [e.target.name]: e.target.value})

    }

    const handleConstraintToEditChange = (e)=>{
        setConstraintToEdit({...constraintToEdit, [e.target.name]: e.target.value})
    }


    const date = new Date(projectToEdit[0].targetDate)

    const deliverablesToEdit = projectToEdit[0].deliverables.map((deliverable,idx)=>{
        return(
            <div key={deliverable._id}>
                <button onClick={()=>{setDeliverableToEdit(deliverable)}}><p>{deliverable.deliverableName}</p></button>
            </div>
        )
    })

    const constraintsToEdit = projectToEdit[0].constraints.map((constraint,idx)=>{
        return(
            <div key = {constraint._id}>
                <button onClick={()=>{setConstraintToEdit(constraint)}}><p>{constraint.constraintName}</p></button>
            </div>
        )
    })

    return(
        <div>
            <button onClick={()=>{setProject(null)}}>Projects List</button>
            <button onClick={()=>{setProjectToEdit(null)}}>Back</button>
            <h1>Edit Project Form</h1>
            
            {/* Tried to use method override here */}
            <form onSubmit={handleSubmit} action={`/api/projects/${projectToEdit[0]._id}?_method=PUT`} method="POST">
            <label>Title</label>
            <input type="text" name="title" defaultValue={projectToEdit[0].title} onChange={handleHeaderChange}/>

            <label>Client</label>
            <input type="text" name="client" defaultValue={projectToEdit[0].client} onChange={handleHeaderChange}/>

            <label>Budget</label>
            <input type="text" name="budget" defaultValue={projectToEdit[0].budget} onChange={handleHeaderChange}/>

            <label>Target Date</label>
            <input type="text" name="targetDate" defaultValue={date.toDateString()} onChange={handleHeaderChange}/>

            <br/>
            <button >Edit Project</button>

            </form>

            {deliverablesToEdit}

            <form onSubmit={updateDeliverable}>
                <label>Deliverable Name</label>
                <input type="text" name="deliverableName" defaultValue={deliverableToEdit.deliverableName} value={deliverableToEdit.deliverableName} onChange={handleDeliverableToEditChange}/>

                <label>Deliverable Body</label>
                <input type ="text" name="deliverableBody" defaultValue={deliverableToEdit.deliverableBody} value={deliverableToEdit.deliverableBody} onChange={handleDeliverableToEditChange}/>

                <label>Estimated Cost</label>
                <input type ="text" name="estimatedCost" defaultValue={deliverableToEdit.estimatedCost} value={deliverableToEdit.estimatedCost} onChange={handleDeliverableToEditChange}/>

                <label>Actual Cost</label>
                <input type ="text" name="actualCost" defaultValue={deliverableToEdit.actualCost} value={deliverableToEdit.actualCost} onChange={handleDeliverableToEditChange}/>

                <label>Estimated Time</label>
                <input type ="text" name="estimatedTime" defaultValue={deliverableToEdit.estimatedTime} value={deliverableToEdit.estimatedTime} onChange={handleDeliverableToEditChange}/>

                <label>Actual Time</label>
                <input type ="text" name="actualTime" defaultValue={deliverableToEdit.actualTime} value={deliverableToEdit.actualTime} onChange={handleDeliverableToEditChange}/>
                <br/>
                <button>Edit Deliverable</button>

            </form>

            {constraintsToEdit}

            <form onSubmit={updateConstraint}>
            <label>Constraint Name</label>
            <input type="text" name="constraintName" defaultValue={constraintToEdit.constraintName} value={constraintToEdit.constraintName} onChange={handleConstraintToEditChange}/>
            
            <label>Constraint Body</label>
            <input type="text" name="constraintBody" defaultValue={constraintToEdit.constraintBody} value={constraintToEdit.constraintBody} onChange={handleConstraintToEditChange}/>

            <br/>
            <button >Edit Deliverable</button>
            </form>

        </div>
    )
}

export default EditProject