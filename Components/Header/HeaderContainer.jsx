import React from 'react';
import { connect } from 'react-redux';
import { getAuthUserData, logout } from '../../redux/auth-reducer';
import Header from './Header';

class HeaderContainer extends React.Component{
  render(){
    return <Header  
                  isAuth={this.props.isAuth}
                  login={this.props.login}
                  logout={this.props.logout}
    />
  } 
}
let mapStateToProps = (state)=>({
  isAuth: state.authPage.isAuth,
  login: state.authPage.login,
})
export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer)
