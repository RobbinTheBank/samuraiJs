import AddMessageForm from "./AddMessageForm/AddMessageForm"

const Dialogs = (props) => {
    const addNewMessage = (value)=>{
        props.sendMessage(value.newMessageBody)
    }
    return <div>
        <div>
            {props.dialogs.map(d => <div>
                {d.name}
            </div>)}
        </div>
        <div>
            {props.messages.map(m=><div>
                {m.message}
            </div>)}
        </div>
        <div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    </div>
}
export default Dialogs