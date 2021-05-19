import React from 'react'
import { connect } from "react-redux";
import { usersAPI } from '../../api/api';
import { followUser, setUser, unfollowUser, setTotalUsersCount, pageChanged } from "../../redux/users-reducer";
import Users from "./Users";

class UsersContainer extends React.Component {
    componentDidMount(){
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
        .then(data=>{
            this.props.setUser(data.items)
            this.props.setTotalUsersCount(data.totalCount)
        }) 
    }
    onPageChanged = (pageNuber)=>{
        
        usersAPI.getUsers(pageNuber, this.props.pageSize)
        .then(data=>{
            this.props.setUser(data.items)
            this.props.pageChanged(pageNuber)
        })
        
        
        
        
    }
    render(){
        return (
            <div>
                <Users users={this.props.users}
                       followUser={this.props.followUser}  
                       unfollowUser={this.props.unfollowUser} 
                       currentPage={this.props.currentPage} 
                       pageSize={this.props.pageSize} 
                       totalUsersCount={this.props.totalUsersCount} 
                       onPageChanged={this.onPageChanged} 
                       />
            </div>
        )
    }
}
let  mapStateToProps = (state)=>{
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        
    }
}
export default connect(mapStateToProps, {followUser, unfollowUser, setUser, setTotalUsersCount, pageChanged})(UsersContainer)
    //        [{id: 1, followed: true, fullName: 'Dio', status: 'Wryyy' },
    //         {id: 2, followed: false, fullName: 'jojo', status: 'Yreyre' },
    //         {id: 3, followed: true, fullName: 'Abdul', status: 'Yes i am!' }]