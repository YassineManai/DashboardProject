import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from "react"


const SignUp = () => {
  const [FirstName, setFirstName] = useState()
  const [LastName, setLastName] = useState()
  const [Email, setEmail] = useState()
  const [Phone, setPhone] = useState()
  const [Password, setPassword] = useState()

  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()




    // Handle validations


    axios

      .post("http://127.0.0.1:3000/user/Signup", { FirstName, LastName, Email, Phone, Password })
      .then(response => {

        console.log(response)
        // Handle response
      })

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
          <span className="error animated tada" id="msg"></span>

          <form name="form1" className="box" id="login" method="post" onSubmit={handleSubmit} >
            <h4>Smart <span>Business Solution</span></h4>
            <img width="30%" src="sbs.png"></img>
            <h5>SignUp to your account.</h5>
            <input type="text" name="Firstname" id="FirstName"  onChange={(e) => { setFirstName(e.target.value) }} placeholder="Firstname" autocomplete="off" />
            <i className="typcn typcn-eye" ></i>

            <input type="text" name="LastName" id="LastName"  onChange={(e) => { setLastName(e.target.value) }} placeholder="LastName" autocomplete="off" />
            <i className="typcn typcn-eye" ></i>
            <input type="text" name="Email" id="Email"  onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" autocomplete="off" />
            <i className="typcn typcn-eye" ></i>



            <input type="password" name="Password" placeholder="Passsword" id="Password" onChange={(e) => { setPassword(e.target.value) }} autocomplete="off" />

            <input type="password" name="Confirmpassword" placeholder="Confirm Passsword" id="pwd" autocomplete="off" />

            <input type="text" name="Phone" placeholder="YourNumber" id="Phone" onChange={(e) => { setPhone(e.target.value) }} autocomplete="off" />
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
