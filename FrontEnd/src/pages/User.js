import { Link, Navigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react";
import jwtDecode from 'jwt-decode';
import MonthCard from "../secondary -components/MonthCard";
import MonthlySheetLigneinfo from "../secondary -components/singleMonthlysheet";
function getUserIdFromToken(token) {
  try {
    const decodedToken = jwtDecode(token);

    return decodedToken._id;

  } catch (error) {
    console.log(error);
    return null;
  }
}
function getUserName(token) {
  try {
    const decodedToken = jwtDecode(token);

    return decodedToken.FirstName;

  } catch (error) {
    console.log(error);
    return null;
  }
}



const User = () => {

  const [date, setdate] = useState('')
  const [TypeJ, setTypeJ] = useState('')
  const [ProjectName, setProjectName] = useState('')
  const [Task, setTask] = useState('')
  const [Timed, setTimed] = useState('')
  const [TimeF, setTimeFinsih] = useState("");
  const [Location, setLocation] = useState("");
  const [VehiclePrice, setVehiclePrice] = useState("");
  const [error, setError] = useState("");



  const userToken = localStorage.getItem('token');
  const userId = getUserIdFromToken(userToken);
  const Username = getUserName(userToken)
  const [MonthlySheet, setMonthlySheet] = useState([]);
  const [show, setshow] = useState(false);

  const today = new Date();
  const currentYear = today.getFullYear();
  const [Year, setYear] = useState(currentYear);

  const Years = Array.from({ length: 50 }, (v, i) => currentYear - i);





  const handleSelect = (event) => {
    setYear(event.target.value);
    console.log(Year)
  };

  useEffect(() => {
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
    fetchMonthlySheet();
  }, [userId, Year]);




  const handleSubmit = e => {
    e.preventDefault();

    // Make API request
    axios.post(`http://127.0.0.1:3000/dailysheet/CreateDailySheet/${userId}`, {
      Date,
      TypeJ,
      ProjectName,
      Task,
      Timed,
      TimeF,

      Location,
      VehiclePrice
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Include user token in header
      }
    })
      .then((response) => {
        setError('Signup successful! Please log in');
        window.location.href = '/';
        console.log(response);
        // Handle successful signup
      })
      .catch((error) => {
        console.log(error);
        setError('An error occurred, please try again');
      });
  }










  const listMsheet = MonthlySheet.map((Msheet) => (
    <MonthCard key={Msheet._id} Msheet={Msheet} />
  ));











  return (
    <div>











      <div className={show ? "box-1" : "box-2"}>

        <div className="animated bounceInDown">
          <div className="container3">
            {error && <span className="error animated tada">{error}</span>}

            <form name="form1" className=" myForm box" id="login" method="post" onSubmit={handleSubmit}  >
              

            
              <fieldset id="customer">
                <input
                  type="text"
                  name="Date"
                  id="Date"


                  placeholder="Date"
                  autoComplete="off"
                />

                <input
                  type="text"
                  name="Date"
                  id="Date"


                  placeholder="Date"
                  autoComplete="off"
                />
                <input
                  type="text"
                  name="Date"
                  id="Date"


                  placeholder="Date"
                  autoComplete="off"
                />
              </fieldset>

              <fieldset id="taxi">
               

                <input
                  type="Date"
                  name="Date"
                  id="Date"
                  placeholder="Date"
                  autoComplete="off"
                />
                <input
                  type="text"
                  name="Date"
                  id="Date"
                  placeholder="Date"
                  autoComplete="off"
                />
              </fieldset>

              <fieldset id="extras">
                <input
                  type="text"
                  name="Date"
                  id="Date"
                  placeholder="Date"
                  autoComplete="off"
                />
              </fieldset>

              <fieldset id="pickup">
                <label for="pickup_time">Pickup Date/Time</label>
                <input type="date" name="pickup_time" id="pickup_time" required />

                <label for="pickup_place">Pickup Place</label>
                <select name="pickup_place" id="pickup_place">
                  <option value="" selected="selected">Select One</option>
                  <option value="office" >Taxi Office</option>
                  <option value="town_hall" >Town Hall</option>
                  <option value="telepathy" >We'll Guess!</option>
                </select>
              </fieldset>

              <fieldset id="dropoff">
                <label for="dropoff_place">Dropoff Place</label>
                <input type="text" name="dropoff_place" id="dropoff_place" required list="destinations" />

                <datalist id="destinations">
                  <option value="Airport" />
                  <option value="Beach" />
                  <option value="Fred Flinstone's House" />
                </datalist>
              </fieldset>

              <fieldset id="instructions">
                <label for="comments">Special Instructions</label>
                <textarea name="comments" id="comments" maxlength="500"></textarea>
              </fieldset>

              <button id="submit">Submit Booking</button>

            </form>

            <Link to="/" > <a className="dnthave">You have an account?  Log in </a></Link>
          </div>


        </div>
      </div>



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

        <div className={show ? " blur  container2" : "container2"}>
          <button class="button-30" onClick={() => { setshow(!show) }} role="button">Add Dailysheet</button> <br></br>
          <button class="button-30" role="button">Add Off day</button>

          <div className="Datepicker">
            <label htmlFor="year">Select Year:</label>
            <select id="year" className="yearpicker" value={Year} onChange={handleSelect}>
              {Years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="ft-recipe">
            {listMsheet}
          </div>



        </div>

      </div>





    </div>

  );
};
export default User
