import axios from "axios"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import DailySheetLigneinfo from "../secondary -components/singleDailySheet";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const PDailySheet = () => {
    const { MsheetId } = useParams();

    const [DailySheet, setDailySheet] = useState([]);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const User = queryParams.get('User');









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
                        <h3> DailySheet Sheet  </h3>
                        <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i>
                    </div>
                    <div className="table-wrapper">
                        <table className="fl-table">
                            <thead >
                                <tr>
                                    <th>Date</th>
                                    <th>Type of Day </th>
                                    <th>Project Project Name</th>
                                    <th>Task</th>
                                    <th>Time Start</th>
                                    <th>Time Finish</th>
                                    <th>Location</th>
                                    <th>VehiclePrice</th>
                                    
                                   

                                </tr>                              
                            </thead>
                        </table>
                        <div className='ligne1'>
                            {listDsheet}
                        </div>

                    </div>



                </div>
            </div>




        </div >
    )
}
export default PDailySheet