import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer"
import { AppStateType, BaseThunkType, GetInferActions } from "./redux-store";

let initialState = {
    initialized: false
}
const appReducer = (state = initialState, action: ActionsTypes): initialStateType =>{
    switch(action.type){
        case 'SA/INITIAL_SUCCESS': 
        return {
            ...state,
            initialized: true
        }
        default: return state
    }
}

const actions = {
    initializedSuccess: () => ({type: 'SA/INITIAL_SUCCESS'}) as const
} 

export const initializeApp = (): ThunkType => 
    async (dispatch)=>{
     dispatch(getAuthUserData())
     dispatch(actions.initializedSuccess())
    // Promise.all([promise])
    // .then(()=>{
    //     dispatch(initializedSuccess())
    // })
    
}
export default appReducer

type ActionsTypes = GetInferActions<typeof actions>
type initialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes>