import { connect } from 'react-redux';
import { Route } from 'react-router';
import './App.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import ProfileContainer from './Components/Profile/ProfileContainer';
import UsersContainer from './Components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';
import Preloader from './Components/common/Preloader/Preloader';
import React from 'react';


class App extends React.Component {
  componentDidMount(){
    this.props.initializeApp()
  }
  render(){
    if(!this.props.initialized){
      return <Preloader />
    }
    return (
      <div className="App">     
          <HeaderContainer />   
          <Navbar />
        <div className='profile'>
          <Route  path='/profile/:userId?' render={()=><ProfileContainer />} />
          <Route  path='/users' render={()=><UsersContainer />} />
          <Route  path='/login' render={()=><Login />} />
        </div>
      </div>
    );
  }
}
let mapStateToProps = (state)=>({
  initialized: state.appPage.initialized
})
export default connect(mapStateToProps, {initializeApp})(App);
