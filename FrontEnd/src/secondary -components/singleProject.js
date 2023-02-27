import React from "react";

import '../componentsCss/alluser.css'


const SingleProject = (props) => {
   
    return (<div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>
                    <td >{props.single.ProjectName}</td>
                    <td>{props.single.CompanyName}</td>
                    <td>{props.single.Designation}</td>
                </tbody>

            </table>
        </div>





    </div >

    )
}



export default SingleProject;