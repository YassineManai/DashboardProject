import React from 'react';
import ReactDOM from 'react-dom/client';

import "./componentsCss/login-signup.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login';
import SignUp from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './pages/User';
import DailyUser from './pages/DailyUser';
import ProtectedRoute from './util/ProtectedRoute'
import DailySheetinfo from './pages/Dailysheetinfo';
import ProfileUser from './pages/Profile';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        
        <Route path="/User" element={<ProtectedRoute> <User/> </ProtectedRoute>}></Route>
        <Route path="/DailyUser/:MsheetId" element={<ProtectedRoute><DailyUser/> </ProtectedRoute>}></Route>
        <Route path="/DailyUserinfo/:DsheetId" element={<ProtectedRoute><DailySheetinfo /></ProtectedRoute>}></Route>
        <Route path="/ProfileUser" element={<ProtectedRoute><ProfileUser /></ProtectedRoute>}></Route>
        <Route path="*" element={ 
          <ProtectedRoute>  <App /> </ProtectedRoute>
      
        }></Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
