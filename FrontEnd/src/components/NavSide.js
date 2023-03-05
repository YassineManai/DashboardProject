import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';

const NavSide = ({ children }) => {
    const sidebar = useRef(null);
    const menubar = useRef(null)
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState(null);
    function handleMenuItemClick(event) {
        const menuItem = event.currentTarget.id;
        setActiveMenuItem(menuItem);



    }

    function handleMenuClick() {

        sidebar.current.classList.toggle('hide')

    }
    const handleModeChange = (event) => {
        setIsDarkMode(event.target.checked);
    };



    return (
        <div>
            <body className={isDarkMode ? 'dark' : ''} >
                <section id="sidebar" ref={sidebar} className="show" >

                    <a href="#" className="brand">
                        <img src={require('../assets/sbs.png')} width="90%" />
                    </a>
                    <ul className="side-menu top">


                        <a id="1" onClick={handleMenuItemClick} >
                            <li className={activeMenuItem == 1 ? 'active' : ''}>
                                <Link to="/Dash/Home" >
                                    <i className='bx bxs-dashboard' ></i>
                                    <span className="text" >Home</span>
                                </Link>
                            </li>
                        </a>


                        <li className={activeMenuItem == 2 ? 'active' : ''} >
                            <a id="2" onClick={handleMenuItemClick} >
                                <Link to="/Dash/PUsers">
                                    <i className='bx bxs-shopping-bag-alt' ></i>
                                    <span className="text" >Users</span>
                                </Link>
                            </a>


                        </li>
                        <li className={activeMenuItem == 3 ? "active" : ''} >
                            <a id="3" onClick={handleMenuItemClick} >
                                <Link to="/Dash/PProjects">
                                    <i className='bx bxs-doughnut-chart' ></i>
                                    <span className="text" >Projects  </span>
                                </Link>
                            </a>
                        </li>

                        <li className={activeMenuItem == 4 ? "active" : ''} >
                            <a id="4" onClick={handleMenuItemClick}>

                                <i className='bx bxs-message-dots' ></i>
                                <span className="text"  >Message</span>

                            </a>
                        </li>

                        <li className={activeMenuItem == 5 ? 'active' : ''}>
                            <a id="5" onClick={handleMenuItemClick} >
                                <Link to='/Dash/PArchived'>
                                    <i className='bx bxs-group' ></i>
                                    <span className="text" >ArchivedProjects</span>
                                </Link>

                            </a>
                        </li>
                    </ul>
                    <ul className="side-menu">
                        <li>
                            <a href="#">
                                <i className='bx bxs-cog' ></i>
                                <span className="text">Settings</span>
                            </a>
                        </li>
                        <li>
                            <Link to="/">
                                <a href="#" className="logout">
                                    <i className='bx bxs-log-out-circle' ></i>

                                    <span className="text">Logout</span>
                                </a>
                            </Link>


                        </li>
                    </ul>
                </section>

                <section ref={menubar} id="content">
                    <nav>
                        <i className='bx bx-menu' onClick={handleMenuClick}></i>
                        <a href="#" className="nav-link">Categories</a>
                        <form action="#">
                            <div className="form-input">
                                <input type="search" placeholder="Search..." />
                                <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                            </div>
                        </form>

                        <input type="checkbox" id="switch-mode" onChange={handleModeChange} hidden />
                        <label htmlFor="switch-mode" className="switch-mode"></label>

                        <a href="#" className="notification">
                            <i className='bx bxs-bell' ></i>
                            <span className="num">8</span>
                        </a>
                        <a href="#" className="profile">
                            <img src="img/people.png" />
                        </a>

                    </nav>

                    <main >{children}</main>
                </section>

            </body>



        </div>
    );
};

export default NavSide