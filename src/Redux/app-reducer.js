import {setAuthThunkCreator} from "./auth-reducer";

let initValue = {
    initialized: false
};
const appReducer = (state = initValue, action) => {

    switch (action.type) {
        case "SET-INITIALIZED": {
            let stateCopy = {
                ...state,
                initialized: true,
            }
            return stateCopy;
        }
        default:
            return state;
    }
}
export const init = () => ({type: "SET-INITIALIZED"});

export const initThunkCreator = () =>{
    return (dispatch) =>{
        let promise = dispatch(setAuthThunkCreator());
        promise.then(()=>{
            dispatch(init());
        });
    }
}

export default appReducer;