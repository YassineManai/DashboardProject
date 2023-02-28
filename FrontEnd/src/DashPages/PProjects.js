import axios from "axios"

import { useEffect, useState } from "react";
import SingleProject from "../secondary -components/singleProject";

const PProjects = () => {

  const [Projects, setProjects] = useState([]);
  const [show, setshow] = useState(false);
  const [ProjectName, setProjectName] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [Designation, setDesignation] = useState('');


  /*const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    axios.post("http://127.0.0.1:3000/project/CreateProject", { ProjectName, CompanyName, Designation })
      .then(response => {

        console.log(response)
        setshow(false);
      })
      .catch(error => console.error(error));
    

  }


  useEffect(() => {
  
    axios.get('http://127.0.0.1:3000/project/allprojects').then((res) => {
      setProjects(res.data);
    }
    )
      .catch(error => console.error(error));




  }, []) */

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/project/allprojects');
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:3000/project/CreateProject', {
        ProjectName: ProjectName,
        CompanyName: CompanyName,
        Designation: Designation,
      });

      setProjects([...Projects, response.data]); // Update the state of the list to include the new item
      setProjectName('');
      setCompanyName('');
      setDesignation('');
      setshow(false);
    } catch (error) {
      console.error(error);
    }
  };



  /*const listProject = Projects.map((single, k) =>
    single.Status === false ? <SingleProject single={single} key={k} /> : null
  );*/
  const listProject = Projects.map((project, index) =>
    project.Status === false ? <SingleProject project={project} key={index} /> : null
  )



  return (
    <div>

      <div className={show ? "box-1" : "box-2"}>

        <div className="animated bounceInDown">
          <div className="container">
            <span className="error animated tada" id="msg"></span>

            {show && (<form name="form1" className="box" onSubmit={handleSubmit} >
              <h4>Smart <span>Business Solution</span></h4>
              <img width="30%" src={require('../assets/sbs.png')}></img>
              <h5>Create Project </h5>

              <input type="text" name="Pname" placeholder="Project Name" id="Pname" onChange={(e) => { setProjectName(e.target.value) }} autocomplete="off"
              />
              <input type="text" name="Cname" placeholder="Company Name" id="Cname" onChange={(e) => { setCompanyName(e.target.value) }} autocomplete="off"
              />

              <input type="text" name="Destination" placeholder="Destination" id="Destination" onChange={(e) => { setDesignation(e.target.value) }} autocomplete="off"
              />
              <input type="submit" value="Done" className="btn2" />

            </form>)}

          </div>

        </div>
      </div>




      <div class="head-title">
        <div class="left">
          <h1>Projects</h1>
          <ul class="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li><i class='bx bx-chevron-right' ></i></li>
            <li>
              <a class="active" href="#">Projects</a>
            </li>
          </ul>
        </div>
        <a href="#" class="btn-download">
          <i class='bx bxs-cloud-download' ></i>
          <span onClick={() => { setshow(!show) }} class="text">Add Project</span>

        </a>
      </div>




      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>All Users</h3>
            <i className='bx bx-search' ></i>
            <i className='bx bx-filter' ></i>
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
          </div>
          {listProject}

        </div>
      </div>




    </div>
  )
}
export default PProjects