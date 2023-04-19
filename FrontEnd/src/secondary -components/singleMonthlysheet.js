import React from "react";
import axios from "axios";
import '../componentsCss/alluser.css'
import { useNavigate } from 'react-router-dom';

const MonthlySheetLigneinfo = ({ Msheet, onValideMonth, onRefuseMonth }) => {

    const navigate = useNavigate();

    const handleDailySheetClick = () => {
        navigate(`/Dash/PDsheet/${Msheet._id}?User=${Msheet.UserId}`);
        console.log(Msheet.Id)

    };
    const handleMonthClick = () => {
        onValideMonth(Msheet._id);
    }
    const handleMonthClickrefuse = () => {
        onRefuseMonth(Msheet._id);
    }
    


    return (
    <div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>

                    <td ><img src={require('../assets/canlandar.png')} style={{ position: 'absolute', left: '1%', marginTop: '-12px' }} ></img> {Msheet.Month}</td>
                    <td >{Msheet.Year}</td>
                    <td >{Msheet.NbrJTrav}</td>
                    <td >{Msheet.NbrJConge}</td>
                    <td >{Msheet.NbrJFeries}</td>
                    <td>{Msheet.NbrHours}</td>
                    <td>{Msheet.Status ? <img src={require('../assets/valideS.png')} height={"15px"} className="trash"></img> : <img src={require('../assets/refuseS.png')} height={"15px"} className="trash"></img>}</td>
                    <td> <img src={require('../assets/Approve.png')} height={"15px"} className="trash" onClick={handleMonthClick}></img>
                        <img src={require('../assets/unvalide.png')} height={"41px"} onClick={handleMonthClickrefuse}></img>
                        <img src={require('../assets/information.png')} height={"15px"} onClick={handleDailySheetClick} className="trash" ></img>
                    </td>





                </tbody>


            </table>
        </div>





    </div >

    )
}



export default MonthlySheetLigneinfo;