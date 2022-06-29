import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from '../hooks/useLogout';

import an_user from '../icons/an_account.svg';
import pageicon from '../img/page_logo.png';
import logouticon from '../icons/logout.svg';

function Nav() {
    const navigate = useNavigate();
    const logout = useLogout();

    const { auth } = useAuth();
    const user = auth.user;
  
    const signOut = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        } finally {
            navigate('/');
        }
    }
  
    return (
        <nav className='navbar'>
            <img src={pageicon} alt='page logo' />
            <div className='nav-list'>
                <NavLink to='/profile/2'    className='nav-item' >Profile</NavLink>
                <NavLink to='/user_edit'    className='nav-item' >Edit User</NavLink>
                <NavLink to='/'             className='nav-item' >Home</NavLink>
                <NavLink to='/project/3'    className='nav-item' >Project 3</NavLink>
                {/* <NavLink to='/components'>Components</NavLink> */}
                <NavLink to='/project_edit' className='nav-item' >Edit Project</NavLink>
            </div>
            <div className='user-session'>
                {user ?
                    <>
                        <img src={user.image} alt={user.name}/>
                        <span>{user.name}</span>
                        <img src={logouticon} alt='Sign Out' onClick={signOut} id='signout'/>
                    </>
                     : 
                     <>
                        <NavLink to='/login'    className='nav-item'>Log In</NavLink>
                        <NavLink to='/register' className='nav-item'>Sign Up</NavLink>
                        <img src={an_user} alt='anonymous user' />
                     </>
                }
            </div>
            
        </nav>
    )
}

export default Nav;