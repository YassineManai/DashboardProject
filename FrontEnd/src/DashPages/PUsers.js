import axios from "axios";
import { useState, useEffect } from "react";
import Userligneinfo from "../secondary -components/Singleuserinfo";
const PUsers = () => {
    const [Users, setUsers] = useState([]);


    const fetchUsers = async (searchTerm) => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/user/allusers');
            // Add the Id property to each user object in the array
            const usersWithId = response.data.map(user => ({ ...user, Id: user._id }));
            // Filter the users array by first name if a search term is provided
            const filteredUsers = searchTerm
                ? usersWithId.filter(user => user.FirstName.toLowerCase().includes(searchTerm.toLowerCase()))
                : usersWithId;
            setUsers(filteredUsers);
        } catch (error) {
            console.error(error);
        }
    };




    useEffect(() => {

        fetchUsers();
    }, [])

    const listUsersinfo = Users.map((user, index) => {
        return <Userligneinfo key={index} user={user} />;
    });



    return (
        <div >



            <div class="head-title">
                <div class="left">
                    <h1>Users</h1>
                    <ul class="breadcrumb">
                        <li>
                            <a href="#">Dashboard</a>
                        </li>
                        <li><i class='bx bx-chevron-right' ></i></li>
                        <li>
                            <a class="active" href="#">Users</a>
                        </li>
                    </ul>
                </div>

            </div>



            <div className="table-data">
                <div className="order">
                    <div className="head">
                        <h3>All Users</h3>
                        <i >
                            <form action="" class="search-bar">
                                <input
                                    type="search"
                                    name="search"
                                    pattern=".*\S.*"
                                    required
                                    onChange={(event) => fetchUsers(event.target.value)}
                                />
                                <button class="search-btn" type="submit">
                                    <span>Search</span>
                                </button>
                            </form>
                        </i>

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
                        <div className='ligne1'>
                            {listUsersinfo}

                        </div>


                    </div>
                </div>






            </div>









        </div>
    )
}
export default PUsers