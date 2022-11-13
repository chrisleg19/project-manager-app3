const BASE_URL="/api/projects"

export function create(projectData){
    return sendRequest(BASE_URL, "POST", projectData)
}

export function listProjects(){
    return sendRequest(BASE_URL, "GET" )
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