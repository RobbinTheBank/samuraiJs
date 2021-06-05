import React from 'react';
import { connect } from 'react-redux';
import { authAPI } from '../../api/api';
import { getAuthUserData } from '../../redux/auth-reducer';
import Header from './Header';

class HeaderContainer extends React.Component{
  componentDidMount(){
    this.props.getAuthUserData()
  }

  render(){
    return <Header  
                  isAuth={this.props.isAuth}
                  login={this.props.login}
    />
  } 
}
let mapStateToProps = (state)=>({
  isAuth: state.authPage.isAuth,
  login: state.authPage.login,
})
 

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer)
