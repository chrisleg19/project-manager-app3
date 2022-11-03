//LONG VERSION OF CODE: 

/*
// This is the base path of the Express route we'll define
const BASE_URL = "/api/users"

export async function signUp(userData){

// Fetch uses an options object as a second arg to make requests
// other than basic GET requests, include data, headers, etc.
const res = await fetch(BASE_URL, {
    method: "POST",
    //telling the backend what kind of data we are sending (json data)
    headers: {"Content-Type": "application/json"},
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
        //NOTE: strigify will take json object and make it a string / parse will take a string and make it a json object
    body: JSON.stringify(userData)
})

    //NOTE res.ok is a property of the response object (a boolean value) (anything in the 200s status is ok)
if(res.ok){
    return res.json()
} else{
    //using keyword "throw" you can create an instance of your own error
    throw new Error("Invalid Sign Up")
}

}



export async function login(userData){

    const res = await fetch("/api/users/login", {
        method: "POST",
        
        headers: {"Content-Type": "application/json"},
       
        body: JSON.stringify(userData)
    }) 
       
    if(res.ok){
        return res.json()

    } else{
        
        throw new Error("Invalid Sign Up")
    }
    }

    */

//MORE DRY VERSION OF CODE:


import {getToken} from "./users-service"

const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json'};
    options.body = JSON.stringify(payload);
  }

  const token = getToken();
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }


  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}



//function to check token expiration date: 
export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
  }