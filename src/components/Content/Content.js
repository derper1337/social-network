import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import MessagesContainer from "./Messages/MessageContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import UsersContainer from "./Users/UsersContainer";
import Login from "./Login/Login";


const Content = (props) => {

    return (
        <Routes>
            <Route path={"/login/*"} element={<Login/>}/>}
            <Route path={""} element={<Login/>}/>}
            <Route path="/profile/*" element={<ProfileContainer/>}/>
            <Route path="/messages/*" element={<MessagesContainer/>}/>
            <Route path="/users/*" element={<UsersContainer/>}/>
        </Routes>
    );
}

export default Content;