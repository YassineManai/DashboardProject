import React from "react";

import '../componentsCss/alluser.css'


const SingleProject = ({ project , onArchieveProject }) => {
    const handleAchieveClick = () => {
        onArchieveProject(project._id);
    }

    return (<div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>
                    <td >{project.ProjectName}</td>
                    <td>{project.CompanyName}</td>
                    <td>{project.Designation}</td>
                    <td> <img src={require('../assets/project.png')} height={"15px"} className="trash" onClick={handleAchieveClick}></img> </td>
                </tbody>

            </table>
        </div>





    </div >

    )
}



export default SingleProject;