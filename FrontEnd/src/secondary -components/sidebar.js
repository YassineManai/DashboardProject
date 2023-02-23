
import { useState } from "react";
import { Link } from "react-router-dom";


const Side = () => {
    const [activeMenuItem, setActiveMenuItem] = useState(null);
    function handleMenuItemClick(event) {
        const menuItem = event.currentTarget.id;
        setActiveMenuItem(menuItem);
        console.log(menuItem)
    }


    return (
        <div>

            <a href="#" className="brand">
                <img width="100%" src="sbs.png"></img>
            </a>
            <ul className="side-menu top">


                <a id="1" onClick={handleMenuItemClick} >
                    <li className={activeMenuItem == 1 ? 'active' : ''}>
                        <Link to="/dash" >
                            <i className='bx bxs-dashboard' ></i>
                            <span className="text"  >Dashboard</span>
                        </Link>
                    </li>
                </a>


                <li className={activeMenuItem == 2 ? 'active' : ''} >
                    <a id="2" onClick={handleMenuItemClick} >
                        <Link to="/UserPage">
                            <i className='bx bxs-shopping-bag-alt' ></i>
                            <span className="text" >Users</span>
                        </Link>
                    </a>


                </li>
                <li className={activeMenuItem == 3 ? "active" : ''} >
                    <a id="3" onClick={handleMenuItemClick} >
                        <i className='bx bxs-doughnut-chart' ></i>
                        <span className="text" >Analytics  </span>
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
                        <i className='bx bxs-group' ></i>
                        <span className="text" >Team</span>
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
        </div>



    )
}
export default Side;