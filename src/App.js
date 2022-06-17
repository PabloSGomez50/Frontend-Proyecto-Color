import './App.css';

import './components/banner.css';
import './components/topics.css';
import './components/publication.css';

// Components imports
import Home from './components_p/Home';
import Profile from './components_p/Profile';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Topics from './components/Topics';
import Publication from './components/Publication';

import UserForm from './components_p/UserForm';

// Auth imports 
import Login from './auth/Login';
import Register from './auth/Register';
import RequireAuth from './auth/RequireAuth';

import PersistLogin from './components_p/PersistLogin';
import axios from './api/axios'

import React from 'react';
import useLogout from './hooks/useLogout';
import { Routes, Route, NavLink, useParams, useNavigate } from 'react-router-dom';


// const sol = {username: 'SolPi', email: 'sol@gmail.com', password: 'prueba'};
// const rocio = {username: 'Rocio Gomez', email: 'rocio@gmail.com', password: 'vamosBoca'}

function App() {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/');
  }

  const getcsrf = async () => {
    try {
      const response = await axios('/refresh', {
        withCredentials: true
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">

      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/profile/2'>Profile</NavLink>
        <NavLink to='/project/new'>Project 1</NavLink>
        <NavLink to='/api'>API test</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/components'>Components</NavLink>
        <button onClick={signOut}>Sign Out!</button>
        <button onClick={getcsrf}>Get csrf!</button>
        <NavLink to='/user_edit'>Edit User</NavLink>
      </nav>

      <Routes>
        <Route path='/' element={
          <Home />
        } />
        <Route path='/components' element={
              <div className='container'>
                <NavBar />
                <Banner />
                
                <Topics />
                <Publication />
              </div>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path='/profile/:userId' element={<Profile />} />

            <Route path='/api' element={
              <div>
                <h3>Test API</h3>
                {/* <label>
                  Title
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br />
                <label>
                  image
                  <input type="file" onChange={(e) => setImage(e.target.files)} />
                </label>
                <br />
                <button onClick={createProject}>Send Image</button>
                <button onClick={register}>Register</button>
                <button onClick={login}>Login</button>
                <button onClick={getToken}>Token</button>
                <p>{csrfToken}</p>
                <button onClick={edituser}>Edit user</button> */}
              </div>
            } />
          </Route>
        </Route>

        <Route path='/:prop' element={<TestCompontent />} />
        <Route path='/:prop/:id' element={<TestCompontent />} />
        <Route path='/user_edit' element={<UserForm />} />
      </Routes>

    </div>
  );
}

export default App;

function TestCompontent() {
  let { id, prop } = useParams();

  return (
    <div>
      <h2>Props: {prop}</h2>
      {id ? <p>Id: {id}</p> : null}
    </div>
  );
}