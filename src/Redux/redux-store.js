import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import messageReducer from "./message-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import appReducer from "./app-reducer";

let reducers = combineReducers({
    ProfileData: profileReducer,
    messageData: messageReducer,
    usersData: usersReducer,
    auth: authReducer,
    app: appReducer
});


let store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;
