import React from "react";
import axios from "axios";
import '../componentsCss/alluser.css'


const Userligne = ({user, onDeleteUser }) => {
   /* const del = () => {
      axios.delete(`http://127.0.0.1:3000/user/deluser/${props.single._id}`)
      .then(res => {
          console.log(res);
          console.log(res.data);
          props.setUsers(prevUsers => prevUsers.filter(user => user._id !== props.single._id));
      })
      .catch(error => console.error(error));
    }*/
    const handleDeleteClick = () => {
      onDeleteUser(user._id);
    }
    return (<div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>

                    <td >{user.FirstName}</td>
                    <td>{user.LastName}</td>
                    <td>{user.Email}</td>
                    <td>{user.Phone}</td>
                    <td> <img src={require('../assets/trash.png')} height={"15px"} className="trash" onClick={handleDeleteClick}></img> </td>
                  


                </tbody>

            </table>
        </div>





    </div >

    )
}



export default Userligne;