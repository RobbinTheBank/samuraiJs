import React from 'react';
import { connect } from 'react-redux';
import { authAPI } from '../../api/api';
import { setAuthUserData } from '../../redux/auth-reducer';
import Header from './Header';

class HeaderContainer extends React.Component{
  componentDidMount(){
    authAPI.authMe()
      .then(response=>{
        if(response.data.resultCode === 0){
          let {userId, email, login} = response.data.data;
          this.props.setAuthUserData(userId, email, login)
        }
      })
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
  login: state.authPage.login
})
 

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)
