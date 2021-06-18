import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { login, logout } from '../../redux/auth-reducer'
import { required } from '../../utils/validators/validators'
import { Input } from '../common/FormsControls/FormsControls'

const LoginForm = (props)=>{
    return <form onSubmit={props.handleSubmit} >
        <div>
            <Field placeholder={'Email'} name={'email'} component={Input}
                   validate={[required]} />
        </div>
        <div>
            <Field placeholder={'Password'} name={'password'} component={Input}
                   validate={[required]}
                   type={'password'} />
        </div>
        <div>
            <Field  name={'rememberMe'} component={Input} type={'checkBox'} /> Remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props)=>{
    const onSubmit = (formData)=>{
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if(props.isAuth){
        return <Redirect to={'/profile'} /> 
    }
    return <div>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}
let mapStateToProps = (state)=>({
    isAuth: state.authPage.isAuth
})
export default connect(mapStateToProps, {login, logout})(Login)