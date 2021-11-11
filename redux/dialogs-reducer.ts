import { GetInferActions } from "./redux-store"

const initialState = {
    dialogs: [
        {id: 1, name: 'star'},
        {id: 1, name: 'star'},
        {id: 1, name: 'star'},
        {id: 1, name: 'star'},
        {id: 1, name: 'star'},
        {id: 1, name: 'star'},
    ],
    messages: [
        {id: 1, message: 'shine'}
    ]
}
export const actions = {
    sendMessage: (message: string)=>({type: 'SA/DIALOG/SEND_MESSAGE', message} as const)
}
const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType=>{
    switch(action.type){
        case 'SA/DIALOG/SEND_MESSAGE':
            let newMessageBody = {id: 2, message: action.message}
            return{
                ...state,
                messages: [...state.messages, newMessageBody]
            }
        default: return state
    }
}
export default dialogsReducer
export type InitialStateType = typeof initialState
type ActionsType = GetInferActions<typeof actions>

export type DialogsType = typeof initialState.dialogs
export type MessagesType = typeof initialState.messages