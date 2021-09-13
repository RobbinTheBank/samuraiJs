import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import { required } from '../../utils/validators/validators'
import { createFormField, Input } from '../common/FormsControls/FormsControls'
//@ts-ignore
import s from '../common/FormsControls/FormsControls.module.css'

type LoginFormValuesType = {
    email: string 
    password: string 
    rememberMe: boolean
    captcha: string
}
type LoginFormOwnPropsType = {
    urlCaptcha: string | null
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>
export type GetStringKeys<T> = Extract<keyof T, string>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> 
    = ({handleSubmit, error, urlCaptcha})=>{
    return <form onSubmit={handleSubmit} >
            {createFormField<LoginFormValuesTypeKeys>('Email', 'email', Input, [required])}
            {createFormField<LoginFormValuesTypeKeys>('Password', 'password', Input, [required], { type:'password'})}
            {createFormField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', Input, [], { type:'checkbox'}, 'Remember me' )}
        <div className={s.summaryError}>
            {error}
        </div>
        <div>
            {urlCaptcha && <img src={urlCaptcha} />}
            {urlCaptcha && createFormField<LoginFormValuesTypeKeys>('Text of image', 'captcha', Input, [required], {})}
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm)

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType > = (props)=>{
    const onSubmit = (formData: LoginFormValuesType)=>{
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if(props.isAuth){
        return <Redirect to={'/profile'} /> 
    }
    return <div>
        <LoginReduxForm onSubmit={onSubmit} urlCaptcha={props.urlCaptcha} />
    </div>
}

let mapStateToProps = (state: AppStateType)=>({
    isAuth: state.authPage.isAuth,
    urlCaptcha: state.authPage.urlCaptcha
})
type MapStateToPropsType = {
    isAuth: boolean
    urlCaptcha: string | null
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string)=> void
}
export default connect(mapStateToProps, {login})(Login)