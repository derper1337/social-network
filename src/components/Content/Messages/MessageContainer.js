import React, {useEffect} from "react";
import Messages from "./Messages";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../HOCs/WIthAuthRedirect";
import {compose} from "redux";
import {usersAPI} from "../../../ api/api";
import {useParams} from "react-router";
import {unfollowThunkCreator} from "../../../Redux/users-reducer";

let mapStateToProps = (state) => {
    return {
        messageData: state.messageData,
        login:state.auth.login,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage() {
            dispatch({type: "ADD-MESSAGE"});
        },
        textareaChange(text) {
            dispatch({type: "CHANGE-MESSAGE", text: text});
        },
        getFriends() {
            usersAPI.getFriends().then(data => {
                dispatch({type: "SET-FRIENDS", friends: data.items});
                dispatch({type: "SET-DIALOGS"})
            });
        },
        setActiveDialog(dialogName){
          dispatch({type:"SET-ACTIVE-DIALOG", dialogName:dialogName})
        },
        deleteFriend(userId){
            dispatch(unfollowThunkCreator(userId));
            usersAPI.getFriends().then(data => {
                dispatch({type: "SET-FRIENDS", friends: data.items});
                dispatch({type: "SET-DIALOGS"})
            });
        }
    }
}

let MessageAPI = (props) => {
    let userId = Object.values(useParams())[0];
    useEffect(() => {
        props.getFriends();
        props.setActiveDialog(userId);
    }, [])
    return <Messages {...props}/>
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(MessageAPI);