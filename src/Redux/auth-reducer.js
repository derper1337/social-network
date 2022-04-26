import {usersAPI, authAPI} from "../ api/api";

let initValue = {
    id: null,
    email: null,
    login: null,
    loggedIn: false,
};
const authReducer = (state = initValue, action) => {

    switch (action.type) {
        case "SET-AUTH": {
            let stateCopy = {
                ...state,
                ...action.loginData,
                loggedIn: action.loggedIn,
            }
            return stateCopy;
        }
        default:
            return state;
    }
}
export const setAuth = (loginData, loggedIn) => ({type: "SET-AUTH", loginData: loginData, loggedIn:loggedIn});
export const setError = (errorMessage) => ({type: "SET-ERROR-MESSAGE", errorMessage:errorMessage});

export const setAuthThunkCreator = () =>{
    return (dispatch) =>{
       return  usersAPI.getAuthMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let loginData = data.data;
                    dispatch(setAuth(loginData, true));
                }
            })
    }
}

export const loginThunkCreator = (email, password, rememberMe, setStatus) =>{
    return (dispatch) =>{
        authAPI.login(email, password, rememberMe)
            .then(response =>{
                dispatch(setError(""));
                if (response.data.resultCode === 0){
                    dispatch(setAuthThunkCreator());
                }
                else{
                    setStatus(response.data.messages)
                }
            })
    }
}
export const logoutThunkCreator = () =>{
    return (dispatch) =>{
        authAPI.logout()
            .then(response =>{
                if (response.data.resultCode === 0){
                    let loginData = {email: null, id:null, login:null};
                    dispatch(setAuth(loginData, false));
                }
            })
    }
}

export default authReducer;