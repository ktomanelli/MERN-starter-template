import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../api";
import { userStore } from "../zustand";
const ProtectedRoute = ({children}) => {
    const {isLoggedIn, login, logout, setUser} = userStore();
    const navigate = useNavigate();
    const checkUserToken = async () => {
        const userToken = localStorage.token;
        if (userToken) {
            try{
                const user = await verifyToken();
                setUser({...user});
                return login();
            }catch(e){
                return logout();
            }
        }else{
            logout();
            return navigate('/login');
        }
    }
    useEffect(() => {
            checkUserToken();
        }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;