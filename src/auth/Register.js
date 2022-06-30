import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

import './auth.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,24}$/; // (?=.*[!@#$%])
const MAIL_REGEX = /^(?=[a-z]*)(?=\d*).{4,10}@.+\..{2,4}$/;
const REGISTER_URL = '/register';

function Register() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    // The dependencies of the hooks its empty, 
    // then only focus in user field when start
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        // console.log(`The user regex valitaion is ${result}.`);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = MAIL_REGEX.test(mail);
        // console.log(`The mail regex valitaion is ${result}.`);
        setValidMail(result);
    }, [mail])

    useEffect(() => {
        // Set valid password with the response of the regex test
        setValidPwd(PWD_REGEX.test(pwd));
        // Checks if both password are the same
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return undefined;
        }

        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({
                    username: user,
                    email: mail,
                    password: pwd,
                    confirmation: matchPwd
                }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(user, pwd);

            const data = response?.data;
            const accessToken = data.token;
            const _user = data.user;

            console.log(data, accessToken);

            setAuth({'user': _user, accessToken});
            setUser('');
            setPwd('');
            setMatchPwd('');
            navigate(from, { replace: true });

        } catch (err) {
            setErrMsg(err?.response?.status);
            errRef.current.focus();
        }
    }

    return (
        <section className='auth-section'>
            <h1>Register!</h1>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>Valid</span>
                    <span className={validName || !user ? "hide" : "invalid"}>Invalid</span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="email">
                    Email:
                    <span className={validMail ? "valid" : "hide"}>Valid</span>
                    <span className={validMail || !mail ? "hide" : "invalid"}>Invalid</span>
                </label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setMail(e.target.value)}
                    value={mail}
                    required
                    aria-invalid={validMail ? "false" : "true"}
                    aria-describedby="mailnote"
                    onFocus={() => setMailFocus(true)}
                    onBlur={() => setMailFocus(false)}
                />
                <p id="mailnote" className={mailFocus && !validMail ? "instructions" : "offscreen"}>
                    4 to 10 characters before @ plus domain.<br />
                    Example Validation: example@mailtrap.io.<br />
                    Allowed special characters: <span aria-label="at symbol">@</span>
                </p>

                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>Valid</span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>Invalid</span>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>Valid</span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>Invalid</span>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    Must match the first password input field.
                </p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>

            <p>
                Already registered?<br />
                <span className="line">
                    <Link to="/login">Sign In</Link>
                </span>
            </p>
        </section>
    );
}

export default Register;