
import './App.css';
import './componentsCss/alluser.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PUsers from "./DashPages/PUsers";
import NavSide from "./components/NavSide";
import PProjects from "./DashPages/PProjects";
import PArchived from './DashPages/PArchived';
import PMonthlysheet from './DashPages/PMonthlysheet';
import PDailySheet from './DashPages/PDailySheet';




function App() {





  return (
    <div >
      <NavSide>
        <Routes>
          <Route path="/Dash/Home" element={<Home />}></Route>
          <Route path="/Dash/PUsers" element={<PUsers />}></Route>
          <Route path="/Dash/PProjects" element={<PProjects />}></Route>
          <Route path="/Dash/PArchived" element={<PArchived />}></Route>
          <Route path="/Dash/PMsheet/:userId" element={<PMonthlysheet />}></Route>
          <Route path="/Dash/PDsheet/:MsheetId" element={<PDailySheet />}></Route>
        </Routes>
      </NavSide>
    </div>
  );
}

export default App;
