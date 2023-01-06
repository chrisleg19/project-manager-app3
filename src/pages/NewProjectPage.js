

import {create} from "../utilities/projects-service"
import {useState} from "react"


const NewProjectPage = (props) =>{
    const {deliverable, setDeliverable, constraint, setConstraint} = props
    const [formData, setFormData] = useState({
        title: "",
        client: "",
        budget: "",
        targetDate: "",
        deliverables: [],
        constraints: [],
        error: ""
    })


const[deliverables, setDeliverables] = useState([])


const addDeliverable = (event) =>{
    event.preventDefault();
    setDeliverables([...deliverables, deliverable])
    setDeliverable({
        deliverableName: "",
        deliverableBody: "",
        estimatedCost: "",
        actualCost: "",
        estimatedTime: "",
        actualTime: "",
})
}

const[constraints, setConstraints] =useState([])


const addConstraint = (event)=>{
        event.preventDefault()
        setConstraints([...constraints, constraint])
        setConstraint({
            constraintName: "",
            constraintBody: "",
            showStopper: false
        })
    }


    const handleFormChange =(event)=>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleDeliverableChange =(event)=>{
        setDeliverable({...deliverable, [event.target.name]: event.target.value})
    }

    const handleConstraintChange =(event)=>{
        setConstraint({...constraint, [event.target.name]: event.target.value})
    }    

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try {
            
            const project = {
                title: formData.title,
                client: formData.client,
                budget: formData.budget,
                targetDate: formData.targetDate,
                deliverables: deliverables,
                constraints: constraints
            }
            
            const projectData = await create(project)

            console.log(projectData)
            
        } catch (error) {
            setFormData({error: "Creation Failed - Try Again"})
        }
    }


    return (
        <div>
            <h1>New Project</h1>

            {/* {Create New Project Form} */}
            <form autoComplete="off" onSubmit={handleSubmit}>

            <button type="submit">Create Project</button>

            <label>Title</label>
            <input type="text" name="title" value={formData.value} onChange={handleFormChange} required />

            <label>Client</label>
            <input type="text" name="client" value={formData.value} onChange={handleFormChange} required />

            <label>Budget</label>
            <input type="text" name="budget" value={formData.value} onChange={handleFormChange} required />

            <label>Target Date</label>
            <input type="text" name="targetDate" value={formData.value} onChange={handleFormChange} required />
                
            </form>

            <br/>

            {/* {Add New Deliverable Form} */}
            <form onSubmit={addDeliverable}>

            <label>Deliverable Name:</label>
            <input type="text" name="deliverableName" value={deliverable.deliverableName} onChange={handleDeliverableChange}  />

            <label>Deliverable Body:</label>
            <input type="text" name="deliverableBody" value={deliverable.deliverableBody} onChange={handleDeliverableChange}  />

            <label>Deliverable Estimated Cost:</label>
            <input type="text" name="estimatedCost" value={deliverable.estimatedCost} onChange={handleDeliverableChange}  />

            <label>Deliverable Actual Cost:</label>
            <input type="text" name="actualCost" value={deliverable.actualCost} onChange={handleDeliverableChange}  />

            <label>Deliverable Estimated Time:</label>
            <input type="text" name="estimatedTime" value={deliverable.estimatedTime} onChange={handleDeliverableChange}  />

            <label>Deliverable Actual Time:</label>
            <input type="text" name="actualTime" value={deliverable.actualTime} onChange={handleDeliverableChange}  /> <br/>

            <button>Add Deliverable</button>

            </form>

            <br/>

            {/* {Add New Constraint Form} */}
            <form onSubmit={addConstraint}>

            <label>Constraint Name:</label>
            <input type="text" name="constraintName" value={constraint.constraintName} onChange={handleConstraintChange}  />

            <label>Constraint Body:</label>
            <input type="text" name="constraintBody" value={constraint.constraintBody} onChange={handleConstraintChange}  />

            <label>Constraint Show Stopper:</label>
            <input type="checkbox" id="showStopper" name="showStopper" value={constraint.showStopper} onChange={handleConstraintChange}/> <br/>

            <button>Add Constraint</button>
            
            </form>
        
        </div>
    )
}

export default NewProjectPage