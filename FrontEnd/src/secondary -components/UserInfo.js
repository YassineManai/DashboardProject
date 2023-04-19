import React from "react";
import axios from "axios";
import '../componentsCss/alluser.css'
import { useState } from "react";
import { useEffect } from "react";

const Userinfo = ({ PUser }) => {

    const [projects, setProjects] = useState([]);


    const [FirstName, setFirstName] = useState(PUser.FirstName);
    const [LastName, setLastName] = useState(PUser.LastName);
    const [Email, setEmail] = useState(PUser.Email);
    const [Password, setPassword] = useState('');
    const [Phone, setPhone] = useState(PUser.Phone);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");





    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => {
                setError('');
            }, 5000);

            return () => {
                clearTimeout(timeout);
            };
        }
        if (success) {
            const timeout = setTimeout(() => {
                setSuccess('');
            }, 5000);

            return () => {
                clearTimeout(timeout);
            };
        }


    }, [error, success]);






    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedDaySheet = {
            _id: PUser._id,
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Password: Password,
            Phone: Phone
        };

        try {
            const response = await axios.put(`http://127.0.0.1:3000/user/updateUser/${PUser._id}`, updatedDaySheet);
            const data = response.data;
            console.log(data);
            setSuccess('Updated Successfully');
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };


    return (<div>


        {success && <span className="error4 animated tada">{success}</span>}
        {error && <span className="error5 animated tada">{error}</span>}

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <span className="iconupdate">
                    <i className="fa fa-user"></i>
                </span>
                <label htmlFor="FirstName">FirstName</label>
                <input
                    type="text"
                    className="form-control"
                    id="FirstName"
                    placeholder={PUser.FirstName}
                    value={FirstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    style={{ width: "20%" }}
                    maxLength={20} 
                />

                <span className="iconupdate2">
                    <i className="fa fa-user"></i>
                </span>
                <label htmlFor="LastName">LastName</label>
                <input
                    type="text"
                    className="form-control"
                    id="LastName"
                    placeholder={PUser.LastName}
                    value={LastName}
                    onChange={(event) => setLastName(event.target.value)}
                    style={{ width: "20%" }}
                    maxLength={20}                 
                />


                <span className="iconupdate3">
                    <i className="fa fa-envelope"></i>
                </span>
                <label htmlFor="Email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="Email"
                    placeholder={PUser.Email}
                    value={Email}
                    onChange={(event) => setEmail(event.target.value)}
                    style={{ width: "20%" }}
                    maxLength={30} 
                />

                <span className="iconupdate4">
                    <i className="fa fa-key"></i>
                </span>
                <label htmlFor="Email">Password</label>
                <input
                    type="Password"
                    className="form-control"
                    id="Password"
                    placeholder="********"
                    value={Password}
                    onChange={(event) => setPassword(event.target.value)}
                    style={{ width: "20%" }}
                    maxLength={20} 
                />

                <span className="iconupdate5">
                    <i className="fa fa-phone"></i>
                </span>
                <label htmlFor="Phone">Phone</label>
                <input
                    type="number"
                    className="form-control"
                    id="Phone"
                    placeholder={PUser.Phone}
                    value={Phone}
                    onChange={(event) => setPhone(event.target.value)}
                    style={{ width: "20%" }}
                    maxLength={8} 
                />
            </div>
            <input type="submit" value="Update" className="updatebtn" />

        </form>




    </div >

    )
}



export default Userinfo;