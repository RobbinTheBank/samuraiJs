import React from 'react';
import { connect, Provider } from 'react-redux';
import { Route, withRouter } from 'react-router';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import { initializeApp } from './redux/app-reducer';
import Preloader from './Components/common/Preloader/Preloader';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { AppStateType, store } from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';
import { compose } from 'redux';
import { ComponentType } from 'hoist-non-react-statics/node_modules/@types/react';
import {UsersContainer} from './Components/Users/UsersContainer'

const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'))

const SuspenseDialogs = withSuspense(DialogsContainer)
const SuspenseProfile = withSuspense(ProfileContainer)

class App extends React.Component<MapStateProps & DispatchProps> {
  
  catchAllUnhendledErrors = (e: PromiseRejectionEvent) => {
    alert('Some error occured')
  }
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhendledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhendledErrors)
  }
  render() {

    const style = require('./App.module.css'); // without this expression produces an error 
     //(Property does not exist on type 'typeof import("*.module.css")'. )
    
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className={style.app}>
        <HeaderContainer />
        <Navbar />
        <div className={style.profile}>
          <Switch >
            <Route exact path='/' render={() => <Redirect from='/' to='/profile' />} />
            <Route path='/profile/:userId?' render={()=> <SuspenseProfile />} />
            <Route path='/users' render={()=> <UsersContainer />} />
            <Route path='/dialogs' render={()=><SuspenseDialogs />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}
let mapStateToProps = (state: AppStateType) => ({
  initialized: state.appPage.initialized
})
const MainApp = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}
const AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);
export default MainApp
type MapStateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = {
  initializeApp: () => void
}