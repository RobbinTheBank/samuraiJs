import React from 'react';
import s from './Users.module.css'
import userIcon from '../../assets/user.jpg'
import { NavLink } from "react-router-dom";
const User = ({ user, ...props }) => {
    return <div>
        <div >
        {console.log(user)}
            <NavLink to={'/profile/' + user.id}>
                <img className={s.userPhoto} src={user.photos.large != null ? user.photos.large : userIcon} />
            </NavLink>
        </div>
        <div>
            {user.followed
                ? <button disabled={!props.isAuth || props.followingInProgress
                    .some(id => id === user.id)} onClick={() => {
                        props.unfollow(user.id)
                    }} >Unfollow </button>
                : <button disabled={!props.isAuth || props.followingInProgress
                    .some(id => id === user.id)} onClick={() => {
                        props.follow(user.id)
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