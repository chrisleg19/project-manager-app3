import * as projectsAPI from "./projects-api"

export async function create(projectData){
    const project = await projectsAPI.create(projectData)
    return project
}

export async function listProjects(){
    const listOfProjects = await projectsAPI.listProjects()
    // console.log("list Of Projects", listOfProjects)
    return listOfProjects
}

export async function updateProject(projectToEdit){
    //sending projectToEdit as an object
    const project = await projectsAPI.updateProject(projectToEdit)
    //receiving edited project from backend and setting it to an array
    return [project]
}

export async function updateDeliverable(deliverableToEdit){
    console.log("Projects-Service (deliverableToEdit)", deliverableToEdit)
    const deliverable = await projectsAPI.updateDeliverable(deliverableToEdit)
    console.log("PROJECT-SERVICE DELIVERABLE", [deliverable])
    return [deliverable]
}










export async function deleteProject(projectToEdit){
    const project = await projectsAPI.deleteProject(projectToEdit)
}