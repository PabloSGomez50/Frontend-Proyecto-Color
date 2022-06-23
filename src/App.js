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
import ProjectForm from './components_p/ProjectForm';
import ProjectPage from './components_p/ProjectPage';

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
        <NavLink to='/project/3'>Project 3</NavLink>
        <NavLink to='/api'>API test</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/components'>Components</NavLink>
        <button onClick={signOut}>Sign Out!</button>
        <button onClick={getcsrf}>Get csrf!</button>
        <NavLink to='/user_edit'>Edit User</NavLink>
        <NavLink to='/project_edit'>Edit Project</NavLink>
      </nav>

      <Routes>
        <Route path='/' element={
          <Home />
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/components' element={
              <div className='container'>
                <NavBar />
                <Banner />
                
                <Topics />
                <Publication />
              </div>
        } />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path='/profile/:userId' element={<Profile />} />

            <Route path='/api' element={
              <div>
                <h3>Test API</h3>
              </div>
            } />
            <Route path='/user_edit' element={<UserForm />} />
            <Route path='/project_edit' element={<ProjectForm />} />
          </Route>
        </Route>

        <Route path='/project/:projectId' element={<ProjectPage />} />
        <Route path='/:prop' element={<TestCompontent />} />
        <Route path='/:prop/:id' element={<TestCompontent />} />
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