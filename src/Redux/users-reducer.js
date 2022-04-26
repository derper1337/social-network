import {usersAPI} from "../ api/api";

let initValue = {
        users: [],
        pageInfo: {
            pageCount: 8,
            pageSize: 5,
            currentPage: 1,
            isLoading: true,
            isFollowing: [],
        },
    }

const usersReducer = (state = initValue, action) => {
    switch (action.type) {
        case "FOLLOW": {
            let stateCopy = {...state};
            stateCopy.users = [...state.users];
            stateCopy.users.map(u => {
                if (u.id == action.userId) {
                    u.followed = true;
                }
            })
            return stateCopy;
        }
        case "UNFOLLOW": {
            let stateCopy = {...state};
            stateCopy.users = [...state.users];
            stateCopy.users.map(u => {
                if (u.id == action.userId) {
                    u.followed = false
                }
            })
            return stateCopy;
        }
        case "SET-CURRENT-PAGE": {
            let stateCopy = {...state};
            stateCopy.pageInfo = {...state.pageInfo};
            stateCopy.pageInfo.currentPage = action.currentPage;
            return stateCopy;
        }
        case "SET-USERS": {
            let stateCopy = {...state};
            stateCopy.users = [...action.users];
            stateCopy.pageInfo.pageCount = action.pageCount;
            return stateCopy;
        }
        case "IS-LOADING": {
            let stateCopy = {...state};
            stateCopy.pageInfo = {...state.pageInfo};
            stateCopy.pageInfo.isLoading = action.isLoading;
            return stateCopy;
        }
        case "IS-FOLLOWING": {
            return {
                ...state,
                pageInfo: {
                    ...state.pageInfo,
                    isFollowing: action.isFollowing
                        ? [...state.pageInfo.isFollowing, action.userId]
                        : state.pageInfo.isFollowing.filter(id => id != action.userId)
                },
            }
        }
        default:
            return state;
    }
}

export const follow = (userId) => ({type: "FOLLOW", userId: userId});
export const unfollow = (userId) => ({type: "UNFOLLOW", userId: userId});
export const setUsers = (users, pageCount) => ({type: "SET-USERS", users: users, pageCount: pageCount});
export const setCurrentPage = (currentPage) => ({type: "SET-CURRENT-PAGE", currentPage: currentPage});
export const isLoading = (isLoading) => ({type: "IS-LOADING", isLoading: isLoading})
export const isFollowing = (isFollowing, userId) => ({type: "IS-FOLLOWING",isFollowing: isFollowing,userId: userId})

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(isLoading(true));
        dispatch(setCurrentPage(currentPage));
        usersAPI.getUsersPage(currentPage, pageSize)
            .then(data => {
                dispatch(setUsers(data.items, data.totalCount));
                dispatch(isLoading(false));
            });
    }
}
export const searchUsersThunkCreator = (userName) => {
    return (dispatch) => {
        dispatch(isLoading(true));
        usersAPI.searchUser(userName)
            .then(data => {
                dispatch(setUsers(data.items, data.totalCount));
                dispatch(isLoading(false));
            });
    }
}

export const unfollowThunkCreator = (userId) => {
    return (dispatch) => {
            dispatch(isFollowing(true, userId));
            usersAPI.sendUnfollowRequest(userId).then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollow(userId));
                    dispatch(isFollowing(false, userId));
                }
                else{
                    throw "too many requests";
                }
            });
    }
}
export const followThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(isFollowing(true, userId));
        usersAPI.sendFollowRequest(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(follow(userId));
                dispatch(isFollowing(false, userId));
            }
        });
    }
}
export default usersReducer;