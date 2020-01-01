import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    
    const hideMenu = () => {
        document.getElementById('checkbox').checked = false;
    }

    return (
        <nav role='navigation'>
        <div id='menuToggle'>
            <input id='checkbox' type='checkbox' />
            <span></span>
            <span></span>
            <span></span>
            
            <ul id='menu'>
            <li onClick={hideMenu}><Link to='/'>Home</Link></li>
            <li onClick={hideMenu}><Link to='/about'>About</Link></li>
            <a href='https://github.com/JSONhilder/JS_Url_Shortener' target='_blank' rel="noopener noreferrer"><li onClick={hideMenu}>Git Repo</li></a>
            </ul>
        </div>
        </nav>
    )
}

export default NavBar;