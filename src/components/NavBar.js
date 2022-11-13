import {Link, NavLink} from "react-router-dom"
import * as usersService from "../utilities/users-service"


//destructuring ({user & setUser}) from props below
const NavBar = ({user, setUser}) =>{

    const handleLogOut = () =>{
        //logout function from "utilities/users-service"
        usersService.logOut()

        setUser(null)
    }


    return(
        <nav>
            <NavLink to="/">Home</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/projects">Projects</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/projects/new">New Project</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="" onClick={handleLogOut}>Log Out</NavLink>
            <p>Welcome, {user.name}</p>
        </nav>
    )
}

export default NavBar