// using the * syntax is imports everything from users-api
    //note: because we don't have a function named usersAPI, using the * will import everything from the "./users-api" file.  You can access the data from "./users-api" as usersAPI
import * as usersAPI from './users-api';


//signUp() function takes in userData and then passes it to userAPI() which also takes in userData
export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData);
    //// Baby step by returning whatever is sent back by the server
    //// return token;
    //we want to ultimately STORE THE TOKEN IN LOCAL STORAGE
        //1st parameter is token's name, 2nd parameter is the token
    localStorage.setItem("SEI_token", token)
    return getUser()
  }


  //function to get token from database and checks it
  export function getToken(){
    //get token from local storage
    const token = localStorage.getItem("SEI_token")
    //if no token, return null
    if(!token)return null
    //if we have a token, parse the data and assign to "payload" (getting the token's payload)
    const payload = JSON.parse(atob(token.split(".")[1]))
    console.log(payload)

    //checking expiration of token (is the token expired?)
        //NOTE: A JWT's exp is expressed in seconds, not milliseconds, so convert it by /1000
    if(payload.exp < Date.now() / 1000){

        //if token is expired - remove it from localStorage & return null
        localStorage.removeItem("SEI_token")
        return null
    }
    //if token is not expired, return token
    return token
  }


  //function to get the user info from token
  export function getUser(){
    //run getToken() function above and set results to variable token
    const token = getToken()
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }


  //logout function used in Nav-Bar that removes token from local storage
  export function logOut() {
    localStorage.removeItem('SEI_token');
    }


    export async function login(userData) {
      //run login() in users-api.js
      const token = await usersAPI.login(userData);
      //save token to local storage
      localStorage.setItem("SEI_token", token)
      //return results of getUser() function
      return getUser()
    }


    export async function checkToken(){
      //// console.log("expDate")
      //// alert("clicked")
      //// Just so that you don't forget how to use .then
      //run checkToken() function in users-api.js
      return usersAPI.checkToken()
      // checkToken returns a string, but make it a Date object for more flexibility
      .then(dateStr => new Date(dateStr));
    }