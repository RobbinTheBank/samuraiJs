import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props)=>{
    let posts = props.posts.map(p=><Post id={p.id} message={p.message} likesCount={p.likesCount} />)

    let onPostChange = (e)=>{
        let text = e.currentTarget.value
        props.updateNewPostText(text) 
    }
    let onAddPostClick = ()=>{
        props.addPost()
    }

    return (
        <div postsBlock={s.postsBlock} >
            <div>
                <div>
                    <textarea onChange={onPostChange} placeholder='Enter your message'  />
                </div>
                <div>
                    <button onClick={onAddPostClick} >addPost</button>
                </div>
            </div>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    )
}
export default MyPosts