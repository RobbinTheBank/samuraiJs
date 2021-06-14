import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const maxLength10 = maxLengthCreator(10)
const AddPostForm = (props) => {
    return <form onSubmit={props.handleSubmit} >
        <div>
            <Field name={'newPostText'} placeholder='Enter your message' component={Textarea}
                   validate={[required, maxLength10]} />
        </div>
        <div>
            <button>addPost</button>
        </div>
    </form>
}
const MyPostsReduxForm = reduxForm({ form: 'MyPost' })(AddPostForm)

const MyPosts = (props) => {
    let posts = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount} />)
    const onSubmit = (values) => {
        props.addPost(values.newPostText)
    }
    return (
        <div postsBlock={s.postsBlock} >
            <MyPostsReduxForm onSubmit={onSubmit} />
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    )
}




export default MyPosts