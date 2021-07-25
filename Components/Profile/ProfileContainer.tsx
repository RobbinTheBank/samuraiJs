import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, updateStatus, setPhotos, saveProfile } from '../../redux/profile-reducer';
//@ts-ignore
import { withRouter } from 'react-router';
//import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { useEffect } from 'react';
import { UserType } from '../../redux/types/types';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {  
    getUserProfile: (userId: number) => void; 
    getStatus: (userId: number) => void;
    updateStatus: ()=> void;
    setPhotos: ()=> void; 
    saveProfile: ()=> void;
    match: { 
        params: { 
            userId: number; 
        }; 
    }; 
    autorizedUserId: number; 
    history: string[];   
    profile: UserType; 
    status: string; 
    isAuth: boolean; 
     
}
const ProfileContainer: React.FC<PropsType>  = (props)=>{
    const processingUsers =()=>{
        let userId = props.match.params.userId
        if(!userId){
            userId = props.autorizedUserId
            if(!userId){
                props.history.push('/login')
            }
        }
        props.getUserProfile(userId)
        props.getStatus(userId)
    }
    useEffect(()=>{
        processingUsers()
    }, [props.match.params.userId])
    return (
        <div >
            <Profile {...props} profile={props.profile} 
                      status={props.status} 
                      updateStatus={props.updateStatus} 
                      isAuth={props.isAuth} 
                      setPhotos={props.setPhotos}
                      isOwner={!props.match.params.userId} 
                      saveProfile={props.saveProfile} 
                      />
        </div>
    )
}
let mapStateToProps = (state: AppStateType)=>({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.authPage.isAuth,
    autorizedUserId: state.authPage.userId
})
export default compose(
    withRouter,
    // withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, setPhotos, saveProfile})
    //@ts-ignore
)(ProfileContainer)
