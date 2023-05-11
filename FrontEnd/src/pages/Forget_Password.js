import { Link } from "react-router-dom";
import { useState } from 'react'
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { useEffect } from "react";


const Forget_Password = () => {
    const [Email, setEmail] = useState('')
   

   




    const [error, setError] = useState("")
    const [success, setSuccess] = useState("");





    async function Reset(event) {
        event.preventDefault()
        if (!Email ) {
            setError("Please Insert Email");
            return;
        }
        const updatedDaySheet = {
           
            Email: Email,
           
        };

        try {
            const response = await axios.put(`http://127.0.0.1:3000/Mail/updatePassword/${Email}`, updatedDaySheet);
            const data = response.data;
           console.log(data)
            const Mail = await axios.post('http://127.0.0.1:3000/Mail/Send', {
                Email,
               subject : '[SBS]Password reset for SBS Application'
            })
            const dataMail = Mail.data
            console.log(dataMail)
            setSuccess('Reset Email Successfully ! Please chaeck your Email Inbox');

        } catch (error) {
            console.log(error)
            setError('Invalid Email')
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
                <div className="reset_Password_Container">
                    {success && <span className="Succ animated tada">{success}</span>}
                    {error && <span className="err animated tada">{error}</span>}
                    <form name="form1" className="box" onSubmit={Reset}>
                        <h4>
                            Smart <span>Business Solution</span>
                        </h4>
                        <img width="30%" src="sbs.png"></img>
                        <h5>Reset Password</h5>
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
                      
                       
                       
                        <input type="submit" value="Reset Password" className="btn_reset" />
                    </form>
                    <Link to="/login" > <a className="dnthave"> Have an account?  Login </a></Link>
                </div>

            </div>





        </div>

    );
};
export default Forget_Password
