import React from 'react';
import ProfileInfo, { PropsProfileInfoType } from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer } from './MyPosts/MyPostsContainer'

const Profile: React.FC<PropsProfileInfoType> = (props) => {
    return (
        <div >
            <ProfileInfo profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                setPhotos={props.setPhotos}
                isOwner={props.isOwner}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </div>
    )
}
export default Profile
