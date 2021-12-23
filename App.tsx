import React from 'react';
import { connect, Provider } from 'react-redux';
import { Route, withRouter } from 'react-router';
import { Layout } from 'antd';
import {Login} from './Components/Login/Login';
import { NavbarPage } from './Components/Navbar/Navbar';
import { initializeApp } from './redux/reucers/app-reducer';
import Preloader from './Components/common/Preloader/Preloader';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { AppStateType, store } from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';
import { compose } from 'redux';
import { ComponentType } from 'hoist-non-react-statics/node_modules/@types/react';
import { UsersContainer } from './Components/Users/UsersContainer'
import { HeaderPage } from './Components/Header/Header';
import 'antd/dist/antd.css'
import './AppMain.css'

const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'))

const SuspenseDialogs = withSuspense(DialogsContainer)
const SuspenseProfile = withSuspense(ProfileContainer)

const { Header, Footer, Sider, Content } = Layout

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
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <>
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <div className="logo" />
            <NavbarPage />
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} >
              
              <HeaderPage />
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div className="site-layout-background" style={{ padding: 24 }}>
                <Switch>
                  <Route exact path='/' render={() => <Redirect from='/' to='/profile' />} />
                  <Route path='/profile/:userId?' render={() => <SuspenseProfile />} />
                  <Route path='/users' render={() => <UsersContainer />} />
                  <Route path='/dialogs' render={() => <SuspenseDialogs />} />
                  <Route path='/login' render={() => <Login />} />
                  <Route path='*' render={() => <div>404 NOT FOUND</div>} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Samurai network ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}


// <div className={style.app}>
//   <Header />
//   <Navbar />
//   <div className={style.profile}>
//     <Switch> 
//       <Route exact path='/' render={() => <Redirect from='/' to='/profile' />} />
//       <Route path='/profile/:userId?' render={()=> <SuspenseProfile />} />
//       <Route path='/users' render={()=> <UsersContainer />} />
//       <Route path='/dialogs' render={()=><SuspenseDialogs />} />
//       <Route path='/login' render={() => <Login />} />
//       <Route path='*' render={() => <div>404 NOT FOUND</div>} />
//     </Switch>
//   </div>
// </div>

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