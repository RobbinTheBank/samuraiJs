import React from 'react';
import { UserType } from '../../redux/types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User'

const Users: React.FC<PropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChanged, ...props }) => {
    return (
        <div>
            <div><Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                onPageChanged={onPageChanged} />
            </div>
            <div>
                {   
                    props.users.map(u =>
                        <User user={u}
                            unfollow={props.unfollow}
                            follow={props.follow}
                            followingInProgress={props.followingInProgress}
                            isAuth={props.isAuth} key={u.id} /> 
                    )
                }
            </div>
        </div>
    )
}
export default Users

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
    isAuth: boolean
    users: Array<UserType> | null
}
