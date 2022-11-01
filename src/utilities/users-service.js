// using the * syntax is imports everything from users-api
    //note: because we don't have a function named usersAPI, using the * will import everything from the "./users-api" file.  You can access the data from "./users-api" as usersAPI
import * as usersAPI from './users-api';



//1. signUp() takes in userData and then passes it to userAPI() which also takes in userData


export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData);
    // Baby step by returning whatever is sent back by the server
    return token;
  }