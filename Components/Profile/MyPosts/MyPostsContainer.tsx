import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts, { MapDispatchProp, MapStateProps } from './MyPosts';

let  mapStateToProps = (state: AppStateType)=>{
    return {
        posts: state.profilePage.posts,
    }
}
export const MyPostsContainer = connect<MapStateProps, MapDispatchProp, {}, AppStateType>
    (mapStateToProps, {addPost: actions.addPost})(MyPosts)

