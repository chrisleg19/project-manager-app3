// using the * syntax is imports everything from users-api
    //note: because we don't have a function named usersAPI, using the * will import everything from the "./users-api" file.  You can access the data from "./users-api" as usersAPI
import * as usersAPI from './users-api';



//1. signUp() takes in userData and then passes it to userAPI() which also takes in userData


export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData);
    // Baby step by returning whatever is sent back by the server
    // return token;

    //we want to ultimately STORE THE TOKEN IN LOCAL STORAGE
        //1st parameter is token's name, 2nd parameter is the token
    localStorage.setItem("SEI_token", token)
    return getUser()
  }


  //function to get token from database and checks it
  export function getToken(){
    //get token from local storage
    const token = localStorage.getItem("SEI_token")
    if(!token)return null

    //if we have a token, we will get the token's payload
    const payload = JSON.parse(atob(token.split(".")[1]))
    console.log(payload)

    //checking expiration of token
        //NOTE: A JWT's exp is expressed in seconds, not milliseconds, so convert it by /1000
    if(payload.exp < Date.now() / 1000){

        //if token is expired - remove it from localStorage
        localStorage.removeItem("SEI_token")
        return null
    }
    return token

  }


  //function to get the user info from token
  export function getUser(){
    const token = getToken()
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }