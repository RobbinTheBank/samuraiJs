import React from 'react';
import s from './Post.module.css';

const Post = (props)=>{
    return (
        <div className={s.item}>
            <div>
                <img src='https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg'/>
            </div>
            <div>
                {props.message}
            </div>
            <div>
                like: {props.likesCount}
            </div>
        </div>
    )
}
export default Post