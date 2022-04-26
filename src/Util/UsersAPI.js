import React, {PureComponent, useEffect} from "react";
import Users from "./Users";
import Preloader from "../../common/preloader/preloader";

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

export default UsersAPI;
