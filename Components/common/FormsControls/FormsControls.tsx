//@ts-ignore
import s from './FormsControls.module.css'
import {Field, WrappedFieldProps} from 'redux-form'
import { WrappedFieldMetaProps} from 'redux-form/lib/Field'
import { FieldValidatorType } from '../../../utils/validators/validators'
import React from 'react'


const FormControl: React.FC<FormControlPropsType> = ({meta,  ...props}) =>{
    const hasError = meta.touched && meta.error 
    return <div className={s.formControl + ' ' + (hasError ? s.error : '')} >
        <div>
            {props.children}
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>
}


export const Textarea: React.FC<WrappedFieldProps> = (props)=>{
    const {input, meta, ...restProps} = props
    return <FormControl {...props} > <textarea {...input} {...restProps} /> </FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props)=>{
    const {input, meta, ...restProps} = props
    return <FormControl {...props} > <input {...input} {...restProps} /> </FormControl>
}
export function createFormField<FormKeysType extends string>(placeholder: string | undefined, 
                                name: FormKeysType, 
                                component: React.FC<WrappedFieldProps>, 
                                validate: Array<FieldValidatorType>, 
                                props={}, 
                                text = ''){
     return <div>
        <Field placeholder={placeholder} 
               component={component} 
               name={name} 
               validate={validate} 
               {...props} 
               /> {text}
    </div>
}
type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
export type GetStringKeys<T> = Extract<keyof T, string>