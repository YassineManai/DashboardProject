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



    const today = new Date();
    const currentYear = today.getFullYear();
    const [Year, setYear] = useState(currentYear);

    const Years = Array.from({ length: 50 }, (v, i) => currentYear - i);

    const handleSelect = (event) => {
        setYear(event.target.value);
        console.log(Year)
    };




    const handleValid = (id) => {
        axios.put(`http://127.0.0.1:3000/monthlysheet/updateMonthlySheet/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                // update MonthlySheet state with the updated data
                setMonthlySheet(prevMsheet => prevMsheet.map((Msheet) => {
                    if (Msheet._id === id) {
                        return res.data;
                    } else {
                        return Msheet;
                    }
                }));
            })
            .catch(error => console.error(error));
    }


    const handlerefuse = (id) => {
        axios.put(`http://127.0.0.1:3000/monthlysheet/updateMonthlySheetFalse/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                // update MonthlySheet state with the updated data
                setMonthlySheet(prevMsheet => prevMsheet.map((Msheet) => {
                    if (Msheet._id === id) {
                        return res.data;
                    } else {
                        return Msheet;
                    }
                }));
            })
            .catch(error => console.error(error));
    }




    useEffect(() => {
      
        fetchMonthlySheet();
    }, [Year, userId]);
   
    const fetchMonthlySheet = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:3000/monthlysheet/allMonthlySheet/${userId}`);
          const data = response.data;
          const filteredData = data.filter(task => (task.Year == Year));
          setMonthlySheet(filteredData);
        } catch (error) {
          console.error(error);
        }
      };
    




    const listMsheet = MonthlySheet.map((Msheet, index) =>
        <MonthlySheetLigneinfo Msheet={Msheet} key={index} onValideMonth={handleValid} onRefuseMonth={handlerefuse} />
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
                <a>
                    <span htmlFor="start">Pick a Date</span> <br></br>
                    <select id="year" className="yearpicker1" value={Year} onChange={handleSelect}>
                        {Years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </a>
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
                                    <th>Statue</th>
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