import React from "react";
import axios from "axios";
import '../componentsCss/alluser.css'
import { useNavigate } from 'react-router-dom';

const MonthlySheetLigneinfo = ({ Msheet }) => {

    const navigate = useNavigate();
    
    const handleDailySheetClick = () => {
      navigate(`/Dash/PDsheet/${Msheet._id}?User=${Msheet.UserId}`);
      console.log(Msheet.Id)
   
    };

    return (<div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>

                    <td >{Msheet.Month}</td>
                    <td >{Msheet.Year}</td>
                    <td >{Msheet.NbrJTrav}</td>
                    <td >{Msheet.NbrJConge}</td>
                    <td >{Msheet.NbrJFeries}</td>
                    <td>{Msheet.NbrHours}</td>
                    <td> <img src={require('../assets/valide.png')} height={"15px"} className="trash"></img>
                        <img src={require('../assets/refuse.png')} height={"45px"} ></img>
                        <img src={require('../assets/info.png')} height={"15px"}  onClick={handleDailySheetClick} className="trash" ></img> 
                    </td>





                </tbody>


            </table>
        </div>





    </div >

    )
}



export default MonthlySheetLigneinfo;