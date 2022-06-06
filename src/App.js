
import './App.css';

import './components/banner.css';
import './components/topics.css';
import './components/publication.css';

import Home from './components/Home';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Topics from './components/Topics';
import Publication from './components/Publication';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RequireAuth from './components/auth/RequireAuth';

import ApiService from './api/ApiService';

import React, { useState } from 'react';
import { Routes, Route, NavLink, useParams } from 'react-router-dom';

const apiService = new ApiService();

function App() {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [csrfToken, setCsrfToken] = useState("");
  const [auth, setAuth] = useState();

  const register = () => {
    apiService.register({
      // username: 'Rocio Gomez',
      // email: 'rocio@gmail.com',
      // password: 'vamosBoca',
      // confirmation: 'vamosBoca'
      username: 'Sol Pi',
      email: 'sol@gmail.com',
      password: 'prueba',
      confirmation: 'prueba'
    })
  }

  const login = () => {
    console.log(csrfToken);
    apiService.login({
      username: 'Sol Pi',
      password: 'prueba'
    }, csrfToken)
      .then((data) => {
        console.log(data);
        setAuth(data.token)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const getToken = () => {
    apiService.getCSRFToken()
      .then(csrf => setCsrfToken(csrf));
  }

  const createProject = () => {
    apiService.createProj({
      title: title,
      auth: auth,
      members: [{ id: 4, username: 'Pablo' }, { id: 3, username: 'Sol' }]
    },
      image)
      .then(data => console.log(data));
  }

  const edituser = () => {
    apiService.editUser({
      username: 'Pablo Gomez',
      carrer: 'Electronic Engineer',
      auth: auth
    }, image)
      .then(data => console.log(data));
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
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path='/components' element={
            <div>
              <NavBar />
              <Banner />

              <Topics />
              <Publication />
            </div>
          } />
          <Route path='/api' element={
            <div>
              <h3>Test API</h3>
              <label>
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
              <button onClick={edituser}>Edit user</button>
            </div>
          } />
        </Route>

        <Route path='/:prop' element={<TestCompontent />} />
        <Route path='/:prop/:id' element={<TestCompontent />} />
      </Routes>

    </div>
  );
}

function TestCompontent() {
  let { id, prop } = useParams();

  return (
    <div>
      <h2>Props: {prop}</h2>
      {id ? <p>Id: {id}</p> : null}
    </div>
  );
}

export default App;
