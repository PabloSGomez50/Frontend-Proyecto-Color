import './App.css';

// Components imports
import Home from './components_p/Home';
import Profile from './com_users/Profile';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Topics from './components/Topics';
import Publication from './components/Publication';

import UserForm from './com_users/ProfileForm';
import ProjectForm from './com_projects/ProjectForm';
import ProjectPage from './com_projects/ProjectPage';

// Auth imports 
import Login from './auth/Login';
import Register from './auth/Register';
import RequireAuth from './auth/RequireAuth';
import PersistLogin from './auth/PersistLogin';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components_p/Nav';

import { ProfileProvider } from './com_users/ProfileProvider';

function App() {

  return (
    <div> {/* className="App" */}
    
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
              <Route path='/profile/:userId' element={
                <ProfileProvider>
                    <Profile />
                </ProfileProvider>
              } />

            <Route path='/user_edit' element={<UserForm />} />
            <Route path='/project_edit' element={<ProjectForm />} />
          </Route>
        </Route>

      </Routes>

      {/* icons by
      <a target="_blank" href="https://icons8.com"> Icons8</a> */}
    </div>
  );
}

export default App;
