import React from 'react';
import { NavLink } from "react-router-dom";
import { UserType } from '../../redux/types/types';
import Preloader from '../common/Preloader/Preloader';

const User: React.FC<PropsType> = ({ user, isAuth, followingInProgress, unfollow, follow }) => {

    let s = require('./Users.module.css')
    let userIcon = require('../../assets/user.jpg')
    return <>
        {!user ? <Preloader />
            : null}
        <div >
            <NavLink to={'/profile/' + user.id}>
                <img className={s.userPhoto} src={user.photos.large != null ? user.photos.large : userIcon} />
            </NavLink>
        </div>
        <div>
            {user.followed
                ? <button disabled={followingInProgress
                    .some(id => id === user.id)} onClick={() => {
                        unfollow(user.id)
                    }} >Unfollow </button>
                : <button disabled={followingInProgress
                    .some(id => id === user.id)} onClick={() => {
                        follow(user.id)
                    }
                    } >Follow</button>}
        </div>
        <div>
            <div>{user.name}</div>
            <div>{user.status}</div>
        </div>

    </>


}
export default User
type PropsType = {
    user: UserType
    isAuth: boolean
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}