import {Link, NavLink} from "react-router-dom"

const NavBar = () =>{
    return(
        <nav>
            <NavLink to="/orders">Order History</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/orders/new">New Order</NavLink>
        </nav>
    )
}

export default NavBar