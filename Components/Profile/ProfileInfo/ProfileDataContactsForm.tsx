import { InjectedFormProps, reduxForm } from "redux-form"
import { required } from "../../../utils/validators/validators"
import { createFormField, GetStringKeys, Input, Textarea } from "../../common/FormsControls/FormsControls"
import { ProfileType } from "../../../redux/types/types";
import  s  from "./ProfileInfo.module.css";
import  style  from '../../common/FormsControls/FormsControls.module.css';

const ProfileDataContactsForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (
    {profile, error, handleSubmit}
        ) => {
    return <form onSubmit={handleSubmit} >
        <div><button > Save </button></div>
        {error && <div className={style.summaryError} >{error}</div>}
        <div>
            <b>Full name:</b>
            {createFormField<ProfileTypeKeys>(profile.fullName, 'fullName', Input, [required])}
        </div>
        <div>
            <b>Looking for a job:</b>
            {createFormField<ProfileTypeKeys>('', 'lookingForAJob', Input, [], { type: 'checkbox' })}
        </div>
        <div>
            <b>looking For A Job Description:</b>
            {createFormField<ProfileTypeKeys>('My professional skills', 'lookingForAJobDescription', Textarea, [])}
        </div>
        <div>
            <b>about me:</b>
            {createFormField<ProfileTypeKeys>(profile.aboutMe, 'aboutMe', Textarea, [required])}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}:</b> 
                    {/*todo: Create some solution for embedded objects*/}
                    {createFormField(key, 'contacts.' + key, Input, [])}
                </div>
            })}
        </div>
    </form>
}
export default reduxForm<ProfileType, PropsType> ({ form: 'edit-profile' })(ProfileDataContactsForm)

type PropsType = {
    profile: ProfileType

}
type ProfileTypeKeys = GetStringKeys<ProfileType>


