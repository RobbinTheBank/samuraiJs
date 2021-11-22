import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus, getUserProfile } from '../../redux/reucers/profile-reducer';
import { withRouter, RouteComponentProps } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { useEffect } from 'react';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { getAutorizedUserId } from '../../redux/selectors/profile-selectors';

const ProfileContainer: React.FC<PropsType> = (props) => {
    const autorizedUserId = useSelector(getAutorizedUserId)

    const dispatch = useDispatch()

    const getUserProfilePage = (userId: number) => {
        dispatch(getUserProfile(userId))
    }
    const getStatusPage = (userId: number) => {
        dispatch(getStatus(userId))
    }
    const processingUsers = () => {
        let userId: number | null = +props.match.params.userId
        if (!userId) {
            userId = autorizedUserId
            if (!userId) {
                // todo: Replace push to Redirect
                props.history.push('/login')
            }
        }
        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')")
        } else {
            getUserProfilePage(userId)
            getStatusPage(userId)
        }

    }
    useEffect(() => {
        processingUsers()
    }, [props.match.params.userId])
    return (
        <div >
            <ProfileInfo isOwner={!props.match.params.userId} />

            <MyPostsContainer />
        </div>
    )
}
export default compose<React.ComponentType>(
    withRouter,
    withAuthRedirect
)(ProfileContainer)

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType>


