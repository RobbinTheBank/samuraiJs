import React from 'react'
import { connect, useSelector } from "react-redux";
import { follow, getUsers, unfollow } from "../../redux/users-reducer";
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
import { compose } from 'redux';
import { withRouter } from 'react-router';
{/*
const UsersContaine: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, [])
    const onPageChanged = (currentPage: number) => {
        props.getUsers(currentPage, props.pageSize)
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
export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(
    //@ts-ignore
    mapStateToProps, {
    follow, unfollow, getUsers
})(UsersContainer)

type PropsType = MapStatePropsType & MapDispatchPropsType 

type MapStatePropsType = {
    isFething: boolean
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isAuth: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

*/}
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

