import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, updateStatus, setPhotos, saveProfile } from '../../redux/profile-reducer';
//@ts-ignore
import { withRouter } from 'react-router';
//import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { useEffect } from 'react';
import { AppStateType } from '../../redux/redux-store';
import { RouteComponentProps } from 'react-router-dom';

type PathParamsType = {
    userId: string | null
}
type PropsType = mapStatePropsType & mapDispatchPropsType & RouteComponentProps<PathParamsType>

type mapStatePropsType = ReturnType<typeof mapStateToProps>
type mapDispatchPropsType = {
    getUserProfile: (userId: number) => void; 
    getStatus: (userId: number) => void;
    updateStatus: ()=> void;
    setPhotos: ()=> void; 
    saveProfile: ()=> void;
}
const ProfileContainer: React.FC<PropsType>  = (props)=>{
    const processingUsers =()=>{
        let userId: number | null =+ props.match.params.userId
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
let mapStateToProps = (state: AppStateType) => ({
    //@ts-ignore
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.authPage.isAuth,
    autorizedUserId: state.authPage.userId
})
export default compose<React.ComponentType>(
    withRouter,
    // withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, setPhotos, saveProfile})
    //@ts-ignore
)(ProfileContainer)
