import { Route } from 'react-router';
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';


function App() {
  return (
    <div className="App">     
        <Header />   
        <Navbar />
      <div className='profile'>
        <Route  path='/profile' render={()=><Profile />} />
      </div>
    </div>
  );
}

export default App;
