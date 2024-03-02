import React, { useState } from 'react';
import { Link, useNavigate  } from "react-router-dom";

import UserAuth from './UserAuth';
import "./Login.css";
import Button from "../../components/ui/Button";
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [errors, setError] = useState({});
  const [values, setValues] = useState({
    Username: '',
    Password: ''
  });
  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: (event.target.value).trim() }));
  };
  const handleOnClick = async () => {
    const CheckData = UserAuth(values);
    setError(CheckData);
    const hasNoErrors = Object.values(CheckData).every(error => error === '');
  
    if (hasNoErrors) {
      try {
        const res = await axios.post('http://localhost:8800/login', values);
        navigate('/home');
        const UserType = res.data.UserDetails.UserType;
        
        console.log('success===>',res.data.UserDetails.UserType);
      } catch (err) {
        console.log('error',err.response.data.error); 
        setError({
          errorMessage :err.response.data.error
        })       
      }
    }
  };
  

  return (
    <div className="d-flex justify-content-center ">
      <div className="login-details">
        <h3 className="login-header d-flex justify-content-center p-2">
          Login
        </h3>
        <div className="d-flex flex-column g-1 px-2 login-inputs">
          <div>Username</div>
          <input type="text" name='Username' onChange={handleChange} required/>
          {errors.Username && <div className="error-message">{errors.Username}</div>}
        </div>
        <div className="d-flex flex-column g-1 px-2 mb-3 login-inputs">
          <div>Password</div>
          <input type="text" name='Password' onChange={handleChange}/>
          {errors.Password && <div className="error-message">{errors.Password}</div>}
        </div>
        {errors.errorMessage && <div className="error-message">{errors.errorMessage}</div>}
        
        <Button
          label="Login"
          buttonType="primary"
          handleFunction={handleOnClick}
        />
        <div>
          Not a member? <Link to={"/register"}>Register</Link>
        </div>
      </div>
    </div>
  );
}
