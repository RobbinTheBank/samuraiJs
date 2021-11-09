import { reduxForm } from "redux-form"
import { maxLengthCreator, required } from "../../../utils/validators/validators"
import { createFormField, Textarea } from "../../common/FormsControls/FormsControls"

const maxLength = maxLengthCreator(50)
const AddMessageForm = (props)=>{
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                {createFormField('add message', 'newMessageBody', Textarea, [required, maxLength])}
            </div>
            <dvi>
                <button>send</button>
            </dvi>
        </form>
    )
}
export default reduxForm({form: 'dialog-add-message-form'})(AddMessageForm)