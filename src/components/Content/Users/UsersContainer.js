import {connect} from "react-redux";
import {compose} from "redux";
import {
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator, searchUsersThunkCreator
} from "../../../Redux/users-reducer";
import {getFollowingInProgress, getPageInfo, getUsers} from "../../../Redux/users_selectors";
import React, {useEffect} from "react";
import Preloader from "../../common/preloader/preloader";
import Users from "./Users";
import {withAuthRedirect} from "../../../HOCs/WIthAuthRedirect";

const UsersAPI = (props) => {
    useEffect(() => {
        props.getUsersThunkCreator(props.pageInfo.currentPage, props.pageInfo.pageSize);
    }, []);

    let onPageChange = (pageNumber) => {
        props.getUsersThunkCreator(pageNumber, props.pageInfo.pageSize);
    }
    return props.pageInfo.isLoading ? <Preloader/> :
        <Users {...props} onPageChange={onPageChange}/>
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageInfo: getPageInfo(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        getUsersThunkCreator, followThunkCreator, unfollowThunkCreator, searchUsersThunkCreator
    })
)(UsersAPI);