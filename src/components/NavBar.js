import {Link, NavLink} from "react-router-dom"


//destructuring ({user}) from props below
const NavBar = ({user}) =>{
    return(
        <nav>
            <NavLink to="/orders">Order History</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/orders/new">New Order</NavLink>
            <p>Welcome, {user.name}</p>
        </nav>
    )
}

export default NavBar