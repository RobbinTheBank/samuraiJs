import React from 'react'
import { connect } from "react-redux";
import { usersAPI } from '../../api/api';
import { follow, getUsers, unfollow, setTotalUsersCount, pageChanged, setIsFetching } from "../../redux/users-reducer";
import Preloader from '../common/Preloader';
import Users from "./Users";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNuber) => {
        this.props.getUsers(pageNuber, this.props.pageSize)
        this.props.pageChanged(pageNuber)
    }
    render() {
        return (
            <> {this.props.isFething ? <Preloader /> : null}
                <Users users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={this.props.followingInProgress}
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
        followingInProgress: state.usersPage.followingInProgress,

    }
}
export default connect(mapStateToProps, {
    follow, unfollow, getUsers,
    setTotalUsersCount, pageChanged, setIsFetching
})(UsersContainer)
