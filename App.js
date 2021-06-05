import { Route } from 'react-router';
import './App.css';
import Header from './Components/Header/Header';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import ProfileContainer from './Components/Profile/ProfileContainer';
import UsersContainer from './Components/Users/UsersContainer';


function App() {
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

export default App;
