import Nav from "../secondary -components/nav"
import Side from "../secondary -components/sidebar"
//import '../js files/dashfile'
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Userligne from "../secondary -components/singleuser"



const Dash = () => {
    const [Users, setUsers] = useState([]);
    const [Projects, setProjects] = useState([]);
    const sidebar = useRef(null);
    const menubar = useRef(null)
    const [isDarkMode, setIsDarkMode] = useState(false);


    function handleMenuClick() {

        sidebar.current.classList.toggle('hide')

    }
    const handleModeChange = (event) => {
        setIsDarkMode(event.target.checked);
    };



    useEffect(() => {

        axios.get('http://127.0.0.1:3000/user/allusers').then((res) => {
            setUsers(res.data);
        }
        )
            .catch(error => console.error(error));


        axios.get('http://127.0.0.1:3000/project/allprojects').then((res) => {
            setProjects(res.data);
        }
        )
            .catch(error => console.error(error));
    }, [])






    const listusers = Users.map((single, k) => <Userligne single={single} key={k} />)






    return (
        <div >
            <body  className={isDarkMode ? 'dark' : ''} >
                <section id="sidebar" ref={sidebar} className="show" >
                    <Side />
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



                    <main>

                        <div className="head-title">
                            <div className="left">
                                <h1>Dashboard</h1>
                                <ul className="breadcrumb">
                                    <li>
                                        <a href="#">Dashboard</a>
                                    </li>
                                    <li><i className='bx bx-chevron-right' ></i></li>
                                    <li>
                                        <a className="active" href="#">Home</a>
                                    </li>
                                </ul>
                            </div>
                            <a href="#" className="btn-download">
                                <i className='bx bxs-cloud-download' ></i>
                                <span className="text">Download PDF</span>
                            </a>
                        </div>

                        <ul className="box-info">
                            <li>
                                <i className='bx bxs-calendar-check' ></i>
                                <span className="text">
                                    <h3>{Projects.length}</h3>
                                    <p>Projects</p>
                                </span>
                            </li>
                            <li>
                                <i className='bx bxs-group' ></i>
                                <span className="text">
                                    <h3>{Users.length}</h3>
                                    <p>Users</p>
                                </span>
                            </li>
                            <li>
                                <i className='bx bxs-dollar-circle' ></i>
                                <span className="text">
                                    <h3>$2543</h3>
                                    <p>Total bills per month</p>
                                </span>
                            </li>
                        </ul>


                        <div className="table-data">
                            <div className="order">
                                <div className="head">
                                    <h3>All Users</h3>
                                    <i className='bx bx-search' ></i>
                                    <i className='bx bx-filter' ></i>
                                </div>
                                <div className="table-wrapper">
                                    <table className="fl-table">
                                        <thead >
                                            <tr>
                                                <th>FirstName</th>
                                                <th>LastName</th>
                                                <th>Email</th>
                                                <th> Phone</th>
                                                <th></th>

                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                {listusers}

                            </div>
                            <div className="todo">
                                <div className="head">
                                    <h3>Todos</h3>
                                    <i className='bx bx-plus' ></i>
                                    <i className='bx bx-filter' ></i>
                                </div>
                                <ul className="todo-list">
                                    <li className="completed">
                                        <p>Todo List</p>
                                        <i className='bx bx-dots-vertical-rounded' ></i>
                                    </li>
                                    <li className="completed">
                                        <p>Todo List</p>
                                        <i className='bx bx-dots-vertical-rounded' ></i>
                                    </li>
                                    <li className="not-completed">
                                        <p>Todo List</p>
                                        <i className='bx bx-dots-vertical-rounded' ></i>
                                    </li>
                                    <li className="completed">
                                        <p>Todo List</p>
                                        <i className='bx bx-dots-vertical-rounded' ></i>
                                    </li>
                                    <li className="not-completed">
                                        <p>Todo List</p>
                                        <i className='bx bx-dots-vertical-rounded' ></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </main>

                </section>
            </body>
        </div>













    )
}
export default Dash