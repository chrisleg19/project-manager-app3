import {Link, NavLink} from "react-router-dom"
import * as usersService from "../utilities/users-service"


//destructuring ({user}) from props below
const NavBar = ({user, setUser}) =>{

    const handleLogOut = () =>{
        usersService.logOut()

        setUser(null)
    }


    return(
        <nav>
            <NavLink to="/orders">Order History</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/orders/new">New Order</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="" onClick={handleLogOut}>Log Out</NavLink>
            <p>Welcome, {user.name}</p>
        </nav>
    )
}

export default NavBar