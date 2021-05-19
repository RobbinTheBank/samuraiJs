import { Route } from 'react-router';
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import UsersContainer from './Components/Users/UsersContainer';


function App() {
  return (
    <div className="App">     
        <Header />   
        <Navbar />
      <div className='profile'>
        <Route  path='/profile' render={()=><Profile />} />
        <Route  path='/users' render={()=><UsersContainer />} />
      </div>
    </div>
  );
}

export default App;
