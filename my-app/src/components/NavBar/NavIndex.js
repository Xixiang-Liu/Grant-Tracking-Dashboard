import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavBarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
       
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/Home' activeStyle>
            Home
          </NavLink>
          <NavLink to='/Edit' activeStyle>
            Edit
          </NavLink>
          <NavLink to='/Upload' activeStyle>
            Upload Records
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;