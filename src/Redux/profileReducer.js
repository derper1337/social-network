import {profileAPI, usersAPI} from "../ api/api";

let initValue = {
    posts: [
        {id: "1", likesCount: 3, text: "Hi! Unfortunately, current version of API doesn't support post creation on the server side, but you can add them localy, in your profile page!"},
    ],
    newPostText: {id: "5", likesCount: 0, text: ""},
    profile: null,
    status: null,
};
const profileReducer = (state = initValue, action) => {

    switch (action.type) {
        case "ADD-POST": {
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(Object.assign({}, state.newPostText));
            stateCopy.newPostText.text = '';
            return stateCopy;}
        case "CHANGE-POST": {
            let stateCopy = {...state};
            stateCopy.newPostText.text = action.text;
            return stateCopy;
        }
        case "SET-USER-PROFILE":{
            return {...state, profile: action.profile}
        }
        case "SET-USER-STATUS":{
            return {...state, status: action.status}
        }
        case "SET-USER-AVATAR":{
            return {...state, profile:{...this, photos: action.photos}}
        }
        default:
            return state;
    }

}
export const addPost = () => ({type: "ADD-POST"});
export const textareaChange = (text) => ({type: "CHANGE-POST",text: text.current.value});
export const setUserProfile = (profile) => ({type:"SET-USER-PROFILE", profile:profile});
export const setProfileStatus = (status) => ({type:"SET-USER-STATUS", status:status})
export const setUserAvatar = (photos) => ({type:"SET-USER-AVATAR", photos:photos})

export const getProfileThunkCreator = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            })
    }
}

export const getStatusThunkCreator = (userId) => {
    return (dispatch) => {
        if(userId==""){
            userId=2;
        }
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setProfileStatus(response.data));
            })
    }
}

export const updateStatusThunkCreator = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                console.log(response);
                dispatch(setProfileStatus(status));
            })
    }
}

export const updateProfileThunkCreator = (profile) => {
    return (dispatch) => {
        profileAPI.updateProfile(profile)
            .then(response => {
                dispatch(setUserProfile(profile));
            })
    }
}

export const updateAvatarThunkCreator = (avatar) => {
    return (dispatch) => {
        profileAPI.updateAvatar(avatar)
            .then(response => {
                dispatch(setUserAvatar(response.data.data.photos));
            })
    }
}

export default profileReducer;