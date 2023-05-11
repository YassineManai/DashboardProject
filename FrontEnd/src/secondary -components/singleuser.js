import React from "react";
import axios from "axios";
import '../componentsCss/alluser.css'
import { useNavigate } from 'react-router-dom';


const Userligne = ({user, onDeleteUser }) => {


    const navigate = useNavigate();



    const handleDeleteClick = () => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
          onDeleteUser(user._id);
        }
   
    }
    const handleDailySheetClick = () => {
       
        navigate(`/Dash/PDsheet/${user.MonthlySheetid}?User=${user._id}&Name= : ${user.FirstName} ${user.LastName} `);


    };
    return (<div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>
              
                <td > <img src={require('../assets/UserIcon.png')} style={{ position: 'absolute', left: '1%', marginTop: '-12px' }} ></img>{user.FirstName}</td>
                  
                    <td>{user.Email}</td>
                  <td onClick={handleDailySheetClick} style={{cursor:'pointer'}}>  {user.Lastadd ? user.Lastadd.substring(0, 10) : "Not Avaiable"}</td>
                   
                    <td> 
                    <div class="tooltip-container">
                    <img style={{cursor : 'pointer'}} src={require('../assets/deleteUser.png')}  className="trash" onClick={handleDeleteClick}></img> 
                                <span class="tooltip-text">Delete</span>
                            </div>
                        
                       </td>
                  


                </tbody>

            </table>
        </div>





    </div >

    )
}



export default Userligne;