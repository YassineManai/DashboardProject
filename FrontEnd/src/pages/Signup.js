import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from "react"


const SignUp = () => {
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Email, setEmail] = useState('')
  const [Phone, setPhone] = useState('')
  const [Password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Form validation
    if (!FirstName || !LastName || !Email || !Phone || !Password || !confirmPassword) {
      setError("Please fill out all fields");
      return;
    }
    if (Password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }




    // Handle validations

    // Make API request
    axios
      .post("http://127.0.0.1:3000/user/Signup", {
        FirstName,
        LastName,
        Email,
        Phone,
        Password,
      })
      .then((response) => {
        setError("Signup successful! Please log in");
        window.location.href = '/'
        console.log(response);
        // Handle successful signup
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred, please try again");
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

          <form name="form1" className="box" id="login" method="post" onSubmit={handleSubmit} >
            <h4>Smart <span>Business Solution</span></h4>
            <img width="30%" src="sbs.png"></img>
            <h5>SignUp to your account.</h5>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              autoComplete="off"
            />
            <i className="typcn typcn-eye" ></i>

            <input
              type="text"
              name="lastName"
              id="lastName"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              autoComplete="off"
            />
            <i className="typcn typcn-eye" ></i>
            <input
              type="text"
              name="email"
              id="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="off"
            />
            <i className="typcn typcn-eye" ></i>



            <input
              type="text"
              name="phone"
              id="phone"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              autoComplete="off"
            />

            <input
              type="password"
              name="password"
              id="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="off"
            />


            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
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
export default SignUp 
