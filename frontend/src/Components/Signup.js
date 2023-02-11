import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api";
import styled from "styled-components";
import { userStore } from "../zustand";

const StyledForm = styled.form`
    display:flex;
    flex-direction: column;
`;
const Signup = () => {
    const {setUser,setLoggedIn} = userStore();
    const navigate = useNavigate();
    const initialForm = {
        email:'',
        password:'',
        confirmPassword:''
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
        const {email,password,confirmPassword} = formData;
        if(password === confirmPassword){
            try{
                const {user,access_token} = await signup({email,password});
                localStorage.token = access_token;
                setUser({...user})
                setLoggedIn();
                navigate('/');
            }catch(e){
                console.log(e);
                alert('Error signing up');
            }
        }else{
            setFormData(initialForm);
            alert('Passwords do not match.');
        }
    }

    return <StyledForm onSubmit={handleSubmit} onChange={handleUpdate}>
        <TextField type="email" name="email" required label="Email" variant="outlined" value={formData.email}/>
        <TextField type="password" name="password" required label="Password" variant="outlined" value={formData.password}/>
        <TextField type="password" name="confirmPassword" required label="Confirm Password" variant="outlined" value={formData.confirmPassword}/>
        <Button type="submit" variant="contained">Sign up</Button>
        <Link to="/login">Already have an account? Login</Link>
    </StyledForm>
}

export default Signup;