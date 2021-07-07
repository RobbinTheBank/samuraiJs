import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../assets/user.jpg';
import ProfileDataContactsReduxForm from './ProfileDataContactsForm';

const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader />
    }
    let contacts = props.profile.contacts
    let profile = props.profile
    const onMyPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.setPhotos(e.target.files[0])
        }
    }
    return (
        <div>
            <div className={s.descriptionBlock} >
                <div><img src={profile.photos.large || userPhoto} />
                    {props.isOwner && <input type='file' onChange={onMyPhotoSelected} />}
                </div>
                <div>
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
                </div>
                <div>{editMode 
                    ?  <ProfileDataContactsReduxForm changeEditMode={()=>{setEditMode(false)}} profile={profile} contacts={contacts} />
                    :  <ProfileDataContacts profile={profile} contacts={contacts} changeEditMode={()=>{setEditMode(true)}} />}
                </div>
            </div>
        </div>
    )
}
const ProfileDataContacts = ({profile, contacts, changeEditMode}) => {
    return <div>
        <div><button onClick={changeEditMode} > Edit </button></div>
        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>}
        <div>
            <b>abiut me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={contacts[key]} />
            })}

        </div>
        <div>Looking For A Job: {profile.lookingForAJob
            ? profile.lookingForAJobDescription
            : null}</div>
    </div>
}

const Contact = ({ contactTitle, contactValue }) => {
    return <div className={s.contact}>
        <b>{contactTitle}:</b> {contactValue}
    </div>
}
export default ProfileInfo