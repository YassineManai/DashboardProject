import axios from "axios"

import { useEffect, useState } from "react";

import SingleArchivedProject from "../secondary -components/singleArchivedProject";
const PArchived = () => {

  const [Projects, setProjects] = useState([]);




  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async (searchTerm) => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/project/allprojects');
      const ProjectWithId = response.data.map(project => ({ ...project, Id: project._id }));
      const filteredProject = searchTerm
        ? ProjectWithId.filter(project => project.ProjectName.toLowerCase().includes(searchTerm.toLowerCase()))
        : ProjectWithId;
      setProjects(filteredProject);
    } catch (error) {
      console.error(error);
    }
  };




  /*const listProject = Projects.map((single, k) =>
    single.Status === false ? <SingleProject single={single} key={k} /> : null
  );*/
  const lisArchivedProjects = Projects.map((project, index) =>
    project.Status === true ? <SingleArchivedProject project={project} key={index} /> : null
  )



  return (
    <div>




      <div class="head-title">
        <div class="left">
          <h1>ArchivedProjects</h1>
          <ul class="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li><i class='bx bx-chevron-right' ></i></li>
            <li>
              <a class="active" href="#">ArchivedProjects</a>
            </li>
          </ul>
        </div>

      </div>




      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>All Projects</h3>
            <i >
            <form action="" class="search-bar">
                <input
                  type="search"
                  name="search"
                  pattern=".*\S.*"
                  required
                  onChange={(event) => fetchProjects(event.target.value)}
                />
                <button class="search-btn" type="submit">
                  <span>Search</span>
                </button>
              </form>
            </i>
           
          </div>
          <div className="table-wrapper">
            <table className="fl-table">
              <thead >
                <tr>
                  <th>Project Name</th>
                  <th>Company Name</th>
                  <th>Destination</th>
                </tr>
              </thead>
            </table>
            <div className='ligne1'>
              {lisArchivedProjects}
            </div>

          </div>



        </div>
      </div>




    </div>
  )
}
export default PArchived