import "./componentsCss/login-signup.css"
import './App.css';
import Login from './components/login';
import SignUp from './components/Signup';
import UsersPage from "./components/UsersPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dash from "./components/dash";






function App() {





  return (
    <div >

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/dash" element={<Dash />}></Route>
          <Route path="/UserPage" element={<UsersPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
