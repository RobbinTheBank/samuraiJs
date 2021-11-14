import React from 'react';
import s from './Header.module.css';
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth, selectCurrentUseLogin } from '../../redux/users-selectors';
import { logout } from '../../redux/auth-reducer';

const Header: React.FC<PropsType> = (props)=>{
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(selectCurrentUseLogin)
    const dispatch = useDispatch()

    const logoutCallback = ()=>{
      dispatch(logout())
    }
    return (
      <header className={s.header}>
        <img src={logo} />
        <div className={s.loginBlock}  >
        {isAuth 
        ? <div>{login} <button onClick={logoutCallback} >Logout</button> </div>  
        :  <NavLink to={'/login'} >Login</NavLink>}
        </div>
      </header>
        
    )
}
export default Header
type PropsType = {}
