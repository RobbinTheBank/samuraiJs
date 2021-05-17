import React from 'react';
import s from './MyPosts.module.css';

const MyPosts = (props)=>{
   
    return (
        <div postsBlock={s.postsBlock} >
            <div>
                <div>
                    <textarea  value={'text'} />
                </div>
                <div>
                    <button  >addPost</button>
                </div>
            </div>
            <div className={s.posts}>
                Posts
            </div>
        </div>
    )
}
export default MyPosts