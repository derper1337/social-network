import profileReducer, {addPost} from "./profileReducer";


it('new post should be added ', ()=>{
    let action = addPost("new test post");
    let state = {
        posts: [
            {id: "1", likesCount: 3, text: "Hi! Unfortunately, current version of API doesn't support post creation on the server side, but you can add them localy, in your profile page!"},
        ],
        newPostText: {id: "5", likesCount: 0, text: "asdasda"}
    }
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(5);
});
