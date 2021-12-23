import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { login } from '../../redux/reucers/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import { required } from '../../utils/validators/validators'
//import { createFormField, GetStringKeys, Input } from '../common/FormsControls/FormsControls'
import s from '../common/FormsControls/FormsControls.module.css'

import { Form, Input, Button, Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import { urlCaptchaSelector } from '../../redux/selectors/users-selectors'
import { getIsAuth } from './../../redux/selectors/users-selectors';

export const Login = () => {
    const dispatch = useDispatch()
    const urlCaptcha = useSelector(urlCaptchaSelector)
    const isAuth = useSelector(getIsAuth)
    
    const onFinish = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
        console.log(formData)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    if(isAuth){
        return <Redirect to={'/profile'} /> 
    }
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
                marginTop: '100px',
                overflow: 'auto',
                height: '100vh',
                width: '50vh'
            }}
        >
            <Form.Item
                label="Username"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {urlCaptcha && <img src={urlCaptcha} />}
            {urlCaptcha &&
                <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                    <Form.Item
                        name="captcha"
                        noStyle
                        rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form.Item>
            }
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};



// const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> 
//     = ({handleSubmit, error, urlCaptcha})=>{
//     return <form onSubmit={handleSubmit} >
//             {createFormField<LoginFormValuesTypeKeys>('Email', 'email', InputChild, [required])}
//             {createFormField<LoginFormValuesTypeKeys>('Password', 'password', InputChild, [required], { type:'password'})}
//             {createFormField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', InputChild, [], { type:'checkbox'}, 'Remember me' )}
//         <div className={s.summaryError}>
//             {error}
//         </div>
//         <div>
//             {urlCaptcha && <img src={urlCaptcha} />}
//             {urlCaptcha && createFormField<LoginFormValuesTypeKeys>('Text of image', 'captcha', InputChild, [required], {})}
//         </div>
//         <div>
//             <button>Login</button>
//         </div>
//     </form>
// }
// const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm)

// const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType > = (props)=>{
//     const onSubmit = (formData: LoginFormValuesType)=>{
//         props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
//     }
//     if(props.isAuth){
//         return <Redirect to={'/profile'} /> 
//     }
//     return <div>
//         <LoginReduxForm onSubmit={onSubmit} urlCaptcha={props.urlCaptcha} />
//     </div>
// }
// let mapStateToProps = (state: AppStateType)=>({
//     isAuth: state.authPage.isAuth,
//     urlCaptcha: state.authPage.urlCaptcha
// })
// export default connect(mapStateToProps, {login})(Login)

// type MapStateToPropsType = {
//     isAuth: boolean
//     urlCaptcha: string | null
// }
// type MapDispatchToPropsType = {
//     login: (email: string, password: string, rememberMe: boolean, captcha: string)=> void
// }

// type LoginFormOwnPropsType = {
//     urlCaptcha: string | null
// }
// type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
