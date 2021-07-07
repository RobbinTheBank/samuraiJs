import { reduxForm } from "redux-form"
import { required } from "../../../utils/validators/validators"
import { createFormField, Input, Textarea } from "../../common/FormsControls/FormsControls"
import s from './ProfileInfo.module.css';

const ProfileDataContactsForm = (props) => {
    const profile = props.profile
    const contacts = props.contacts
    return <div>
        <div><button onClick={props.changeEditMode} > Edit </button></div>

        <div>
            <b>Full name:</b>
            {createFormField(profile.fullName, 'fullName', Input, [required])}
        </div>
        <div>
            <b>Looking for a job:</b>
            {createFormField('', 'lookingForAjob', Input, [], { type: 'checkbox' })}
        </div>
        <div>
            <b>My professional skills:</b>
            {createFormField(profile.lookingForAJob = 'My professional skills', 'myProfessionalSkills', Textarea, [required],)}
        </div>
        <div>
            <b>about me:</b>
            {createFormField(profile.aboutMe = 'about me', 'aboutMe', Textarea, [required])}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(contacts).map(key => {
                return <div className={s.contact}>
                    <b>{key}:</b> 
                    {createFormField([key], 'Contacts.' + key, Input, [])}
                </div>
            })}
        </div>
    </div>
}
const ProfileDataContactsReduxForm = reduxForm({ form: 'edite-profile' })(ProfileDataContactsForm)
export default ProfileDataContactsReduxForm