import { reduxForm } from "redux-form"
import { required } from "../../../utils/validators/validators"
import { createFormField, Input, Textarea } from "../../common/FormsControls/FormsControls"
import s from './ProfileInfo.module.css';
import style from '../../common/FormsControls/FormsControls.module.css';

const ProfileDataContactsForm = (props) => {
    const profile = props.profile
    const contacts = props.contacts
    return <form onSubmit={props.handleSubmit} >
        <div><button > Save </button></div>
        {props.error && <div className={style.summaryError} >{props.error}</div>}
        <div>
            <b>Full name:</b>
            {createFormField(profile.fullName, 'fullName', Input, [required])}
        </div>
        <div>
            <b>Looking for a job:</b>
            {createFormField('', 'lookingForAjob', Input, [], { type: 'checkbox' })}
        </div>
        <div>
            <b>looking For A Job Description:</b>
            {createFormField('My professional skills', 'lookingForAJobDescription', Textarea, [])}
        </div>
        <div>
            <b>about me:</b>
            {createFormField(profile.aboutMe = 'about me', 'aboutMe', Textarea, [required])}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}:</b> 
                    {createFormField([key], 'contacts.' + key, Input, [])}
                </div>
            })}
        </div>
    </form>
}
const ProfileDataContactsReduxForm = reduxForm({ form: 'edite-profile' })(ProfileDataContactsForm)
export default ProfileDataContactsReduxForm