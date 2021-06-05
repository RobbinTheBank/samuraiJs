import React from 'react';
import Preloader from '../../common/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    let contacts = props.profile.contacts
    let profile = props.profile
    return (
        <div>
            <div className={s.backFon}>
                <img src='https://c.wallhere.com/photos/ff/a4/uk_seascape_clouds_cornwall_gray_fujifilm_stives_fujix100s-932576.jpg!d' />
            </div>
            <div className={s.descriptionBlock} >
                <div><img src={profile.photos.large} /></div>
                <div>{profile.fullName}</div>
                <div>About Me: <ProfileStatus status={props.profile.aboutMe} /> </div>
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
                : null }</div>
                <div></div>
            </div>
        </div>
    )
}
export default ProfileInfo