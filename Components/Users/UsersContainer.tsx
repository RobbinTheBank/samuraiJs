import React from 'react'
import { useSelector } from "react-redux";
import Preloader from '../common/Preloader/Preloader';
import Users from "./Users";
import {getIsFething,} from '../../redux/users-selectors'

<<<<<<< HEAD
export const UsersContainer: React.FC<UsersContainerProps> = (props)=>{
    const isFetching = useSelector(getIsFething)
    return <>
        <h2>users</h2>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}
type UsersContainerProps = {
    
}   
=======
const UsersContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, [])
    const onPageChanged = (currentPage: number) => {
        props.getUsers(currentPage, props.pageSize)
    }
    console.log(props.users)
    return <> {props.isFething ? <Preloader /> : null}
        <Users users={props.users}
            follow={props.follow}
            unfollow={props.unfollow}
            currentPage={props.currentPage}
            pageSize={props.pageSize}
            totalUsersCount={props.totalUsersCount}
            onPageChanged={onPageChanged}
            followingInProgress={props.followingInProgress}
            isAuth={props.isAuth}
        />
    </>
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersPage(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        isFething: getIsFething(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state)
    }
}
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps, {
    follow, unfollow, getUsers
})(UsersContainer)

type PropsType = MapStatePropsType & MapDispatchPropsType 
>>>>>>> master

