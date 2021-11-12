import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, follow, unfollow } from '../../redux/users-reducer';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersPage } from '../../redux/users-selectors';
import Paginator from '../common/Paginator/Paginator';
import User from './User'

type PropsType = {}

const Users: React.FC<PropsType> = (props) => {
    const users = useSelector(getUsersPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(()=>{
        let actualPage = currentPage
        let actualPageSize = pageSize
        dispatch(getUsers(actualPage, actualPageSize))
    },[])
    const onPageChanged = (pageNumber: number)=>{
        dispatch(getUsers(pageNumber, pageSize))
    }
    const followUser = (userId: number)=>{
        dispatch(follow(userId))
    }
    const unfollowUser = (userId: number)=>{
        dispatch(unfollow(userId))
    }
    return (
        <div>
            <div><Paginator totalUsersCount={totalUsersCount}
                            pageSize={pageSize}
                            currentPage={currentPage} 
                            onPageChanged={onPageChanged} />
            </div>
            <div>
                {users.map(u => 
                    <div> <User user={u} unfollow={unfollowUser} follow={followUser} 
                                followingInProgress={followingInProgress} />
                    </div>
                    )}
            </div>
            <div></div>
        </div>
    )
}
export default Users