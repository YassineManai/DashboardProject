import axios from "axios"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import MonthlySheetLigneinfo from "../secondary -components/singleMonthlysheet";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const PMonthlysheet = () => {
    const { userId } = useParams();
   
    const [MonthlySheet, setMonthlySheet] = useState([]);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const firstName = queryParams.get('firstName');
    const lastName = queryParams.get('lastName');








    useEffect(() => {
        if (userId) {
            fetchMonthlySheet();
        }
    }, [userId]);

    const fetchMonthlySheet = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/monthlysheet/allMonthlySheet/${userId}`);
            setMonthlySheet(response.data);
        } catch (error) {
            console.error(error);
        }
    };






    const listMsheet = MonthlySheet.map((Msheet, index) =>
        <MonthlySheetLigneinfo Msheet={Msheet} key={index} />
    )

    if (!userId) {
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
                    <h1>MonthlySheet</h1>
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
                        <li>
                            <a class="active" href="#">MonthlySheet</a>
                        </li>
                    </ul>
                </div>
            </div>




            <div className="table-data">
                <div className="order">
                    <div className="head">
                        <h3> Monthly Sheet of User : {firstName} {lastName} </h3>
                        <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i>
                    </div>
                    <div className="table-wrapper">
                        <table className="fl-table">
                            <thead >
                                <tr>
                                    <th>Month</th>
                                    <th>Year</th>
                                    <th>NbrJTrav</th>
                                    <th>NbrJConge</th>
                                    <th>NbrJFeries</th>
                                    <th>NbrHours</th>
                                    <th>Details</th>
                                   

                                </tr>                              
                            </thead>
                        </table>
                        <div className='ligne1'>
                            {listMsheet}
                        </div>

                    </div>



                </div>
            </div>




        </div>
    )
}
export default PMonthlysheet