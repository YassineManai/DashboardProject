
import { Link } from "react-router-dom";

const Side = () => {
    return (
        <section id="sidebar">
            <a href="#" className="brand">

                <img width="100%" src="sbs.png"></img>
            </a>
            <ul className="side-menu top">
                <li className="active">
                <Link to="/dash">
                        <i className='bx bxs-dashboard' ></i>
                        <span className="text">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/UserPage">
                        <i className='bx bxs-shopping-bag-alt' ></i>
                        <span className="text">Users</span>
                    </Link>


                </li>
                <li>
                    <a href="#">
                        <i className='bx bxs-doughnut-chart' ></i>
                        <span className="text">Analytics</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className='bx bxs-message-dots' ></i>
                        <span className="text">Message</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className='bx bxs-group' ></i>
                        <span className="text">Team</span>
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
        </section>)
}
export default Side;