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

