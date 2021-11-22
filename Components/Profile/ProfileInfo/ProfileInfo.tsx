import React, { useState, ChangeEvent } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileDataContactsReduxForm from './ProfileDataContactsForm';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/user.jpg';
import { ContactsType, ProfileType } from '../../../redux/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, getStatusProifle, } from '../../../redux/selectors/profile-selectors';
import { updateStatus, setPhotos, saveProfile } from '../../../redux/reucers/profile-reducer';

const ProfileInfo: React.FC<PropsProfileInfoType> =
    ({ isOwner }) => {
        const status = useSelector(getStatusProifle)
        const profile = useSelector(getProfile)
        const dispatch = useDispatch()
        const [editMode, setEditMode] = useState(false)
        if (!profile) {
            return <Preloader />
        }
        const setPhotosProfile = (file: File) => {
            dispatch(setPhotos(file))
        }
        const saveProfilePage = (formData: ProfileType) => {
            dispatch(saveProfile(formData))
        }
        const onMyPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.length) {
                setPhotosProfile(e.target.files[0])
            }
        }
        const onSubmit = (formData: ProfileType) => {
            saveProfilePage(formData)
            setEditMode(false)
        }
        const updateStatusPage = (status: string) => {
            dispatch(updateStatus(status))
        }
        return (
            <div>
                <div className={s.descriptionBlock} >
                    <div><img src={profile.photos.large || userPhoto} />
                        {isOwner && <input type='file' onChange={onMyPhotoSelected} />}
                    </div>
                    <div>
                        <ProfileStatus status={status} updateStatus={updateStatusPage} />
                    </div>
                    <div>{editMode
                        ? <ProfileDataContactsReduxForm
                            initialValues={profile}
                            onSubmit={onSubmit}
                            profile={profile}
                        />
                        : <ProfileDataContacts
                            profile={profile}
                            changeEditMode={() => { setEditMode(true) }}
                        />}
                    </div>
                </div>
            </div>
        )
    }
const ProfileDataContacts: React.FC<PropsProfileData> = ({ profile, changeEditMode }) => {
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
                <b>My professional skills:</b> {profile.lookingForAJobDescription}
            </div>}
        <div>
            <b>abiut me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
            })}

        </div>
    </div>
}
const Contact: React.FC<PropsContact> = ({ contactTitle, contactValue }) => {
    return <div className={s.contact}>
        <b>{contactTitle}:</b> {contactValue}
    </div>
}
export default ProfileInfo

type PropsProfileData = {
    profile: ProfileType
    changeEditMode: () => void
}
export type PropsProfileInfoType = {
    isOwner: boolean
}
type PropsContact = {
    contactTitle: string
    contactValue: string
}