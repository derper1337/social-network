import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router";
import {
    textareaChange,
    addPost,
    setUserProfile,
    getProfileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator, updateProfileThunkCreator, updateAvatarThunkCreator
} from "../../../Redux/profileReducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../../HOCs/WIthAuthRedirect";
import Profile from "./Profile";
import {followThunkCreator, unfollowThunkCreator} from "../../../Redux/users-reducer";

let UrlDataContainer = (props) => {
    let userId = Object.values(useParams())[0];
    if (userId === "") userId=props.myId;
    return <ProfileAPI {...props} userId={userId}/>
}

const ProfileAPI = (props) => {
    useEffect(() => {
        props.getProfileThunkCreator(props.userId);
        props.getStatusThunkCreator(props.userId);
    }, [props.userId]);
    return <Profile {...props} updateStatus={props.updateStatusThunkCreator}/>
}

let mapStateToProps = (state) => {
    return {
        ProfileData: state.ProfileData,
        isAuth: state.auth.loggedIn,
        myId: state.auth.id,
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        followThunkCreator,
        unfollowThunkCreator,
        textareaChange,
        addPost,
        setUserProfile,
        getProfileThunkCreator,
        getStatusThunkCreator,
        updateStatusThunkCreator,
        updateProfileThunkCreator,
        updateAvatarThunkCreator,
    }),
)(UrlDataContainer);