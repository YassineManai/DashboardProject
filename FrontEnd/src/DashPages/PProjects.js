import axios from "axios"

import { useEffect, useState } from "react";
import SingleProject from "../secondary -components/singleProject";
import { useNavigate } from "react-router-dom";


const PProjects = () => {

  const [Projects, setProjects] = useState([]);
  const [show, setshow] = useState(false);
  const [ProjectName, setProjectName] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [Designation, setDesignation] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("");

  const handleDeleteProject = (id) => {
    axios.delete(`http://127.0.0.1:3000/project/DelProject/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setProjects(prevProjects => prevProjects.filter(Project => Project._id !== id));
      })
      .catch(error => console.error(error));
  }

  const handleArchieve = (id) => {
    axios.put(`http://127.0.0.1:3000/project/Archive/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setProjects(prevProjects => prevProjects.filter(Project => Project._id !== id));
      
      })
      .catch(error => console.error(error));
  }


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

      setLoading(false); // set loading to false after receiving response
    } catch (error) {
      console.error(error);

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ProjectName || !CompanyName || !Designation) {
      setError("Please fill out all fields");
      return;
    }
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
      setSuccess('Project Added Successfully')
      setshow(false);

    } catch (error) {
      console.error(error);
      setError('An error occurred while Creating Project')
    }
  };



  /*const listProject = Projects.map((single, k) =>
    single.Status === false ? <SingleProject single={single} key={k} /> : null
  );*/
  const listProject = Projects.map((project, index) =>
    project.Status === false ? <SingleProject project={project} key={index} onArchieveProject={handleArchieve} onDeleteProject={handleDeleteProject} /> : null
  )



  return (
    <div>


      {
        loading ? (<span className="loader" > </span >)
          : (
            <>

              <div className={show ? "box-1" : "box-2"}>

                <div className="animated bounceInDown">
                  <div className="container">
                    <img src={require('../assets/close.png')} width="10%" height="8%" className="close" onClick={() => { setshow(!show) }} />
                    {success && <span className="error6 animated tada">{success}</span>}
                    {error && <span className="error1 animated tada">{error}</span>}

                    {show && (<form name="form1" className="box" onSubmit={handleSubmit} >
                      <h4>Smart <span>Business Solution</span></h4>
                      <img width="30%" src={require('../assets/sbs.png')}></img>
                      <h5>Create Project </h5>

                      <input type="text" name="Pname" placeholder="Project Name" id="Pname" onChange={(e) => { setProjectName(e.target.value) }} autocomplete="off"
                      />
                      <input type="text" name="Cname" placeholder="Company Name" id="Cname" onChange={(e) => { setCompanyName(e.target.value) }} autocomplete="off"
                      />

                      <input type="text" name="Destination" placeholder="Designation" id="Designation" onChange={(e) => { setDesignation(e.target.value) }} autocomplete="off"
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










              <div className={show ? " blur  table-data" : "table-data"}>
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
                          <th style={{ background: "#144CCC", width :'20%'}} >Project Name</th>
                          <th style={{ background: "#144CCC" , width :'20%'}} >Company Name</th>
                          <th style={{ background: "#144CCC" , width :'20%'}} >Designation</th>
                          <th style={{ background: "#144CCC" , width :'20%'}} ></th>
                        </tr>
                      </thead>

                    </table>
                    <div className='ligne1'>
                      {listProject}
                    </div>

                  </div>



                </div>
              </div>


            </>


          )}



    </div>
  )
}
export default PProjects