import './App.css';

import './components/banner.css';
import './components/topics.css';
import './components/publication.css';

// Components imports
import Home from './components_p/Home';
import Profile from './com_users/Profile';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Topics from './components/Topics';
import Publication from './components/Publication';

import UserForm from './com_users/UserForm';
import ProjectForm from './com_projects/ProjectForm';
import ProjectPage from './com_projects/ProjectPage';

// Auth imports 
import Login from './auth/Login';
import Register from './auth/Register';
import RequireAuth from './auth/RequireAuth';

import PersistLogin from './components_p/PersistLogin';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components_p/Nav';


// const rocio = {username: 'Rocio Gomez', email: 'rocio@gmail.com', password: 'vamosBoca'}

function App() {

  return (
    <div className="App">

      <Nav />

      <Routes>
        <Route element={<PersistLogin />}>
          <Route path='/' element={<Home />} />

          <Route path='/project/:projectId' element={<ProjectPage />} />

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

          <Route element={<RequireAuth />}>
            <Route path='/profile/:userId' element={<Profile />} />

            <Route path='/user_edit' element={<UserForm />} />
            <Route path='/project_edit' element={<ProjectForm />} />
          </Route>
        </Route>

      </Routes>

    </div>
  );
}

export default App;
