import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from '../Profile/MyPosts/MyPostsContainer'

const Profile = (props) => {
    return (
        <div >
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                         isAuth={props.isAuth}
                         setPhotos={props.setPhotos}
                         />
            <MyPostsContainer />
        </div>
    )
}
export default Profile