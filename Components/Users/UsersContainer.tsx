import React from 'react'
import { connect } from "react-redux";
import { follow, getUsers, unfollow, setTotalUsersCount, pageChanged, setIsFetching } from "../../redux/users-reducer";
import Preloader from '../common/Preloader/Preloader';
import Users from "./Users";
import {getUsersPage, getCurrentPage, getPageSize,
        getTotalUsersCount, getIsFething, getFollowingInProgress,
        getIsAuth} from '../../redux/users-selectors'
import { UserType } from '../../redux/types/types';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {
    isFething: boolean
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isAuth: boolean
    users: Array<UserType>
    follow: ()=> void
    unfollow: ()=> void
    followingInProgress:  Array<number>
    getUsers: (currentPage: number, pageSize: number)=> void
    pageChanged: (currentPage: number)=> void
    onPageChanged: (currentPage: number)=> void 
}
class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    
    onPageChanged = (currentPage: number) => {
        this.props.getUsers(currentPage, this.props.pageSize)
        this.props.pageChanged(currentPage)
    }
    render() {
        return (
            <> {this.props.isFething ? <Preloader /> : null}
                <Users users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={this.props.followingInProgress}
                    isAuth={this.props.isAuth}
                />
            </>
        )
    }
}
let mapStateToProps = (state: AppStateType) => {
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
export default connect(mapStateToProps, {
    follow, unfollow, getUsers,
    setTotalUsersCount, pageChanged, setIsFetching
    //@ts-ignore
})(UsersContainer)

