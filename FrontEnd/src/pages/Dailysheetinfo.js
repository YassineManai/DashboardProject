import axios from "axios"

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Daily from "../secondary -components/Daily";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const DailySheetinfo = () => {

    const { DsheetId } = useParams();
    console.log(DsheetId)
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const exactDay = queryParams.get('Date');
    const [loading, setLoading] = useState(true);
    const [Dsheet, setDsheet] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {

        fetchDailySheet()
    }, [DsheetId]);

    const fetchDailySheet = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/DailySheet/Daily/${DsheetId}`);
            const data = response.data;
            console.log(data);
            setDsheet(data);


            setLoading(false); // set loading to false after receiving response
        } catch (error) {
            console.error(error);
        }
    };


    const Profile = () => {

        navigate('/ProfileUser');
    }
    const Home = () => {
        console.log("aaaa")
        navigate('/User');
    }



    const Day = Dsheet.map((DDay, index) =>
        <Daily DDay={DDay} key={index} />
    )

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
               <div className="LogoSBS">
               <img src={require('../assets/sbs.png')} onClick={Home} width="9%" style={{
                    cursor: "pointer"
                }} />
               </div>

                <div className="Userinfo">
                    <img src={require('../assets/User.png')} onClick={Profile} width="7.5%" height="6%" style={{
                        cursor: "pointer"
                    }} /> 

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
                                }}> {exactDay}</span> </h3>

                            </div>

                            <div className="table-wrapper" style={{
                                position: "absolute",
                                top: "15%",
                                left: "2%",
                                width: "97%"

                            }}>
                                <div className="table-data">
                                    <div className="order">


                                        {Day}



                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>



                </div>

            </div>






































        </div>
    )
}
export default DailySheetinfo