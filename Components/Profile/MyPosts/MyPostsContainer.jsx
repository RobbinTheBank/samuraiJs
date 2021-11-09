import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

class MyPostsContainer extends React.Component {
   
    render(){
       return (
        <div>
            <MyPosts posts = {this.props.posts} 
                     newPostText={this.props.newPostText}
                     addPost={this.props.addPost} />
        </div>
    )}
}
let  mapStateToProps = (state)=>{
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
export default connect(mapStateToProps, {addPost: actions.addPost})(MyPostsContainer)