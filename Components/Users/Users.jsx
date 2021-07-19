import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User'
const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    return (
        <div>
            <div><Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} 
                            onPageChanged={onPageChanged} />
            </div>
            <div>
                {
                    props.users.map(u => 
                    
                    <div> <User user={u} unfollow={props.unfollow} follow={props.follow} 
                                followingInProgress={props.followingInProgress}
                                isAuth={props.isAuth} key={u.id} />
                    </div>
                    )
                }
            </div>
            <div></div>
        </div>
    )
}
export default Users