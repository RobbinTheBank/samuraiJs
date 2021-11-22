import { DialogsType, InitialStateType, MessagesType } from "../../redux/reucers/dialogs-reducer"
import AddMessageForm from "./AddMessageForm/AddMessageForm"

const Dialogs: React.FC<PropsType> = (props) => {
    const addNewMessage = (value: NewMessageFormBody)=>{
        props.sendMessage(value.newMessageBody)
    }
    return <div>
        <div>
            {
            props.dialogs.map(d => <div>
                {d.name}
            </div>)}
        </div>
        <div>
            {
            props.messages.map(m=><div>
                {m.message}
            </div>)}
        </div>
        <div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    </div>
}
type PropsType = {
    dialogs: DialogsType
    messages: MessagesType
    sendMessage: (newMessageBody: string)=> void
}
export type NewMessageFormBody = {
    newMessageBody : string
}
export default Dialogs