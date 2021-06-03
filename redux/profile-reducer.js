const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

let initialState = {
    posts: [
        { id: 1, message: 'message 1', likesCount: 15 },
        { id: 2, message: 'message 2', likesCount: 5 },
    ],
    newPostText: '',
    profile: null,
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let body = state.newPostText
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: body, likesCount: 0 }],
                newPostText: '',
            }
        case UPDATE_NEW_POST_TEXT: 
            return {
                ...state,
                newPostText: action.body
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default: return state
    }
}
export const addPost = () => ({ type: ADD_POST })
export const updateNewPostText = (body) => ({ type: UPDATE_NEW_POST_TEXT, body})
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile})
export default profileReducer