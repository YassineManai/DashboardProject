import { Link } from "react-router-dom";
import { useState } from 'react'
import axios from "axios";

const Login = () => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ErrorMessage, setErrorMessage] = useState("")







    async function loginUser(event) {
        event.preventDefault()
        if (!Email || !Password) {
            setErrorMessage("Please fill out all fields");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:3000/user/Login', {
                Email,
                Password,
            })
            const data = response.data
            console.log(data.mytoken)

            if (data.mytoken) {
                localStorage.setItem('token', data.mytoken)
                setErrorMessage('Login successful')
                window.location.href = '/User'
            } else {
                setErrorMessage('Please check your username and password')
            }
        } catch (error) {
            console.log(error)
            setErrorMessage('An error occurred while logging in')
        }
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
                <div className="container">
                    <span className={`error1 animated tada ${ErrorMessage ? 'show' : ''}`} id="msg">
                        {ErrorMessage}
                    </span>
                    <form name="form1" className="box" onSubmit={loginUser}>
                        <h4>
                            Smart <span>Business Solution</span>
                        </h4>
                        <img width="30%" src="sbs.png"></img>
                        <h5>Sign in to your account.</h5>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            autoComplete="off"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="typcn typcn-eye"></i>
                        <input
                            type="password"
                            name="password"
                            placeholder="Passsword"
                            id="pwd"
                            autoComplete="off"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a href="#" className="forgetpass">
                            Forget Password?
                        </a>
                        <input type="submit" value="Login" className="btn1" />
                    </form>
                    <Link to="/signup" > <a className="dnthave">Don't have an account?  SignUp </a></Link>
                </div>

            </div>





        </div>

    );
};
export default Login
