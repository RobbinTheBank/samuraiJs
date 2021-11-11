import React from 'react'
import { FormProps, InjectedFormProps, reduxForm } from "redux-form"
import { maxLengthCreator, required } from "../../../utils/validators/validators"
import { createFormField, Textarea } from "../../common/FormsControls/FormsControls"
import { NewMessageFormBody } from '../Dialogs'

const maxLength = maxLengthCreator(50)
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormBody, PropsType > & PropsType > = (props)=>{
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                {createFormField<NewMessageFormKeys>('add message', 'newMessageBody', Textarea, [required, maxLength])}
            </div>
            <div>
                <button>send</button>
            </div>
        </form>
    )
}
export default reduxForm<NewMessageFormBody>({form: 'dialog-add-message-form'})(AddMessageForm)
type PropsType = {}
type NewMessageFormKeys = Extract<keyof NewMessageFormBody, string>