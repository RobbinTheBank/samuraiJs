import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { required } from '../../utils/validators/validators'
import { createFormField, Input } from '../common/FormsControls/FormsControls'
import s from '../common/FormsControls/FormsControls.module.css'

const LoginForm = (props)=>{
    return <form onSubmit={props.handleSubmit} >
            {createFormField('Email', 'email', Input, [required])}
            {createFormField('Password', 'password', Input, [required], { type:'password'})}
            {createFormField(null, 'rememberMe', Input, [], { type:'checkbox'}, 'Remember me' )}
        <div className={s.summaryError}>
            {props.error}
        </div>
        <div>
            {props.urlCaptcha && <img src={props.urlCaptcha} />}
            {props.urlCaptcha && createFormField('Text of image', 'captcha', Input, [required], {})}
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props)=>{
    const onSubmit = (formData)=>{
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if(props.isAuth){
        return <Redirect to={'/profile'} /> 
    }
    return <div>
        <LoginReduxForm onSubmit={onSubmit} urlCaptcha={props.urlCaptcha} />
    </div>
}
let mapStateToProps = (state)=>({
    isAuth: state.authPage.isAuth,
    urlCaptcha: state.authPage.urlCaptcha
})
export default connect(mapStateToProps, {login})(Login)