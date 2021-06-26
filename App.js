import { connect, Provider } from 'react-redux';
import { Route } from 'react-router';
import style from './App.module.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import ProfileContainer from './Components/Profile/ProfileContainer';
import UsersContainer from './Components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';
import Preloader from './Components/common/Preloader/Preloader';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { store } from './redux/redux-store';


class App extends React.Component {
  componentDidMount(){
    this.props.initializeApp()
  }
  render(){
    if(!this.props.initialized){
      return <Preloader />
    }
    return (
      <div className={style.app}>     
          <HeaderContainer />   
          <Navbar />
        <div className={style.profile}>
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
const MainApp = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}
const AppContainer = connect(mapStateToProps, {initializeApp})(App);
export default MainApp