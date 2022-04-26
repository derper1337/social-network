import {NavLink} from "react-router-dom";
import css from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={css.navbar}>
            <div>
                <NavLink to="/profile/">Profile</NavLink>
            </div>
            <div>
                <NavLink to="/messages">Messages</NavLink>
            </div>
            <div>
                <NavLink to="/users">Users</NavLink>
            </div>
            <div>
                <NavLink to="/settings">Settings</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;