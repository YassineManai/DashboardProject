import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react";


const SignUp = () => {
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Email, setEmail] = useState('')
  const [Phone, setPhone] = useState('')
  const [Password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);



  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }








  const [success, setSuccess] = useState("");



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
        setSuccess("Signup successful! Please log in");
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
          {success && <span className="error3 animated tada">{success}</span>}
          {error && <span className="error animated tada">{error}</span>}

          <form name="form1" className="box" id="login" method="post" onSubmit={handleSubmit} >
            <h4>Smart <span>Business Solution</span></h4>
            <img width="30%" src="sbs.png"></img>
            <h5>SignUp to your account.</h5>
            <span className="icon">
              <i className="fa fa-user"></i>
            </span>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              autoComplete="off"
              maxLength={20} // maximum 20 characters
            />
            <span className="icon">
              <i className="fa fa-user"></i>
            </span>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              autoComplete="off"
              maxLength={20} // maximum 20 characters
            />
            <span className="icon">
              <i className="fa fa-envelope"></i>
            </span>
            <input
              type="text"
              name="email"
              id="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="off"
              maxLength={30} // maximum 20 characters
            />


            <span className="icon">
              <i className="fa fa-phone"></i>
            </span>

            <input
              type="text"
              name="phone"
              id="phone"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              autoComplete="off"
              maxLength={8} // maximum 20 characters
            />
            <span className="icon">
              <i className={showPassword ? " fa fa-eye" : 'fa fa-eye-slash'} onClick={toggleShowPassword}> </i>
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="off"
              maxLength={20} // maximum 20 characters
            />

            <span className="icon">
              <i className={showPassword ? " fa fa-eye" : 'fa fa-eye-slash'} onClick={toggleShowPassword}> </i>
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              autoComplete="off"
              maxLength={20} // maximum 20 characters
            />





            <input type="submit" value="Sign Up" className="btn2" />


          </form>

          <Link to="/" > <a className="dnthave">You have an account?  Log in </a></Link>
        </div>

      </div>





    </div>

  );
};
export default SignUp 
