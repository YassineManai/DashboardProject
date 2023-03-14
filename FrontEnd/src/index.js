import React from 'react';
import ReactDOM from 'react-dom/client';

import "./componentsCss/login-signup.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login';
import SignUp from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './pages/User';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/User" element={<User/>}></Route>
        <Route path="*" element={<App />}></Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
