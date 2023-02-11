import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";
import { requestLogin } from "../api";

const Login = (props) => {
    // const {setWorkspace} = workspaceStore();
    const navigate = useNavigate();
    const {oAuthStateToken} = useParams();
    const [authPayload, setAuthPayload] = useState(null);
    const [stateToken,setStateToken] = useState(sessionStorage.oAuthStateToken); 
    useEffect(()=>{
        if(!oAuthStateToken){
            const token = nanoid();
            sessionStorage.oAuthStateToken = token;
            setStateToken(token)
        }
        const checkAuth = async()=>{
            if(oAuthStateToken === sessionStorage.oAuthStateToken){
                setAuthPayload(await requestLogin(oAuthStateToken));
            }
        }
        checkAuth()
        .catch(console.log)
    },[])
    useEffect(()=>{
        if(authPayload){
            console.log(authPayload)
            const {access_token, id} = authPayload;
            localStorage.token = access_token;
            // setWorkspace({id})
            navigate('/');
        }
    },[authPayload])
    const url = (`https://api.notion.com/v1/oauth/authorize?client_id=0c922bff-3b57-4bee-9e4a-282055fe8703&response_type=code&owner=user&redirect_uri=https%3A%2F%2Fapi.dev.notiontools.dev%2Foauth&state=${stateToken}`)
    return <a href={url}>Click here to sign up</a>
    
}

export default Login