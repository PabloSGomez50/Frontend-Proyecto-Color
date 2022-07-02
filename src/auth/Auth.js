import React, { useRef, useState } from "react";
import Login from './Login';
import Register from './Register';

import './auth.css';

function Auth({ action }) {

    const errRef = useRef();
    
    const [ username, setUsername ] = useState('');
    const [ pwd, setPwd] = useState('');
    const [ career, setCareer ] = useState('');
    const [ errMsg, setErrMsg ] = useState('');

    const handleJoin = e => {
        e.preventDefault();
        e.stopPropagation();
        console.log('user ask to join');
        errMsg ? setErrMsg('') : setErrMsg('Error Alert');
        setUsername('');
        setPwd('');
        setCareer('');
    }

    return (
    <div className='auth-display'>
        <section className='auth-section auth-line'>
            <h1>Join Our Team</h1>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleJoin} className='auth-form'>

                <label>Username</label>
                <input type='text' value={username} onChange={e => setUsername(e.target.value)}/>

                <label>Password</label>
                <input type='password' value={pwd} onChange={e => setPwd(e.target.value)} />

                <label>Career</label> 
                <input type='text' value={career} onChange={e => setCareer(e.target.value)}/>

                <button className='auth-button'>Apply</button>

            </form>
            
        </section>
        {action === 'login' && 
            <Login />

        }
        {action === 'register' &&
            <Register />
        }
    </div>
    );
}

export default Auth;