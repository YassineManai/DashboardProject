
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react";
import jwtDecode from 'jwt-decode';
import MonthCard from "../secondary -components/MonthCard";
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
  //DailySheet Form : 
  const [date, setdate] = useState('')
  console.log(date)
  const [ProjectName, setProjectName] = useState('')
  const [Task, setTask] = useState('')
  const [Timed, setTimed] = useState('')
  const [TimeF, setTimeFinsih] = useState("");
  const [Location, setLocation] = useState("");
  const [VehiclePrice, setVehiclePrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [Projects, setProjects] = useState([]);
  const [pickupPlace, setPickupPlace] = useState("");











  //Extract UserId  from token : 

  const userToken = localStorage.getItem('token');

  const userId = getUserIdFromToken(userToken);
  const Username = getUserName(userToken)
  const [MonthlySheet, setMonthlySheet] = useState([]);
  const [TypeJ, setTypeJ] = useState([]);
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(false);

  const today = new Date();
  const currentYear = today.getFullYear();
  const [Year, setYear] = useState(currentYear);

  const Years = Array.from({ length: 50 }, (v, i) => currentYear - i);



  console.log(date)
  const handleSelect = (event) => {
    setYear(event.target.value);
    console.log(Year)
  };

  useEffect(() => {

    axios.get('http://127.0.0.1:3000/project/allprojects')
      .then((res) => {
        const filteredProjects = res.data.filter(project => project.Status === false);
        setProjects(filteredProjects);
        console.log(filteredProjects)
      })
      .catch(error => console.error(error));


    fetchMonthlySheet();


  }, [userId, Year]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('');
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess('');
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }


  }, [error, success]);

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


  const handleSubmitCongé = e => {
    e.preventDefault();

    // Make API request
    axios.post(`http://127.0.0.1:3000/dailysheet/CreateDailySheeto/${userId}`, {
      date,
      TypeJ,
      ProjectName,
      Task,
      Timed: "0",
      TimeF: "0",
      Location,
      VehiclePrice
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Include user token in header
      }
    })
      .then((response) => {
        setError('Task saved');
        setdate('');
        setTypeJ('')
        fetchMonthlySheet();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setError('An error occurred, please try again');
      });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !ProjectName || !Task || !Timed || !TimeF || !Location) {
      setError('Please fill out all fields');


      return;
    }


    const existingDailySheet = await axios.get(`http://127.0.0.1:3000/dailysheet/GetDailySheet/${userId}/${date}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Include user token in header
      }
    });

    if (existingDailySheet.data) {
      setError('A daily sheet  already exists');
      return;
    }


    // Make API request
    axios.post(`http://127.0.0.1:3000/dailysheet/CreateDailySheet/${userId}`, {
      date,
      TypeJ: "Working",
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
        setSuccess('Task saved');
        setdate('');
        setProjectName('');
        setTask('');
        setTimed('');
        setTimeFinsih('');
        setLocation('');
        setVehiclePrice('');
        fetchMonthlySheet();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setError('An error occurred, please try again');
      });
  }
  console.log(ProjectName)

  const listMsheet = MonthlySheet.map((Msheet) => (
    <MonthCard key={Msheet._id} Msheet={Msheet} />
  ));


  const handleProjectChange = (e) => {
    setProjectName(e.target.value);

  }

  const handlePickupPlaceChange = (event) => {
    setPickupPlace(event.target.value);
  };

  const handleOptionChange = (event) => {
    setTypeJ(event.target.value);
  };
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }
  const Profile = () => {

    navigate('/ProfileUser');
  }
  const Home = () => {
    console.log("yo")
    navigate('/User');
  }


  return (
    <div>

      <div className={show ? "box-1" : "box-2"}>

        <div className="animated bounceInDown">
          <div className="container3">
            <img src={require('../assets/close.png')} width="6%" height="6%" className="close" onClick={() => { setshow(!show); setSuccess(''); setError('') }} />
            <div className="daily">
              <h4 style={{ color: "#234b9a", fontSize: "20px", fontFamily: "'Source Sans Pro', sans-serif" }}>Smart <span style={{ color: "#dfdeee" }}>Business Solution</span></h4>
              <img width="300px" src="sbs.png"></img>

            </div>
            {success && <span className="error3 animated tada">{success}</span>}
            {error && <span className="error animated tada">{error}</span>}

            <form name="form1" className=" myForm box" id="login" method="post" onSubmit={handleSubmit}  >



              <fieldset id="customer">
                <label for="pickup_time">Pickup Date/Time</label>
                <input
                  class="datepicker-here form-control"
                  type="date"
                  name="Date"
                  id="Date"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                  placeholder="Date"
                  autoComplete="off"

                />



              </fieldset>

              <fieldset id="taxi" style={{ height: "80%" }}>
                <span className="icon1">
                  <i className="fa fa-home"></i>
                </span>
                <label for="pickup_time">Location</label>
                <input
                  type="text"
                  name="Location"
                  id="Location"
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="..."
                  autoComplete="off"
                  style={{ height: "50px" }}
                />
              </fieldset>



              <fieldset id="pickup">
                <label for="pickup_time">Select Project</label>
                <select name="pickup_place" id="pickup_place" onChange={handleProjectChange} class="datepicker-here form-control" >
                  <option value="" selected disabled>Select Project </option>
                  {Projects.map(project => (
                    <option key={project._id} value={project.ProjectName} >{project.ProjectName}</option>
                  ))}
                </select>

                <label for="pickup_time">Location</label>
                <select name="pickup_place" id="pickup_place" onChange={handlePickupPlaceChange} class="datepicker-here form-control" >
                  <option value="" selected disabled>Select Vehicle</option>
                  <option value="office">Taxi</option>
                  <option value="town_hall">Voiture Privé</option>
                </select>

              </fieldset>

              <fieldset id="dropoff" style={{ height: "98%" }}>
                <label for="pickup_time">Start Time</label>
                <input
                  class="datepicker-here form-control"
                  type="time"
                  name="Timed"
                  id="Timed"
                  value={Timed}
                  onChange={(e) => setTimed(e.target.value)}
                  placeholder=" Timed"
                  autoComplete="off"
                />
                <label for="pickup_time">Finish Time</label>
                <input
                  class="datepicker-here form-control"
                  type="time"
                  name="TimeF"
                  id="TimeF"
                  value={TimeF}
                  onChange={(e) => setTimeFinsih(e.target.value)}
                  placeholder="TimeF"
                  autoComplete="off"
                  style={{ marginTop: "12px" }}
                />


              </fieldset>

              <fieldset id="instructions">
                {pickupPlace === "office" && (
                  <><span className="icon3">
                    <i className="fa fa-taxi"></i>
                  </span><input
                      type="text"
                      name="vehicle_price"
                      id="vehicle_price"
                      value={VehiclePrice}
                      onChange={(e) => setVehiclePrice(e.target.value)}
                      placeholder="Vehicle Price"
                      autoComplete="off" /></>
                )}
                <span className="icon3">
                  <i className="fa fa-tasks"></i>
                </span>
                <input
                  type="text"
                  name="Task"
                  id="Task"
                  value={Task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Task"
                  autoComplete="off"
                />


              </fieldset>

              <input type="submit" value="Done" className="btn3" />

            </form>


          </div>


        </div>
      </div>






      <div className={show1 ? "box-1" : "box-2"}>

        <div className="animated bounceInDown">

          <div className="animated bounceInDown">
            <div className="container">
              <img src={require('../assets/close.png')} width="10%" height="8%" className="close" onClick={() => { setshow1(!show1) }} />
              {success && <span className="error animated tada">{success}</span>}
              {error && <span className="error6 animated tada">{error}</span>}

              <span className="error animated tada" id="msg"></span>

              <form name="form1" className="box" onSubmit={handleSubmitCongé} >
                <h4>Smart <span>Business Solution</span></h4>
                <img width="30%" src={require('../assets/sbs.png')}></img>
                <h5>Add Day Off</h5>


                <input
                  class="datepicker-here form-control"
                  type="date"
                  name="Date"
                  id="Date"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                  placeholder="Date"
                  autoComplete="off"
                  style={{ width: "80%" }}

                />
                <div className="radiob">
                  <label for="html" style={{ marginLeft: "15px" }}>DayOff</label><br></br>
                  <input
                    type="radio"
                    id="DayOff"
                    name="option"
                    value="DayOff"
                    checked={TypeJ === "DayOff"}
                    onChange={handleOptionChange}
                  />
                </div>
                <div className="radiob">
                  <label for="html" style={{ marginLeft: "15px" }}>Holiday</label><br></br>
                  <input
                    type="radio"
                    id="Holiday"
                    name="option"
                    value="Holiday"
                    checked={TypeJ === "Holiday"}
                    onChange={handleOptionChange}
                  />
                </div>


                <input type="submit" value="Done" className="btn2" />

              </form>

            </div>

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

        <img src={require('../assets/sbs.png')} width="9%" style={{
          cursor: "pointer"
        }} />



        <div className="Userinfo">
          <div className="Username">Hello ! {Username}</div>
          <img src={require('../assets/User.png')} onClick={Profile} width="7.5%" height="6%" style={{
            cursor: "pointer"
          }} />


        </div>

      </div >



      <div className=" animated bounceInDown" >

        <div className={show || show1 ? " blur  container2" : "container2"}>
          <img src={require('../assets/Logout.png')} onClick={logout} style={{
            position: "absolute",
            left: "3%",
            top: "3%",
            height: "60px",
            cursor: "pointer"

          }} />
          <button class="button-30" onClick={() => { setshow(!show) }} role="button">Add Dailysheet</button> <br></br>
          <button class="button-30" onClick={() => { setshow1(!show1) }} role="button">Add Off day</button>

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





    </div >

  );
};
export default User

