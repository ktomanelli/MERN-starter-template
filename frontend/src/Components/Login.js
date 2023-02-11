import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { requestLogin } from "../api";
import { userStore } from "../zustand";
const StyledForm = styled.form`
    display:flex;
    flex-direction: column;
`;
const Login = () => {
    const navigate = useNavigate();
    const {setUser,login} = userStore();
    const initialForm = {
        email:'',
        password:'',
    };
    const [error,setError] = useState('');
    const [formData,setFormData] = useState(initialForm);

    const handleUpdate = (e) => {
        e.preventDefault();
        const temp = {...formData};
        temp[e.target.name] = e.target.value; 
        setFormData(temp);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email,password} = formData;
        try{
            const {user,access_token} = await requestLogin({email,password});
            localStorage.token = access_token;
            setUser({...user});
            login();
            navigate('/');
        }catch(e){
            console.log(e)
            alert('invalid credentials')
        }
    }
    return <StyledForm onSubmit={handleSubmit} onChange={handleUpdate}>
        <TextField type="email" name="email" required label="Email" variant="outlined" value={formData.email}/>
        <TextField type="password" name="password" required label="Password" variant="outlined" value={formData.password}/>
        <Button type='submit' variant="contained">Login</Button>
        <Link to='/signup'>Click here to Signup</Link>
    </StyledForm>
}

export default Login;