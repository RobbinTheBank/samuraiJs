import { Pagination } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, follow, unfollow, FilterForm } from '../../redux/reucers/users-reducer';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersPage, getFilterForm } from '../../redux/selectors/users-selectors';
import User from './User'
import UsersSearchForm from './UsersSearchForm/UsersSearchForm';


type PropsType = {}

const Users: React.FC<PropsType> = (props) => {
    const users = useSelector(getUsersPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getFilterForm)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }
    const onTermChanged = (filter: FilterForm) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    //@ts-ignore

    return (
        <div>
            {/* <div><Paginator totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged} />
            </div> */}
            <div>
                <Pagination
                    total={totalUsersCount}
                    pageSize= {pageSize} // tobe: need changed page size
                    showSizeChanger
                    showQuickJumper
                    onChange={onPageChanged}
                    current={currentPage}
                    showTotal={total => `Total ${total} items`}
                />
            </div>

            <div>
                <UsersSearchForm onTermChanged={onTermChanged} />
            </div>
            <div>
                {users.map(u =>
                    <div> <User user={u} unfollow={unfollowUser} follow={followUser}
                        followingInProgress={followingInProgress} />
                    </div>
                )}
            </div>
        </div>
    )
}
export default Users