import React from "react";

import '../componentsCss/alluser.css'


const SingleArchivedProject = ({project, UnarchieveProject}) => {
    const handleUnachieveClick = () => {
        UnarchieveProject(project._id);
    }
    return (<div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>
                <td >  <img src={require('../assets/project_icon.png')} style={{ position:'absolute' , left:'5%',marginTop:'-12px' }} ></img> {project.ProjectName}</td>
                    <td>{project.CompanyName}</td>
                    <td>{project.Designation}</td>
                    <td> <button class="button-26" role="button" onClick={handleUnachieveClick} >Unarchive</button></td>
                </tbody>

            </table>
        </div>





    </div >

    )
}



export default SingleArchivedProject;