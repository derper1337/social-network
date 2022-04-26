import Header from "./Header";
import React from "react";
import {connect} from "react-redux";
import {logoutThunkCreator, setAuth} from "../../Redux/auth-reducer";

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        login: state.auth.login,
    }
};

export default connect(mapStateToProps, {setAuth, logoutThunkCreator})(Header);