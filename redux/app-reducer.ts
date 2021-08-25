import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer"
import { AppStateType } from "./redux-store";

export type initialStateType = typeof initialState

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

type ActionsTypes = initializedSuccessActionType 

const INITIAL_SUCCESS = 'INITIAL_SUCCESS';

let initialState = {
    initialized: false
}
const appReducer = (state = initialState, action: ActionsTypes): initialStateType =>{
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
type initializedSuccessActionType = {
    type: typeof INITIAL_SUCCESS
}

export const initializeApp = (): ThunkType => 
    async (dispatch)=>{
     dispatch(getAuthUserData())
     dispatch(initializedSuccess())
    // Promise.all([promise])
    // .then(()=>{
    //     dispatch(initializedSuccess())
    // })
    
}
export default appReducer