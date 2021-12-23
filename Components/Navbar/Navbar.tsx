import React from 'react'
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import s from './Navbar.module.css'
import { NavLink } from "react-router-dom";
import { Menu } from 'antd';

export const NavbarPage: React.FC<Propstype> = (props) => {
    return (<>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <NavLink to='/profile' activeClassName={s.activeLink} >Profile</NavLink>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <NavLink to='/users' activeClassName={s.activeLink} >Users</NavLink>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <NavLink to='/dialogs' activeClassName={s.activeLink} >Dialogs</NavLink>
              </Menu.Item>
              <Menu.Item key="4" icon={<BarChartOutlined />}>
                settings
              </Menu.Item>
              <Menu.Item key="5" icon={<CloudOutlined />}>
                music
              </Menu.Item>
            </Menu>
        </>
        // <nav className={s.nav}>
        //     <div className={s.item} >
        //         <NavLink to='/profile' activeClassName={s.activeLink} >Profile</NavLink>
        //     </div>
        //     <div className={`${s.item} ${s.active}`}>
        //         <NavLink to='/users' activeClassName={s.activeLink} >Users</NavLink>
        //     </div>
        //     <div className={`${s.item} ${s.active}`} >
        //         <NavLink to='/dialogs' activeClassName={s.activeLink} >Dialogs</NavLink>
        //     </div>
            
        // </nav >
    )
}
type Propstype = {
    
}