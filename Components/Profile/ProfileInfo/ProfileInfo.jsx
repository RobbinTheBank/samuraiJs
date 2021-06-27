import React from 'react';
import { Redirect } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../assets/user.jpg';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    let contacts = props.profile.contacts
    let profile = props.profile
    const onMyPhotoSelected = (e)=>{
        if(e.target.files.length){
            props.setPhotos(e.target.files[0])
        }
    }
    return (
        <div>
            <div className={s.descriptionBlock} >
                <div><img src={profile.photos.large || userPhoto} />
                    <input type='file' onChange={onMyPhotoSelected} />
                </div>
                <div>{profile.fullName}</div>
                <div>About Me: 
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus} /> 
                </div>
                <div>
                    Contacts:
                    <ul>
                        <li>facebook: {contacts.facebook} </li>
                        <li>github: {contacts.github} </li>
                        <li>instagram: {contacts.instagram} </li>
                        <li>mainLink: {contacts.mainLink} </li>
                        <li>twitter: {contacts.twitter} </li>
                        <li>vk: {contacts.vk} </li>
                        <li>website: {contacts.website} </li>
                        <li>youtube: {contacts.youtube} </li>
                    </ul>
                </div>


                <div>Looking For A Job: {profile.lookingForAJob
                    ? profile.lookingForAJobDescription
                    : null}</div>
                <div></div>
            </div>
        </div>
    )
}
export default ProfileInfo