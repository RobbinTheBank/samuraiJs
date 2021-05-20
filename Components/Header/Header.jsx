import React from 'react';
import s from './Header.module.css';
import logo from '../../assets/logo.png'
const Header = (props)=>{
    return (
      <header className={s.header}>
        <img src={logo} />
        {props.login}
      </header>
        
    )
}
export default Header