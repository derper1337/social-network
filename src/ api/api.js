import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "0547c747-b993-4214-9f68-ed89a037b0b8"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const usersAPI = {
    getUsersPage(currentPage = 1, pageSize = 4) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    getFriends(){
        return instance.get(`users?friend=${true}&count=100`)
            .then(response => {
                return response.data;
            });
    },

    sendFollowRequest(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    sendUnfollowRequest(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    getAuthMe() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    },
    getProfile(userID){
        return instance.get(`profile/${userID}`)
            .then(response => {
                return response.data;
            })
    },
    searchUser(userName){
        return instance.get(`users?term=${userName}`)
            .then(response => {
                console.log(response);
                return response.data;
            });
    },
}

export const profileAPI = {
    getProfile(userID){
        return instance.get(`profile/${userID}`)
            .then(response => {
                return response.data;
            })
    },

    getStatus(userID){
        return instance.get(`profile/status/` + userID);
    },

    updateStatus(status){
        return instance.put(`profile/status`, {status:status});
    },
    updateProfile(profile){
        return instance.put(`profile`, profile)
    },
    updateAvatar(avatar){
        let formData = new FormData();
        formData.append("image", avatar);
        return instance.put(`profile/photo`, formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
    }
}

export const authAPI ={
    login(email, password, rememberMe = false){
        return instance.post(`/auth/login`, {email, password, rememberMe});
    },
    logout(){
        return instance.delete(`/auth/login`);
    },
}

