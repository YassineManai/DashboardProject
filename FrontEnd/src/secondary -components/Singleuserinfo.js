import React from "react";
import axios from "axios";
import '../componentsCss/alluser.css'
import { useNavigate } from 'react-router-dom';


const Userligneinfo = ({ user }) => {
    const navigate = useNavigate();

    const handleMonthlySheetClick = () => {
        navigate(`/Dash/PMsheet/${user.Id}?firstName=${user.FirstName}&lastName=${user.LastName}`);
    };

    return (<div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>

                    <td > <img src={require('../assets/UserIcon.png')} style={{ position: 'absolute', left: '1%', marginTop: '-12px' }} ></img>{user.FirstName}</td>
                    <td>{user.LastName}</td>
                    <td>{user.Email}</td>
                    <td>{user.Phone}</td>

                    <td> <button class="button-26" role="button" onClick={handleMonthlySheetClick} >Monthy Sheet</button></td>





                </tbody>


            </table>
        </div>





    </div >

    )
}



export default Userligneinfo;