import axios from "axios"

import { useEffect, useState } from "react";
import SingleProject from "../secondary -components/singleProject";
const PProjects = () => {

  const [Projects, setProjects] = useState([]);
  const [show, setshow] = useState(false);



  useEffect(() => {
    axios.get('http://127.0.0.1:3000/project/allprojects').then((res) => {
      setProjects(res.data);
    }
    )
      .catch(error => console.error(error));
  }, [])

  const listProject = Projects.map((single, k) =>
    single.Status === false ? <SingleProject single={single} key={k} /> : null
  );


  return (
    <div>

      <div className={show ? "box-1" : "box-2"}>



        <div className="animated bounceInDown">
          <div className="container">
            <span className="error animated tada" id="msg"></span>

            <form name="form1" className="box" >
              <h4>Smart <span>Business Solution</span></h4>
              <img width="30%" src="sbs.png"></img>
              <h5>Sign in to your account.</h5>
              <input type="text" name="email" placeholder="Email" autocomplete="off"
              />
              <i className="typcn typcn-eye" ></i>
              <input type="password" name="password" placeholder="Passsword" id="pwd" autocomplete="off"
              />

              <a href="#" className="forgetpass">Forget Password?</a>

              <input type="submit" value="Login" className="btn1" />


            </form>

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
                  <th>Name</th>
                  <th>Company Name</th>
                  <th>Designation</th>
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