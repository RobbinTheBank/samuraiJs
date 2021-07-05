import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, updateStatus, setPhotos } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    processingUsers(){
        let userId = this.props.match.params.userId
        if(!userId){
            userId = this.props.autorizedUserId
            if(!userId){
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidMount(){
        this.processingUsers()
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.match.params.userId !== prevProps.match.params.userId ){
            this.processingUsers()
        }
    }
    render(){
    return (
        <div >
            <Profile {...this.props} profile={this.props.profile} 
                      status={this.props.status} 
                      updateStatus={this.props.updateStatus} 
                      isAuth={this.props.isAuth} 
                      setPhotos={this.props.setPhotos}
                      isOwner={!this.props.match.params.userId} 
                      />
        </div>
    )}
}
let mapStateToProps = (state)=>({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.authPage.isAuth,
    autorizedUserId: state.authPage.userId
})

export default compose(
    withRouter,
    // withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, setPhotos})
)(ProfileContainer)