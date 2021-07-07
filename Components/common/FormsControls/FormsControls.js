import s from './FormsControls.module.css'
import {Field} from 'redux-form'

const FormControl = ({input, meta,  ...props}) =>{
    const hasError = meta.touched && meta.error 
    return <div className={s.formControl + ' ' + (hasError ? s.error : '')} >
        <div>
            {props.children}
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>
}
export const Textarea = (props)=>{
    const {input, meta, ...restProps} = props
    return <FormControl {...props} > <textarea {...input} {...restProps} /> </FormControl>
}
export const Input = (props)=>{
    const {input, meta, ...restProps} = props
    return <FormControl {...props} > <input {...input} {...restProps} /> </FormControl>
}
export const createFormField = (placeholder, name, component, validate, props={}, text = '')=>{
     return <div>
        <Field placeholder={placeholder} 
               component={component} 
               name={name} 
               validate={validate} 
               {...props} 
               /> {text}
    </div>
}