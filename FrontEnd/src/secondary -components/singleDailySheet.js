import React from "react";
import axios from "axios";
import '../componentsCss/alluser.css'


const DailySheetLigneinfo = ({ Dsheet }) => {


    
    return (<div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>

                    <td >{Dsheet.Date.substring(0,10)}</td>
                    <td >{Dsheet.TypeJ}</td>
                    <td >{Dsheet.ProjectName}</td>
                    <td >{Dsheet.Task}</td>
                    <td >{Dsheet.Timed}</td>
                    <td >{Dsheet.TimeF}</td>
                    <td >{Dsheet.Location}</td>
                    <td >{Dsheet.VehiclePrice}DT</td>
                   
                </tbody>


            </table>
        </div>





    </div >

    )
}



export default DailySheetLigneinfo;