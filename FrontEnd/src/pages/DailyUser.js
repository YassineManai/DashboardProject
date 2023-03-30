
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react";
import jwtDecode from 'jwt-decode';

import { useParams } from 'react-router-dom';

import DailySheetLigneinfo from "../secondary -components/singleDailySheet";

import { useLocation } from 'react-router-dom';



function getUserName(token) {
    try {
        const decodedToken = jwtDecode(token);

        return decodedToken.FirstName;

    } catch (error) {
        console.log(error);
        return null;
    }
}



const DailyUser = () => {
    //DailySheet Form : 

    const userToken = localStorage.getItem('token');


    const Username = getUserName(userToken)

    const { MsheetId } = useParams();

    const [DailySheet, setDailySheet] = useState([]);
    const { search } = useLocation();

    const queryParams = new URLSearchParams(search);
    const Month = queryParams.get('Month');
    




    useEffect(() => {
        if (MsheetId) {
            fetchDailySheet();
        }
    }, [MsheetId]);

    const fetchDailySheet = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/dailySheet/allDailySheet/${MsheetId}`);
            setDailySheet(response.data);
        } catch (error) {
            console.error(error);
        }
    };






    const listDsheet = DailySheet.map((Dsheet, index) =>
        <DailySheetLigneinfo Dsheet={Dsheet} key={index} />
    )

    if (!MsheetId) {
        return (
            <div>
                <p>No user ID provided.</p>
            </div>
        )
    }










    return (
        <div>




            <div className="area" >
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <img src={require('../assets/sbs.png')} width="9%" />
                <div className="Userinfo">
                    <div className="Username">Hello ! {Username}</div>
                    <img src={require('../assets/User.png')} width="7.5%" height="6%" />


                </div>

            </div >



            <div className=" animated bounceInDown" >

                <div className="container2">



                    <div className="table-data">
                        <div className="order">
                            <div className="Username">
                                <h3 style={{
                                    color: "#234b9a", fontSize: "30px"
                                }}> DailySheet Sheet<br></br>  <span style={{
                                    color
                                        : "white"
                                }}> {Month}</span> </h3>

                            </div>

                            <div className="table-wrapper" style={{
                                position: "absolute",
                                top: "15%",
                                left: "2%",
                                width:"97%"
                             
                            }}>
                                <table className="fl-table">
                                    <thead >
                                        <tr>
                                            <th style={{background:"#234b9a"}}>Date</th>
                                            <th style={{background:"#234b9a"}}>Type of Day </th>
                                            <th style={{background:"#234b9a"}}>Project Name</th>
                                            <th style={{background:"#234b9a"}}>Task</th>
                                            <th style={{background:"#234b9a"}}>Time Start</th>
                                            <th style={{background:"#234b9a"}}>Time Finish</th>
                                            <th style={{background:"#234b9a"}}>Location</th>
                                            <th style={{background:"#234b9a"}}>VehiclePrice</th>



                                        </tr>
                                    </thead>
                                </table>
                                <div className='ligne1' style={{maxheight: "700px"}}>
                                    {listDsheet}
                                </div>

                            </div>



                        </div>
                    </div>



                </div>

            </div>





        </div >

    );
};
export default DailyUser

