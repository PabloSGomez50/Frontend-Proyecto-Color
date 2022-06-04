import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './AuthProvider';
import axios from '../../api/ApiService';
import './auth.css';

const LOG_URL = '/login';

function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOG_URL, 
                JSON.stringify({username: user, password: pwd}),
                {
                    headers: { 'Content-Type': 'application/json'}
                }
            );
            console.log(user, pwd);
            console.log(response.data);
            const accessToken = response.data.token;
            const data = response.data.user;
            console.log(accessToken, data);
            setAuth({user, pwd, accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);

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
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link to="/">Home</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/register">Sign up</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
}

export default Login;