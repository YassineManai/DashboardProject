import React from "react";

import '../componentsCss/alluser.css'
import { useNavigate } from 'react-router-dom';

const SingleProject = ({ project, onArchieveProject , onDeleteProject }) => {
   
   
    const handleAchieveClick = () => {

        const confirmed = window.confirm('You want to Archive this Project ?');
        if (confirmed) {
          navigate(`/Dash/PArchived`);
          onArchieveProject(project._id);
        }
       
      
    }

    const navigate = useNavigate();
    
    const handleDeleteClick = () => {
        const confirmed = window.confirm('Are you sure you want to delete this Project?');
        if (confirmed) {
            onDeleteProject(project._id);
        }
   
    }
    const handleProjectInfo = () => {
        navigate(`/Dash/ProjectInfo/${project._id}`);
      };
        
   
    return (<div className="tableuser">

        <div className="table-wrapper">
            <table className="fl-table">

                <tbody>

                    <td style={{width :'20%'}} >  <img src={require('../assets/project_icon.png')} style={{ position: 'absolute', left: '5%', marginTop: '-12px' }} ></img> {project.ProjectName}</td>
                    <td style={{width :'20%'}} >{project.CompanyName}</td>
                    <td style={{width :'20%'}}>{project.Designation}</td>
                    <td style={{width :'20%'}}> <button class="button-36" role="button" onClick={handleAchieveClick} > Archive</button>
                    <button  class="button-delete" role="button" onClick={handleDeleteClick} > Delete</button>
                    <button class="button-details" role="button" onClick={handleProjectInfo} > Details</button>
                    </td>

                </tbody>

            </table>
        </div>





    </div >

    )
}



export default SingleProject;