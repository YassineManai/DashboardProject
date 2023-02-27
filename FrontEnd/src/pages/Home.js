import 'react-calendar/dist/Calendar.css';

//import '../js files/dashfile'
import { useEffect, useState } from "react"
import Calendar from 'react-calendar';

import axios from "axios"
import Userligne from "../secondary -components/singleuser"



const Home = () => {
    const [Users, setUsers] = useState([]);
    const [Projects, setProjects] = useState([]);
    const [BILL, setBILL] = useState([]);
    const [value, onChange] = useState(new Date());







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
        axios.get('http://127.0.0.1:3000/Bill/allBills').then((res) => {
            setBILL(res.data);
        }
        )
            .catch(error => console.error(error));
    }, [])






    const listusers = Users.map((single, k) => <Userligne single={single} key={k} />)

    // className={isDarkMode ? 'dark' : ''}




    return (
        <div >





            <div class="head-title">
                <div class="left">
                    <h1>Dashboard</h1>
                    <ul class="breadcrumb">
                        <li>
                            <a href="#">Dashboard</a>
                        </li>
                        <li><i class='bx bx-chevron-right' ></i></li>
                        <li>
                            <a class="active" href="#">Home</a>
                        </li>
                    </ul>
                </div>

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
                        <h3>{BILL.length}</h3>
                        <p>Total bills per month</p>
                    </span>
                </li>
                <li>
                    <i className='bx bxs-dollar-circle' ></i>
                    <span className="text">
                        <h3>5</h3>
                        <p>Facture</p>
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

                <Calendar onChange={onChange} value={value} />

            </div>




        </div>


    )
}
export default Home