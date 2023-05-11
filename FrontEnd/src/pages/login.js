import { Link } from "react-router-dom";
import { useState } from 'react'
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { useEffect } from "react";
function getUserIdFromToken(token) {
    try {
        const decodedToken = jwtDecode(token);

        return decodedToken._id;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const Login = () => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')


    const [showPassword, setShowPassword] = useState(false);



    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    }

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("");





    async function loginUser(event) {
        event.preventDefault()
        if (!Email || !Password) {
            setError("Please fill out all fields");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:3000/user/Login', {
                Email,
                Password,
            })
            const data = response.data
            console.log(data.mytoken)
            const userId = getUserIdFromToken(data.mytoken);

            if (userId == ("6418909ca52211e323c3964d")) {
                localStorage.setItem('token', data.mytoken)
                setSuccess('Login successful')
                window.location.href = '/Dash/Home'
            }
            else if (data.mytoken) {
                localStorage.setItem('token', data.mytoken)
                setSuccess('Login successful')
                window.location.href = '/User'
            } else {
                setError('An error occurred while logging in')
            }

        } catch (error) {
            console.log(error)
            setError('An error occurred while logging in')
        }
    }

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
                    {success && <span className="error6 animated tada">{success}</span>}
                    {error && <span className="error1 animated tada">{error}</span>}
                    <form name="form1" className="box" onSubmit={loginUser}>
                        <h4>
                            Smart <span>Business Solution</span>
                        </h4>
                        <img width="30%" src="sbs.png"></img>
                        <h5>Sign in to your account.</h5>
                        <span className="icon">
                            <i className="fa fa-envelope"></i>
                        </span>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            autoComplete="off"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="icon">
                            <i className={showPassword ? " fa fa-eye" : 'fa fa-eye-slash'} onClick={toggleShowPassword}> </i>
                        </span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Passsword"
                            id="pwd"
                            autoComplete="off"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link to="/Reset_Password">
                            <a className="forgetpass">
                                Forget Password?
                            </a>
                        </Link>

                        <input type="submit" value="Login" className="btn1" />
                    </form>
                    <Link to="/signup" > <a className="dnthave">Don't have an account?  SignUp </a></Link>
                </div>

            </div>





        </div>

    );
};
export default Login
