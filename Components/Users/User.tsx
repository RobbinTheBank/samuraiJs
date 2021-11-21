import React from 'react';
import { NavLink } from "react-router-dom";
import { UserType } from '../../redux/types/types';
import userIcon from '../../assets/user.jpg'
import s from'./Users.module.css'

const User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
    return <div>
        <div>
            
        </div>
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
    </div>
}
export default User

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (user: number) => void
    follow: (user: number) => void
}