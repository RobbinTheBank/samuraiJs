import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';
import { profileAPI } from '../../api/api';
import { withRouter } from 'react-router';

class ProfileContainer extends React.Component {
    componentDidMount(){
        let userId = this.props.match.params.userId
        if(!userId){
            userId = 2
        }
        profileAPI.getProfile(userId)
        .then(response=>{
            this.props.setUserProfile(response.data)
        })
        
    }
    render(){
    return (
        <div >
            <Profile {...this.props} profile={this.props.profile} />
        </div>
    )}
}
let mapStateToProps = (state)=>({
    profile: state.profilePage.profile,
})
let withUrlProfileRouter =  withRouter(ProfileContainer)
export default connect(mapStateToProps, {setUserProfile})(withUrlProfileRouter)