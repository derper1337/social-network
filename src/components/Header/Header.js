import css from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {useState} from "react";
import LogoutButton from ".././common/images/LogOut.png";

const Header = (props) => {
    let [currentPage, setCurrentPage] = useState();
    return (
        <div className={css.header}>

            <div className={currentPage==="Profile" ? css.ActivePage : null}>
                <NavLink onClick={()=>setCurrentPage("Profile")} to="/profile/"><span>Profile</span></NavLink>
            </div>
            <div className={currentPage==="Messages" ? css.ActivePage : null}>
                <NavLink onClick={()=>setCurrentPage("Messages")} to="/messages"><span>Messages</span></NavLink>
            </div>
            <div className={currentPage==="Users" ? css.ActivePage : null}>
                <NavLink onClick={()=>setCurrentPage("Users")} to="/users"><span>Users</span></NavLink>
            </div>

            <div className={css.loginBlock}>
                {props.loggedIn
                    ? <div className={css.login}>
                        <span>{props.login}</span>
                        <button onClick={props.logoutThunkCreator}><img width={"20px"} src={LogoutButton}/></button>
                    </div>
                    : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </div>
    );
}

export default Header;