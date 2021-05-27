import React from 'react'
import { connect } from "react-redux";
import { usersAPI } from '../../api/api';
import { followUser, setUser, unfollowUser, setTotalUsersCount, pageChanged, setIsFetching } from "../../redux/users-reducer";
import Preloader from '../common/Preloader';
import Users from "./Users";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.setUser(data.items)
                this.props.setTotalUsersCount(data.totalCount)
                this.props.setIsFetching(false)
            })
    }
    onPageChanged = (pageNuber) => {
        this.props.setIsFetching(true)
        usersAPI.getUsers(pageNuber, this.props.pageSize)
            .then(data => {
                this.props.setUser(data.items)
                this.props.pageChanged(pageNuber)
                this.props.setIsFetching(false)
            })
    }
    render() {
        return (
            <> {this.props.isFething ? <Preloader /> : null}
                <Users users={this.props.users}
                    followUser={this.props.followUser}
                    unfollowUser={this.props.unfollowUser}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    onPageChanged={this.onPageChanged}
                />
            </>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        isFething: state.usersPage.isFething,

    }
}
export default connect(mapStateToProps, {
    followUser, unfollowUser, setUser,
    setTotalUsersCount, pageChanged, setIsFetching
})(UsersContainer)

