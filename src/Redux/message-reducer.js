import {usersAPI} from "../ api/api";
import {isLoading, setCurrentPage, setUsers} from "./users-reducer";

let initValue = {
    // dialogs: [
    //     {   id: "stepa",
    //         messages: [
    //             {name: "user1", message: "sup brah"},
    //             {name: "user1", message: "sup brahh"},
    //             {name: "user1", message: "sup brahhhh"},
    //             {name: "user1", message: "sup brahhhhhhhhh"}]
    //     },
    //     {   id: "sssstepa",
    //         messages: [
    //             {name: "user1", message: "sussssp brah"},
    //             {name: "user1", message: "sup brahh"},
    //             {name: "user1", message: "sup brahhhh"},
    //             {name: "user1", message: "sup brahhhhhhhhh"}]
    //     },
    //     {   id: "seeeeetepa",
    //         messages: [
    //             {name: "user1", message: "sup brah"},
    //             {name: "user1", message: "sup brahh"},
    //             {name: "user1", message: "sussssssssssp brahhhh"},
    //             {name: "user1", message: "sup brahhhhhhhhh"}]
    //     },
    // ],
    newMessageText: {name: "user1", message: ""},
    friends: [],
    dialogs:[],
    activeDialog:"",
};
const messageReducer = (state = initValue, action) => {

    switch (action.type) {
        case "ADD-MESSAGE": {
            let stateCopy = {...state};
            stateCopy.dialogs = [...state.dialogs];
            stateCopy.newMessageText = {...state.newMessageText};
            let currentDialogNumber = stateCopy.dialogs.findIndex((obj)=>{return obj.name===stateCopy.activeDialog});
            stateCopy.dialogs[currentDialogNumber].messages.push(Object.assign({}, stateCopy.newMessageText));
            stateCopy.newMessageText.message = "";
            return stateCopy;
        }
        case "CHANGE-MESSAGE": {
            let stateCopy = {...state};
            stateCopy.dialogs = [...state.dialogs];
            stateCopy.newMessageText = {...state.newMessageText};
            stateCopy.newMessageText.message = action.text;
            return stateCopy;
        }
        case "SET-FRIENDS": {
            let stateCopy = {...state};
            stateCopy.friends = action.friends;
            return stateCopy;
        }
        case "SET-DIALOGS": {
            let stateCopy = {...state};
            stateCopy.dialogs = stateCopy.friends.map(f => ({
                name:f.name,
                id: f.id,
                messages:[]
            }));
            return stateCopy;
        }
        case "SET-ACTIVE-DIALOG":{
                let stateCopy = {...state};
                stateCopy.activeDialog = action.dialogName;
                return stateCopy;
        }
        default:
            return state;
    }
}
const setFriends = (friends) => ({type: "SET-FRIENDS", friends: friends});

// export const getFriendsThunkCreator = () => {
//     return (dispatch) => {
//         usersAPI.getFriends().then(data => {
//             dispatch({type: "SET-FRIENDS", friends: data.items});
//             dispatch({type: "SET-DIALOGS"});
//         });
//     }
// }

export default messageReducer;