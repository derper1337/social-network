import React, {PureComponent} from "react";
import Profile from "./Profile";
import {updateStatusThunkCreator} from "../../../Redux/profileReducer";



class ProfileAPI extends PureComponent {
    componentDidMount(){
        let userId = this.props.userId;
        if (userId === ""){
           userId = this.props.myId
        }
        this.props.getProfileThunkCreator(userId);
        this.props.getStatusThunkCreator(userId);
    }

    render() {
        console.log("RENDERED PROFILE")
        return <Profile {...this.props} updateStatus={this.props.updateStatusThunkCreator}/>
    }
}

export default ProfileAPI;