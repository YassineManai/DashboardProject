import axios from "axios"

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Userinfo from "../secondary -components/UserInfo";
import { useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

function getUserIdFromToken(token) {
    try {
        const decodedToken = jwtDecode(token);

        return decodedToken._id;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const ProfileUser = () => {

    const userToken = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [Profile, setProfile] = useState([]);
    const userId = getUserIdFromToken(userToken);


    useEffect(() => {

        fetchProfile()
    }, [userId]);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/user/User/${userId}`);
            const data = response.data;
            console.log(data);
            setProfile(data);


            setLoading(false); // set loading to false after receiving response
        } catch (error) {
            console.error(error);
        }
    };
    const navigate = useNavigate();
    const Home = () => {

        navigate('/User');
    }


    const Profil = Profile.map((PUser, index) =>
        <Userinfo PUser={PUser} key={index} />
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
                                }}> Profile<br></br>  <span style={{
                                    color
                                        : "white"
                                }}> Edit Profile</span> </h3>

                            </div>

                            <div className="table-wrapper" style={{
                                position: "absolute",
                                top: "15%",
                                left: "2%",
                                width: "97%"

                            }}>
                                <div className="table-data">
                                    <div className="order">


                                        {Profil}



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
export default ProfileUser