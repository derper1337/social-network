import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.loggedIn
    }
}

export const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Navigate replace to="/login"/>;
        return <Component {...props}/>
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}

export const profileRedirect = (Component, userId) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Navigate replace to={`/profile/${userId}`}/>;
        return <Component {...props}/>
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}