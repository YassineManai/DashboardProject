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

    useEffect(() => {

        axios.get('http://127.0.0.1:3000/user/allusers').then((res) => {
            setUsers(res.data);
            console.log(Users)

        }
        )
            .catch(error => console.error(error));




        axios.get('http://127.0.0.1:3000/project/allprojects').then((res) => {
            setProjects(res.data);
            console.log(Projects)
           
        }
        )
            .catch(error => console.error(error));
    }, [])



   if ((Users === undefined) || (Projects === undefined)) {
    return <div>Hai</div>
    }

   
    const listusers = Users.map((single, k) => <Userligne single={single} key={k} />)
    console.log(listusers)









    return (
        <div >
            <Side />



            <section id="content">

                <Nav />




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

        </div>













    )
}
export default Dash