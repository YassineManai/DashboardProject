import React from "react";

import '../componentsCss/alluser.css'


const SingleProject = ({project}) => {
   
    return (<div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>
                    <td >{project.ProjectName}</td>
                    <td>{project.CompanyName}</td>
                    <td>{project.Designation}</td>
                </tbody>

            </table>
        </div>





    </div >

    )
}



export default SingleProject;