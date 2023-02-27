import "./componentsCss/login-signup.css"
import './App.css';
import './componentsCss/alluser.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PUsers from "./DashPages/PUsers";
import NavSide from "./components/NavSide";
import PProjects from "./DashPages/PProjects";






function App() {





  return (
    <div >
      <NavSide>
        <Routes>
          <Route path="/Dash/Home" element={<Home />}></Route>
          <Route path="/Dash/PUsers" element={<PUsers />}></Route>
          <Route path="/Dash/PProjects" element={<PProjects/>}></Route>
        </Routes>
      </NavSide>
    </div>
  );
}

export default App;
