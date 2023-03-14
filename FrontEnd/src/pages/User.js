import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from "react"

/*
function getUserIdFromToken(token) {
  const decodedToken = jwt.verify(token, '123456789'); // Replace 'secret' with your actual secret key
  return decodedToken.userId;
}*/


const User = () => {
  const [Date, setDate] = useState('')
  const [TypeJ, setTypeJ] = useState('')
  const [ProjectName, setProjectName] = useState('')
  const [Task, setTask] = useState('')
  const [Timed, setTimed] = useState('')
  const [TimeF, setTimeFinsih] = useState("");
  const [Location, setLocation] = useState("");
  const [VehiclePrice, setVehiclePrice] = useState("");
  const [error, setError] = useState("");


  //const userToken = localStorage.getItem('token'); // Get user token from local storage
  //const userId = getUserIdFromToken(userToken); // Get user ID from token (implement this function)

  const handleSubmit = e => {
    e.preventDefault();

    // Make API request
    axios.post(`http://127.0.0.1:3000/dailysheet/CreateDailySheet/${userId}`, {
      Date,
      TypeJ,
      ProjectName,
      Timed,
      TimeF,
      Task,
      Location,
      VehiclePrice
    }, {
      headers: {
        Authorization: `Bearer ${userToken}` // Include user token in header
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
      </div >


      <div className="animated bounceInDown">
        <div className="container1">
          {error && <span className="error animated tada">{error}</span>}

          <form name="form1" className="box" id="login" method="post" onSubmit={handleSubmit}  >
            <h4>Smart <span>Business Solution</span></h4>
            <img width="30%" src="sbs.png"></img>
            <h5>HELLO USER.</h5>
            <input
              type="text"
              name="Date"
              id="Date"
              value={Date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
              autoComplete="off"
            />
            <i className="typcn typcn-eye" ></i>

            <input
              type="text"
              name="lastName"
              id="tTypeJ"
              value={TypeJ}
              onChange={(e) => setTypeJ(e.target.value)}
              placeholder="TypeJ"
              autoComplete="off"
            />
            <i className="typcn typcn-eye" ></i>
            <input
              type="text"
              name="ProjectName"
              id="ProjectName"
              value={ProjectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="ProjectName"
              autoComplete="off"
            />
            <i className="typcn typcn-eye" ></i>
            <input
              type="text"
              name="Task"
              id="Task"
              value={Task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Task"
              autoComplete="off"
            />

            <i className="typcn typcn-eye" ></i>
            <input
              type="text"
              name="Timed"
              id="Timed"
              value={Timed}
              onChange={(e) => setTimed(e.target.value)}
              placeholder=" Timed"
              autoComplete="off"
            />
            <i className="typcn typcn-eye" ></i>
            <input
              type="text"
              name="TimeF"
              id="TimeF"
              value={TimeF}
              onChange={(e) => setTimeFinsih(e.target.value)}
              placeholder="TimeF"
              autoComplete="off"
            />
            <i className="typcn typcn-eye" ></i>
            <input
              type="text"
              name="Location"
              id="Location"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              autoComplete="off"
            />
            <i className="typcn typcn-eye" ></i>
            <input
              type="text"
              name="VehicultePrice"
              id="VehiclePrice"
              value={VehiclePrice}
              onChange={(e) => setVehiclePrice(e.target.value)}
              placeholder="VehiclePrice"
              autoComplete="off"
            />
            <i className="typcn typcn-eye" ></i>


            <input type="submit" value="Sign Up" className="btn2" />


          </form>

          <Link to="/" > <a className="dnthave">You have an account?  Log in </a></Link>
        </div>

      </div>





    </div>

  );
};
export default User
