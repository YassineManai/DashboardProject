import React from "react";
import axios from "axios";
import '../componentsCss/alluser.css'
import { useState } from "react";
import { useEffect } from "react";

const SingleInfo = ({ oneproject }) => {

    


    const [ProjectName, setProjectName] = useState(oneproject.ProjectName)
    const [CompanyName, setCompanyName] = useState(oneproject.CompanyName);
    const [Designation, setDesignation] = useState(oneproject.Designation);
  
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");




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

  



    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedDaySheet = {
          
            ProjectName: ProjectName,
            CompanyName: CompanyName, 
            Designation: Designation,       
        };

        try {
            const response = await axios.put(`http://127.0.0.1:3000/project/updateProject/${oneproject._id}`, updatedDaySheet);
            const data = response.data;
            console.log(data);
            setSuccess('Updated Successfully');
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };


    return (<div>


        {success && <span className="error4 animated tada">{success}</span>}
        {error && <span className="error5 animated tada">{error}</span>}

        <form onSubmit={handleSubmit}>
            <div className="form-group">
               
               
                

            
                <label style={{color : 'var(--dark)'}} htmlFor="ProjectName">ProjectName</label>
                <i style={{position : 'absolute' , marginTop : '22px' , marginLeft : ' 10px '}} className='bx bx-edit'></i>
                <input
                
                    type="text"
                    className="form-control"
                    id="CompanyName"
                    placeholder={oneproject.ProjectName}
                    value={ProjectName}
                    onChange={(event) => setProjectName(event.target.value)}
                />
               
           
                <label style={{color : 'var(--dark)'}} htmlFor="CompanyName">CompanyName</label>
                <i style={{position : 'absolute' , marginTop : '22px' , marginLeft : ' 10px '}} className='bx bx-edit'></i>
                <input
                    type="text"
                    className="form-control"
                    id="CompanyName"
                    placeholder={oneproject.CompanyName}
                    value={CompanyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                />


                <label style={{color : 'var(--dark)'}} htmlFor="Designation">Designation</label>
                <i style={{position : 'absolute' , marginTop : '22px' , marginLeft : ' 10px '}} className='bx bx-edit'></i>
                <input
                    type="text"
                    className="form-control"
                    id="Designation"
                    placeholder={oneproject.Designation}
                    value={Designation}
                    onChange={(event) => setDesignation(event.target.value)}
                />
            </div>
            <input type="submit" value="Update" className="updatebtnProject" />

        </form>




    </div >

    )
}



export default SingleInfo;