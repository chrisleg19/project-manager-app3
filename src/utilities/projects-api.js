const BASE_URL="/api/projects"

export function create(projectData){
    return sendRequest(BASE_URL, "POST", projectData)
}

export function listProjects(){
    return sendRequest(BASE_URL, "GET" )
}

export function updateProject(projectToEdit){
    return sendRequest(BASE_URL + `/${projectToEdit._id}`, "PUT", projectToEdit)
}

export function updateDeliverable(deliverableToEdit){
    console.log("PROJECTS-API...working", deliverableToEdit)

    console.log("DELIVERABLE TO EDIT ID",deliverableToEdit._id)

    return sendRequest(BASE_URL + `/${deliverableToEdit._id}`, "PUT", deliverableToEdit)

}




export function deleteProject(projectToEdit){
    return sendRequest(BASE_URL + `/${projectToEdit._id}`, "DELETE", projectToEdit)
}

async function sendRequest(url, method = 'GET', payload = null) {
    const options = { method };
    if (payload) {
        options.headers = { 'Content-Type': 'application/json'};
    options.body = JSON.stringify(payload);
  }
  
    const res = await fetch(url, options);
    if (res.ok) return res.json();
    throw new Error('Bad Request');
}