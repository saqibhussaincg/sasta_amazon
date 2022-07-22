import './App.css';

import { Routes, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import PgFOF from './components/errorpage/PgFOF';
import Cart from './components/cart/Cart';
import Profile from './profile/Profile';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path='/signup' element={<Signup />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/cart' element={<Cart />} />
      <Route exact path='/userprofile' element={<Profile />} />
      <Route path='*' element={<PgFOF />} />
    </Routes>
  );
}

export default App;
