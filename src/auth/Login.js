import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';

import useAuth from '../hooks/useAuth';
import { axiosPrivate } from '../api/axios';

const LOG_URL = '/login';

function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttribute] = useInput('user','');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    useEffect(() => {
        userRef.current.focus();
        !check && resetUser();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post(
                LOG_URL,
                JSON.stringify({ username: user, password: pwd })
            );

            console.log(user, pwd);
            console.log(response.data);

            const accessToken = response.data.token;

            setAuth({'user': response.data.user, accessToken}); 
            resetUser();
            setPwd('');
            navigate(from, { replace: true });

        } catch (err) {
            if (!err.response) {
                setErrMsg('No server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

    }

    return (
        <section className='auth-section'>  
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h1>Sign In</h1>
            <form className='auth-form' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    {...userAttribute}
                    required
                />

                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />

                <div className='persistCheck'>
                    <input
                        type='checkbox'
                        id='persist'
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label htmlFor='persist'>Trust This Device</label>
                </div>

                <button className='auth-button'>Sign In</button>
            </form>
            <p className="auth-link">
                Need an Account?<br />
                <span>
                    <Link className='auth-a' to='/register'>Sign up!</Link>
                </span>
            </p>
        </section>
    );
}

export default Login;