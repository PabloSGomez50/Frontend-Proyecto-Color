import React from 'react';

function Navbar(){
  return(
      <header className="Navbar">
          <p className="Navbar__logo">Logo</p> {/* Logo proyecto */}
          <div className="search"> {/* Buscador */}
              <input className="search__input" type="search" placeholder="Search..."></input>
              
              <span className="material-symbols-outlined">
              search
              </span>
          </div>
          <div className="account">{/* buttons sign in/out */}
              <button className="account__in">Sign In</button>
              <button className="account__out">Log out</button>
          </div>
      </header>
  )

}

export default Navbar;