import React from 'react';
import s from './Users.module.css'
import userIcon from '../../assets/userIcon.png'
import { NavLink } from "react-router-dom";
const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        if (i <= 15) {
            pages.push(i)
        }

    }
    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p && s.selectedPage}
                        onClick={(e) => {
                            props.onPageChanged(p)
                        }} > {p} </span>
                })}
            </div>

            <div>
                {
                    props.users.map(u => <div>
                        <div >
                            <NavLink to={'/profile/' + u.id}>
                                <img className={s.userPhoto} src={u.photos.large != null ? u.photos.large : userIcon} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={!props.isAuth || props.followingInProgress
                                .some(id=>id === u.id)} onClick={() => {
                                    props.unfollow(u.id)
                                }} >Unfollow</button>
                                : <button disabled={!props.isAuth || props.followingInProgress
                                .some(id=>id === u.id)} onClick={() => {
                                    props.follow(u.id)
                                }
                                } >Follow</button>}
                        </div>

                        <div>

                            <div>{u.name}</div>
                            <div>{u.status}</div>

                        </div>
                    </div>
                    )
                }
            </div>
            <div></div>
        </div>
    )
}
export default Users