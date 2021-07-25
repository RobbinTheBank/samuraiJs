import React from 'react'
import { connect } from "react-redux";
import { follow, getUsers, unfollow, setTotalUsersCount, pageChanged, setIsFetching } from "../../redux/users-reducer";
import Preloader from '../common/Preloader/Preloader';
import Users from "./Users";
import {
    getUsersPage, getCurrentPage, getPageSize,
    getTotalUsersCount, getIsFething, getFollowingInProgress,
    getIsAuth
} from '../../redux/users-selectors'
import { UserType } from '../../redux/types/types';
import { AppStateType } from '../../redux/redux-store';
import { useEffect } from 'react';

type PropsType = {
    isFething: boolean
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isAuth: boolean
    users: Array<UserType>
    follow: () => void
    unfollow: () => void
    followingInProgress: Array<number>
    getUsers: (currentPage: number, pageSize: number) => void
    pageChanged: (currentPage: number) => void
    onPageChanged: (currentPage: number) => void
}

const UsersContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, [])
    const onPageChanged = (currentPage: number) => {
        props.getUsers(currentPage, props.pageSize)
        props.pageChanged(currentPage)
    }
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

