import React, { useState } from 'react';
import db from '../../firebase';
import { Link, useNavigate } from "react-router-dom";
import UserAuth from './UserAuth';
import "./Login.css";
import Button from "../../components/ui/Button";
import { collection, query, where, getDocs } from 'firebase/firestore';
export default function Login({ setLoggedUserId }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ Username: '', Password: '' });

  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value.trim() }));
  };

  const handleOnClick = async () => {
    const CheckData = UserAuth(values);
    setErrors(CheckData);
    const hasNoErrors = Object.values(CheckData).every(error => error === '');
    if (hasNoErrors) {
      const userQuery = query(collection(db, "Users"), where("UserName", "==", values.Username));
      try {
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          if (doc[0].Password === values.Password) {
            localStorage.setItem("LogInUserId", doc[0].id);
            navigate('/home');
          } else {
            setErrors({ errorMessage: 'Incorrect Password' });
          }
        } else {
          setErrors({ errorMessage: `No User found with Username ${values.Username}` });
        }
      } catch (error) {
        console.error("Error getting user:", error);
      }
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center ">
        <div className="login-details">
          <h3 className="login-header d-flex justify-content-center p-2">
            Login
          </h3>
          <div className="d-flex flex-column g-1 px-2 login-inputs">
            <div>Username</div>
            <input type="text" name='Username' className='LoginInput' onChange={handleChange} />
            {errors.Username && <div className="error-message">{errors.Username}</div>}

          </div>
          <div className="d-flex flex-column g-1 px-2 mb-3 login-inputs">
            <div>Password</div>
            <input type="password" name='Password' className='LoginInput' onChange={handleChange} />
            {errors.Password && <div className="error-message">{errors.Password}</div>}
          </div>
          {errors.errorMessage && <div className="error-message">{errors.errorMessage}</div>}
          <Button label="Login" buttonType="primary" handleFunction={handleOnClick} />
          <div>
            Not a member? <Link to={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}
