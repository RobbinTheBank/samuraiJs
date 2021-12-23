import React from 'react';
import s from './Header.module.css';
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth, selectCurrentUseLogin } from '../../redux/selectors/users-selectors';
import { logout } from '../../redux/reucers/auth-reducer';
import { Button } from 'antd';

export const HeaderPage: React.FC<PropsType> = (props) => {
  const isAuth = useSelector(getIsAuth)
  const login = useSelector(selectCurrentUseLogin)
  const dispatch = useDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  }
  return (
    <div className={s.header} >
      <img src={logo} />
      <div  className={s.loginBlock}>
        {isAuth
          ? <div>{login} <Button onClick={logoutCallback} >Logout</Button> </div>
          : <NavLink to={'/login'} >Login</NavLink>}
      </div>
    </div>
  )
}
type PropsType = {}
