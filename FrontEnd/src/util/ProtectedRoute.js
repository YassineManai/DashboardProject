import React, { useEffect, useState } from "react";
import { Route, useNavigate , useLocation , Navigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
const ProtectedRoute = (props) => {



    function getUserIdFromToken(token) {
        try {
            const decodedToken = jwtDecode(token);
    
            return decodedToken._id;
    
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isUser, setisUser] = useState(false);
    const location = useLocation();
    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/');
        }
        setIsLoggedIn(true);
        const userId = getUserIdFromToken(userToken);
        setisUser(userId !==("6418909ca52211e323c3964d"));
        console.log(userId)
    }
console.log(isUser)
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);
    if (isUser && location.pathname.startsWith('/Dash')) {
        return <Navigate to="/User" />;
      }
    
      return isLoggedIn ? props.children : null;
    }


export default ProtectedRoute;