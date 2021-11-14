import { InjectedFormProps, reduxForm } from "redux-form"
import { maxLengthCreator, required } from "../../../../utils/validators/validators"
import { createFormField, GetStringKeys, Textarea } from "../../../common/FormsControls/FormsControls"

const maxLength10 = maxLengthCreator(10)

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValues, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit} >
        <div>
            {createFormField<AddPostFormValuesKeys>('Enter your message', 'newPostText', Textarea, [required, maxLength10])}
        </div>
        <div>
            <button>addPost</button>
        </div>
    </form>
}
export default reduxForm<AddPostFormValues, PropsType>({ form: 'MyPost' })(AddPostForm)

export type AddPostFormValues = {
    newPostText: string
}
type PropsType = {

}
type AddPostFormValuesKeys = GetStringKeys<AddPostFormValues>