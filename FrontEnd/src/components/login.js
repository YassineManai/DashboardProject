import { Link } from "react-router-dom";
import { useState } from 'react'


const Login = () => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    async function loginUser(event) {
        console.log(Email)
        console.log(Password)
        event.preventDefault()

        const response = await fetch('http://127.0.0.1:3000/user/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email,
                Password,
            }),
        })

        const data = await response.json()
        console.log(data.mytoken)

        if (data.mytoken) {
            localStorage.setItem('token', data.mytoken)
            alert('Login successful')
            window.location.href = '/dash'
        } else {
            alert('Please check your username and password')
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
                    <span className="error animated tada" id="msg"></span>

                    <form name="form1" className="box" onSubmit={loginUser}>
                        <h4>Smart <span>Business Solution</span></h4>
                        <img width="30%" src="sbs.png"></img>
                        <h5>Sign in to your account.</h5>
                        <input type="text" name="email" placeholder="Email" autocomplete="off" value={Email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <i className="typcn typcn-eye" ></i>
                        <input type="password" name="password" placeholder="Passsword" id="pwd" autocomplete="off" value={Password}
                            onChange={(e) => setPassword(e.target.value)} />

                        <a href="#" className="forgetpass">Forget Password?</a>
                       
                            <input type="submit" value="Login" className="btn1" />
                       

                    </form>
                    <Link to="/signup" > <a className="dnthave">Don't have an account?  SignUp </a></Link>
                </div>

            </div>





        </div>

    );
};
export default Login
