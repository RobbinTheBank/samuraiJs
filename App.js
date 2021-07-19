import React from 'react';
import { connect, Provider } from 'react-redux';
import { Route } from 'react-router';
import style from './App.module.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import { initializeApp } from './redux/app-reducer';
import Preloader from './Components/common/Preloader/Preloader';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { store } from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className={style.app}>
        <HeaderContainer />
        <Navbar />
        <div className={style.profile}>
          <Switch >
            <Route exact path='/' render={()=><Redirect from='/' to='/profile' />}/>
            <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
            <Route path='/users' render={withSuspense(UsersContainer)} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={()=><div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}
let mapStateToProps = (state) => ({
  initialized: state.appPage.initialized
})
const MainApp = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}
const AppContainer = connect(mapStateToProps, { initializeApp })(App);
export default MainApp