
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