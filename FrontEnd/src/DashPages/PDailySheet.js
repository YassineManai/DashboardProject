import axios from "axios"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

import DailySheetLigneinfo_Admin from "../secondary -components/SingleDailySheet_Admin";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const PDailySheet = () => {
    const { MsheetId } = useParams();

    const [DailySheet, setDailySheet] = useState([]);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const User = queryParams.get('User');
    const Name = queryParams.get('Name');
    const [loading, setLoading] = useState(true);

console.log(Name)
console.log(User)





    useEffect(() => {
        if (MsheetId) {
            fetchDailySheet();
        }
    }, [MsheetId]);

    const fetchDailySheet = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/dailySheet/allDailySheet/${MsheetId}`);
            setDailySheet(response.data);
            setLoading(false); // set loading to false after receiving response
        } catch (error) {
            console.error(error);
        }
    };

    DailySheet.sort((a, b) => new Date(a.date) - new Date(b.date));




    const listDsheet = DailySheet.map((Dsheet, index) =>
        <DailySheetLigneinfo_Admin Dsheet={Dsheet} key={index} />
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




            {
                loading ? (<span className="loader" > </span >)
                    : (
                        <>


                            <div class="head-title">
                                <div class="left">
                                    <h1>DailySheet</h1>
                                    <ul class="breadcrumb">
                                        <li>
                                            <a href="#">Dashboard</a>
                                        </li>
                                        <li><i class='bx bx-chevron-right' ></i></li>

                                        <Link to="/Dash/PUsers">
                                            <li>
                                                <a>Users</a>
                                            </li>

                                        </Link>
                                        <li><i class='bx bx-chevron-right' ></i></li>
                                        <Link to={`/Dash/PMsheet/${User}`}>
                                            <li>
                                                <a>MonthlySheet</a>
                                            </li>

                                        </Link>
                                        <li><i class='bx bx-chevron-right' ></i></li>
                                        <li>
                                            <a class="active" href="#">DailySheet</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>




                            <div className="table-data">
                                <div className="order">
                                    <div className="head">
                                        <h3> DailySheet Sheet {Name} </h3>
                                        <i className='bx bx-search' ></i>
                                        <i className='bx bx-filter' ></i>
                                    </div>
                                    <div className="table-wrapper">
                                        <table className="fl-table">
                                            <thead >
                                                <tr>
                                                    <th style={{background:"#144CCC"}}>Date</th>
                                                    <th style={{background:"#144CCC"}}>Type of Day </th>
                                                    <th style={{background:"#144CCC"}}>Project Project Name</th>
                                                    <th style={{background:"#144CCC"}}>Task</th>
                                                    <th style={{background:"#144CCC"}}>Time Start</th>
                                                    <th style={{background:"#144CCC"}}>Time Finish</th>
                                                    <th style={{background:"#144CCC"}}>Location</th>
                                                    <th style={{background:"#144CCC"}}>VehiclePrice</th>
                                                   


                                                </tr>
                                            </thead>
                                        </table>
                                        <div className='ligne1'>
                                            {listDsheet}
                                        </div>

                                    </div>



                                </div>
                            </div>


                        </>


                    )}

        </div >
    )
}
export default PDailySheet