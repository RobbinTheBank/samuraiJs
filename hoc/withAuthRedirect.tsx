import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { AppStateType } from '../redux/redux-store'

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.authPage.isAuth
} as MapStateProps)

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapStateProps & DispatchPropsType> = (props) => {

        let { isAuth, ...restProps } = props

        if (!props.isAuth) return <Redirect to='/login' />

        return <WrappedComponent {...restProps as WCP} />
    }
    let ConnectedRedirectComponent = connect<MapStateProps, DispatchPropsType, WCP, AppStateType>(
        mapStateToProps, {})(RedirectComponent)
    return ConnectedRedirectComponent
}
type MapStateProps = {
    isAuth: boolean
}
type DispatchPropsType = {
}


