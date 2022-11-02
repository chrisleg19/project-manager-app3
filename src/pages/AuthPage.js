import {useState} from "react"
import LoginForm from "../components/LogInForm"
import SignUpForm from "../components/SignUpForm"

const AuthPage = (props) =>{
    const {setUser} = props
    const [showSignUp, setShowSignup] = useState(true)
    return (
        <div>
            <h1>AuthPage</h1>
            {showSignUp ? <SignUpForm setUser={setUser}/> :
            <LoginForm setUser={setUser}/>}

            <button onClick ={()=> setShowSignup(!showSignUp)}>{showSignUp ? "Log In" : "Sign Up"}</button>
        </div>
    )
}

export default AuthPage