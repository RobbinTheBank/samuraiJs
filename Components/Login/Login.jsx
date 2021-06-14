import React from 'react'
import { reduxForm, Field } from 'redux-form'
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
                   validate={[required]} />
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
        console.log(formData)
    }
    return <div>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}
export default Login