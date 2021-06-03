import React from 'react';
import { connect } from 'react-redux';
import { addPost, updateNewPostText } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

class MyPostsContainer extends React.Component {
   
    render(){
       return (
        <div>
            <MyPosts posts = {this.props.posts} 
                     newPostText={this.props.newPostText}
                     addPost={this.props.addPost}
                     updateNewPostText={this.props.updateNewPostText} />
        </div>
    )}
}
let  mapStateToProps = (state)=>{
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

export default connect(mapStateToProps, { addPost, updateNewPostText})(MyPostsContainer)