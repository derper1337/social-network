export const getUsers = (state) => {
    return state.usersData.users;
}
export const getPageInfo = (state) => {
    return state.usersData.pageInfo;
}
export const getFollowingInProgress = (state) => {
    return state.usersData.pageInfo.isFollowing;
}