import React from 'react';
import { PostType } from '../../../redux/types/types';
import AddPostForm, { AddPostFormValues } from './AddPostForm/AddPostForm';
import Post from './Post/Post';
import s from './MyPosts.module.css';




const MyPosts: React.FC<MapStateProps & MapDispatchProp> = (props) => {
    let posts = props.posts.map(p => 
        <Post key={p.id} message={p.message} likesCount={p.likesCount} />
        )
    const onSubmit = (values: AddPostFormValues) => {
        props.addPost(values.newPostText)
    }
    return (
        <div className={s.postsBlock} >
            <AddPostForm onSubmit={onSubmit} />
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    )
}
const MyPostsMemo = React.memo(MyPosts)
export default MyPostsMemo


export type MapStateProps = {
    posts: Array<PostType>
}
export type MapDispatchProp = {
    addPost: (newPostText: string)=> void
}