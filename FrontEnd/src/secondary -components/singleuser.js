import React from "react";
import axios from "axios";
import '../componentsCss/alluser.css'


const Userligne = (props) => {
    const del = () => {
        axios.delete(`http://127.0.0.1:3000/user/deluser/${props.single._id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        this.forceUpdate()
    }
    return (<div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>

                    <td>{props.single.FirstName}</td>
                    <td>{props.single.LastName}</td>
                    <td>{props.single.Email}</td>
                    <td>{props.single.Phone}</td>
                    <td> <img src="trash.png" height={"15px"} className="trash" onClick={del}></img> </td>


                </tbody>

            </table>
        </div>





    </div >

    )
}



export default Userligne;