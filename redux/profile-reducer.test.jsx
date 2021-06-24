import profileReducer, { addPost, deletePost } from "./profile-reducer"

let state = {
    posts: [
        { id: 1, message: 'message 1', likesCount: 15 },
        { id: 2, message: 'message 2', likesCount: 5 },
    ],
}
it('Length of posts array should be incremented', ()=>{
    //1. action
    let action = addPost('new post added')
    //2.  Test data
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts.length).toBe(3)
})
it('Message of new post should be correct', ()=>{
    let action = addPost('new post added')
    let newState = profileReducer(state, action)
    expect(newState.posts[2].message).toBe('new post added')
})
it('After deliting posts length should be decrement', ()=>{
    let action = deletePost(1)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(1)
})
