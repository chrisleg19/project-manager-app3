import {useState} from "react"
import * as projectsService from "../utilities/projects-service"

const EditProject = (props) =>{
    const{project, setProject, projectToEdit, setProjectToEdit, deliverable, setDeliverable, constraint, setConstraint} = props
    // console.log("Beginning of EditProjectPage",projectToEdit[0].deliverables)
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



    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            //sending project to PUT as an object
            const proj = await projectsService.updateProject(projectToEdit[0])
            //argument: proj is returned as an array after the PUT request (this was done in project-service.js)
            setProject(proj)
            console.log(proj)
            // console.log(projectToEdit, "PROJ TO EDIT")

        setProjectToEdit(null)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTheProject = async (e)=>{
        e.preventDefault()
        try {
            const proj = await projectsService.deleteProject(projectToEdit[0])
            setProject(proj)
        } catch (error) {
            console.log(error)
        }
    }

    const updateDeliverable = async (e)=>{
        e.preventDefault()
        setDeliverableToEdit(deliverableToEdit)
        console.log("UPDATE DELIVERABLE FNC",deliverableToEdit)
        console.log("DELIVERABLE BEFORE UPDATE", projectToEdit[0].deliverables)
    }

    const updateConstraint = (e) =>{
        e.preventDefault()
        setConstraintToEdit(constraintToEdit)
    }

    const handleHeaderChange = (e)=>{
        const obj = {...projectToEdit[0], [e.target.name]: e.target.value}
        setProjectToEdit([obj])
    }

    const handleDeliverableToEditChange = (e)=>{
        setDeliverableToEdit({...deliverableToEdit, [e.target.name]: e.target.value})

    }

    const handleConstraintToEditChange = (e)=>{
        setConstraintToEdit({...constraintToEdit, [e.target.name]: e.target.value})
    }

    // console.log(projectToEdit, "CHECKING TARGET DATE")
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
            <form onSubmit={handleSubmit} >
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
            <br/>
            

            </form>

            {deliverablesToEdit}

            <form onSubmit={updateDeliverable}>
                <label>Deliverable Name</label>
                <input type="text" name="deliverableName" defaultValue={deliverableToEdit.deliverableName}  onChange={handleDeliverableToEditChange}/>
                {/* value={deliverableToEdit.deliverableName} */}

                <label>Deliverable Body</label>
                <input type ="text" name="deliverableBody" defaultValue={deliverableToEdit.deliverableBody}  onChange={handleDeliverableToEditChange}/>
                {/* value={deliverableToEdit.deliverableBody} */}

                <label>Estimated Cost</label>
                <input type ="text" name="estimatedCost" defaultValue={deliverableToEdit.estimatedCost} />
                {/* value={deliverableToEdit.estimatedCost} onChange={handleDeliverableToEditChange} */}

                <label>Actual Cost</label>
                <input type ="text" name="actualCost" defaultValue={deliverableToEdit.actualCost} />
                {/* value={deliverableToEdit.actualCost} onChange={handleDeliverableToEditChange} */}

                <label>Estimated Time</label>
                <input type ="text" name="estimatedTime" defaultValue={deliverableToEdit.estimatedTime} />
                {/* value={deliverableToEdit.estimatedTime} onChange={handleDeliverableToEditChange} */}

                <label>Actual Time</label>
                <input type ="text" name="actualTime" defaultValue={deliverableToEdit.actualTime} />
                {/* value={deliverableToEdit.actualTime} onChange={handleDeliverableToEditChange} */}
                <br/>
                <button>Edit Deliverable</button>

            </form>

            {constraintsToEdit}

            <form onSubmit={updateConstraint}>
            <label>Constraint Name</label>
            <input type="text" name="constraintName" defaultValue={constraintToEdit.constraintName}  onChange={handleConstraintToEditChange}/>
            {/* value={constraintToEdit.constraintName} */}
            
            <label>Constraint Body</label>
            <input type="text" name="constraintBody" defaultValue={constraintToEdit.constraintBody}  onChange={handleConstraintToEditChange}/>
            {/* value={constraintToEdit.constraintBody} */}

            <br/>
            <button >Edit Deliverable</button>
            </form>

            <button onClick={deleteTheProject}>Delete Project</button>

        </div>
    )
}

export default EditProject