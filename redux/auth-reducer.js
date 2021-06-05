import { authAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}
const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default: return state
    }
}
const setAuthUserData = (userId, email, login)=>({type: SET_USER_DATA, data: {userId, email, login}})
export const getAuthUserData = ()=>(dispatch) =>{
    authAPI.authMe()
      .then(response=>{
        if(response.data.resultCode === 0){
          let {userId, email, login} = response.data.data;
          dispatch(setAuthUserData(userId, email, login))
        }
      })
}

export default authReducer