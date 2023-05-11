import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
function getUserName(token) {
    try {
      const decodedToken = jwtDecode(token);
  console.log(decodedToken)
      return { firstName: decodedToken.FirstName, lastName: decodedToken.LastName };
  
    } catch (error) {
      console.log(error);
      return null;
    }
  }
const NavSide = ({ children }) => {
    const sidebar = useRef(null);
    const menubar = useRef(null)
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState(null);
    function handleMenuItemClick(event) {
        const menuItem = event.currentTarget.id;
        setActiveMenuItem(menuItem);



    }

    const userToken = localStorage.getItem('token');
    const Username = getUserName(userToken)
const path = window.location.pathname;

    console.log ( Username .firstName)
    console.log ( Username .lastName)
    function handleMenuClick() {

        sidebar.current.classList.toggle('hide')

    }
    const handleModeChange = (event) => {
        setIsDarkMode(event.target.checked);
    };

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    useEffect(() => {
    
        if (path === '/Dash/PArchived') {
          setActiveMenuItem('5');
        } else {
          setActiveMenuItem(null);
        }
      }, [path]);

    return (
        <div>
            <body className={isDarkMode ? 'dark' : ''} >
                <section id="sidebar" ref={sidebar} className="show" >

                    <a href="#" className="brand">
                        <img src={require('../assets/sbs.png')} width="90%" />
                    </a>
                    <ul className="side-menu top">


                        <a id="1" onClick={handleMenuItemClick} >
                            <li className={ path === '/Dash/Home' ||   activeMenuItem == 1 ? 'active' : ''}>
                                <Link to="/Dash/Home" >
                                    <i className='bx bxs-dashboard' ></i>
                                    <span className="text" >Home</span>
                                </Link>
                            </li>
                        </a>


                        <li className={ path === '/Dash/PUsers' || activeMenuItem == 2 ? 'active' : ''} >
                            <a id="2" onClick={handleMenuItemClick} >
                                <Link to="/Dash/PUsers">
                                    <i className='bx bxs-group' ></i>
                                    <span className="text" >Users</span>
                                </Link>
                            </a>


                        </li>
                        <li className={ path === '/Dash/PProjects' || activeMenuItem == 3 ? "active" : ''} >
                            <a id="3" onClick={handleMenuItemClick} >
                                <Link to="/Dash/PProjects">
                                    <i className='bx bxs-doughnut-chart' ></i>
                                    <span className="text" >Projects  </span>
                                </Link>
                            </a>
                        </li>

                        <li className={ path === '/Dash/Task' || activeMenuItem == 4 ? "active" : ''} >
                            <a id="4" onClick={handleMenuItemClick}>

                                <Link to="/Dash/Task">
                                    <i className='bx bx-task'></i>
                                    <span className="text" >SBS Time Tracking  </span>
                                </Link>
                            </a>
                        </li>

                        <li className={ path === '/Dash/PArchived' || activeMenuItem == 5 ? 'active' : ''}>

                            <a id="5" onClick={handleMenuItemClick} >
                                <Link to='/Dash/PArchived'>

                                    <i className='bx bxs-shopping-bag-alt' ></i>
                                    <span className="text" >Archived Projects</span>
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

                            <a href="" className="logout">
                                <i className='bx bxs-log-out-circle' ></i>

                                <span className="text" onClick={logout}>Logout</span>
                            </a>



                        </li>
                    </ul>
                </section>

                <section ref={menubar} id="content">
                    <nav>
                        <i className='bx bx-menu' onClick={handleMenuClick}></i>



                        <div className='navprofile'>
                            <input type="checkbox" id="switch-mode" onChange={handleModeChange} hidden />
                            <label htmlFor="switch-mode" className="switch-mode"></label>
                            <a href="#" className="profile">
                                <img src={require('../assets/admin.png')} />
                            </a>
                            <div className='UserName'>
                                {Username.firstName} {Username.lastName}
                            </div>


                          
                        </div>

                    </nav>

                    <main >{children}</main>
                </section>

            </body>



        </div>
    );
};

export default NavSide