//example using a class component below:

import {Component} from "react"
import { signUp } from "../utilities/users-service";

//? NOTE: flow of the data   =>   src/components/SignUpForm/SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
      };

      //This function is updating the sate of the object with whatever is typed in each field
      handleChange = (event) =>{
        //event.target.name is the "name" of the field in the form
            //example:  event.target.name (is the email)  :  event.target.value (is whatever is typed in the empty field)
        this.setState({[event.target.name]: event.target.value, error:""})
      }

      //Function to handle submitting the form
        //Note: Make sure to use arrow function because they create their own "this" keyword (ES6).  Otherwise you'll have to use a "bind" function (ES5).
      handleSubmit = async (event) => {

        //stops form from reloading page (default behavior)
        event.preventDefault()

        //for testing: taking this.state and converting the JSON data to a string so alert box can display
            // alert(JSON.stringify(this.state))

        //==================================================================
        //one way we can send necessary data about the user to the database:
                // const formData = {...this.state};
                // delete formData.error;
                // delete formData.confirm;
        //==================================================================
      
        try {

            //another way we can send necessary date about the user to the database:
            //when user clicks submit button, a new formData object is created with only necessary data.  this will be sent to the db
            const formData = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }

            //pass formData to signUp function
            const user = await signUp(formData)
            console.log(user)
            
        } catch {
            //if we have an error, we will set this to the state (error:"")
            this.setState({error:"Sign Up Failed - Try Again"})
        }
      }


      //NOTE: We will create smaller components for front end to make code more organized and reusable.
      //NOTE: We will organize our code into modules: 
                //- Utility Modules: Modules that hold general purpose functions, for example, a formatTime(seconds)function. These modules are reusable in multiple projects.

                //- Service Modules: Service modules are where we can organize application specific logic such as functions for signing-up or logging in a user. Service modules often use and depend upon API modules...

                //- API Modules: API modules: API modules are for abstracting logic that make network requests such as AJAX calls to the backend or third-party APIs. This abstraction makes it easier to refactor code to use different techniques, libraries, etc. For example, we are going to be using fetch for our AJAX communications, however, refactoring to use a library such as Axios would be made easy thanks to the use of API modules.

        //NOTE: see "flow chart for frontend & backend modules.jpg"
        //NOTE: functions inside of users-api.js and user-services.js could be put in the handleSubmit function, but that is not best practices, which is why we created separate utility files. 


      render() {
        //variable to enable/disable sign up button
        const disable = this.state.password !== this.state.confirm;

        //onChange = {this.handleChange} (handleChange function) is the way we can update the form with new info
            //Note: onChange is using setState function through the handleChange()
        return (
          <div>
            <div className="form-container">

              <form autoComplete="off" onSubmit={this.handleSubmit}>

                <label>Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />

                <label>Email</label>
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />

                <label>Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />

                <label>Confirm</label>
                <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />

                {/* disable property will turn sign up button on/off based on boolean value */}
                <button type="submit" disabled={disable}>SIGN UP</button>

              </form>

            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
      }
  }