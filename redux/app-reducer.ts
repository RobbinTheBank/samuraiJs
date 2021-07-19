import { getAuthUserData } from "./auth-reducer"

export type initialStateType = typeof initialState
type initializedSuccessActionType = {
    type: typeof INITIAL_SUCCESS
}

const INITIAL_SUCCESS = 'INITIAL_SUCCESS';

let initialState = {
    initialized: false
}
const appReducer = (state = initialState, action: any): initialStateType =>{
    switch(action.type){
        case INITIAL_SUCCESS: 
        return {
            ...state,
            initialized: true
        }
        default: return state
    }
}
const initializedSuccess = (): initializedSuccessActionType =>({type: INITIAL_SUCCESS})
export const initializeApp = ()=>(dispatch: any)=>{
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
    .then(()=>{
        dispatch(initializedSuccess())
    })
}
export default appReducer