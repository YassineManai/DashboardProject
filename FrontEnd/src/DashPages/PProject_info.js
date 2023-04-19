import axios from "axios"

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import SingleInfo from "../secondary -components/singleProject_info";

const Project_info = () => {

  const { ProjectId } = useParams();
  console.log(ProjectId)
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [loading, setLoading] = useState(true);
  const [Project, setProject] = useState([]);


  useEffect(() => {

    fetchDailySheet()
  }, [ProjectId]);

  const fetchDailySheet = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/project/ProjectInfo/${ProjectId}`);
      const data = response.data;
      console.log(data);
      setProject(data);


      setLoading(false); // set loading to false after receiving response
    } catch (error) {
      console.error(error);
    }
  };


  const Signleproject = Project.map((oneproject, index) =>
    <SingleInfo oneproject={oneproject} key={index} />
  )

  return (
    <div>


      {
        loading ? (<span className="loader" > </span >)
          : (
            <>


              <div class="head-title">
                <div class="left">
                  <h1>ArchivedProjects</h1>
                  <ul class="breadcrumb">
                    <li>
                      <a href="#">Dashboard</a>
                    </li>
                    <li><i class='bx bx-chevron-right' ></i></li>
                    
                    <Link to="/Dash/PProjects">
                                        <li>
                                            <a> Projects</a>
                                        </li>

                                    </Link>
                  
                    <li><i class='bx bx-chevron-right' ></i></li>
                    <li>
                      <a class="active" href="#">Project Details</a>
                    </li>
                  </ul>
                </div>

              </div>




              <div className="table-data">
                <div className="order">
                  <div className="head">
                    <h3>Project Details </h3>

                  </div>

                  {Signleproject}
               

                </div>
            
              </div>

            </>


          )}


    </div>
  )
}
export default Project_info