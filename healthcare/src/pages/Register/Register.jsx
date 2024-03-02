import React, { useState } from 'react';
import { Checkmark } from 'react-checkmark'
import "./Register.css";
import Button from "../../components/ui/Button";
import { Link, useNavigate  } from "react-router-dom";
import AuthUserDetails from './AuthUserDetails';
import axios from 'axios';
import Modal from '../../components/Modal/Modal';
import { AiOutlineCloseCircle } from "react-icons/ai";
export default function Register() {
  const navigate = useNavigate();
  const [errors, setError] = useState({});
  const [values, setValues] = useState({
    Username: '',
    Password: '',
    Email: '',
    UserType: 'Patient',
    FullName:'',
    ConfirmPassword:''
  });
  const [showModal, setshowModal] = useState({
    status:'',
    message:''
  });
  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log(values);
  };
  const handleModalClose =() =>{
    setshowModal({status:'',
    message:'',
  icon:''})
  if(showModal.status === 'Success')
  {
    navigate('/login');
  }
  
  }
  const ModalIcon = () =>{
    if(showModal.status === 'Success')
    {
      return <Checkmark size='60px' color='green' />
    }
    else{
      return <AiOutlineCloseCircle
      style={{
        fill: '#ff0000',fontSize: '70px',animation: 'scaleAnimation 1s ease forwards',
      }}
    />
  //   return   <IoIosCloseCircle
  //   style={{
  //     fill: '#ff0000',fontSize: '70px',animation: 'scaleAnimation 1s ease forwards'
  //   }}
  // />

    }
  }
  const handleRegister = async () =>{
    const validationErrors = AuthUserDetails(values);
    setError(validationErrors);
    const hasNoErrors = Object.values(validationErrors).every(error => error === '');
    console.log(hasNoErrors,validationErrors,values);
    if (hasNoErrors) {
      try {
        console.log(values);
        const res = await axios.post('http://localhost:8800/adduser', values);
        console.log(res.data.message);
        setshowModal({
          status: 'Success',
          message: res.data.message
        });
        
        console.log(res.data.message);
      } catch (err) {
        setshowModal({
          status: 'Failed',
          message: err.response.data.error
        });
      }
    }
  }
  
  return (
    <>
      <div className="d-flex justify-content-center ">
        <div className="register-main d-flex flex-column g-2 justify-content-center align-items-center">
          <div className="register-title">Register</div>
          <div className="register-details">
            <div className="register-inputStyle">
              <div>First Name</div>
              <input type="text" name='FullName' onChange={handleChange}/>
              {errors.FullName && <div className="error-message">{errors.FullName}</div>}
            </div>
            <div className="register-inputStyle">
              <div>User Name</div>
              <input type="text" name='Username' onChange={handleChange}/>
              {errors.Username && <div className="error-message">{errors.Username}</div>}
            </div>
          </div>
          <div className="register-email">
            <div className="register-inputStyle">
              <div>Email</div>
              <input type="email" name='Email' onChange={handleChange}/>
              {errors.Email && <div className="error-message">{errors.Email}</div>}
            </div>
          </div>
          <div className="register-details">
            <div className="register-inputStyle">
              <div>Date of Birth</div>
              <input type="date" />
            </div>
            <div className="register-inputStyle">
              <div>Gender</div>
              <select name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="register-details">
            <div className="register-inputStyle">
              <div>Password</div>
              <input type="text" name='Password' onChange={handleChange}/>
              {errors.Password && <div className="error-message">{errors.Password}</div>}
            </div>
            <div className="register-inputStyle">
              <div>Confirm Password</div>
              <input type="text" name='ConfirmPassword' onChange={handleChange}/>
              {errors.ConfirmPassword && <div className="error-message">{errors.ConfirmPassword}</div>}
            </div>
          </div>
          <Button
            label="Register"
            buttonType="primary"
            handleFunction={handleRegister}
          />
          <div className=" mb-2 ">
            Already a member ? <Link to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
      {showModal.status && <Modal>
        {ModalIcon()}
        {/* <div className="Modal-icon">{ModalIcon()}</div> */}
        <div className="modal-message">{showModal.message}</div>
      <Button
            label="Continue"
            buttonType="primary"
            handleFunction={handleModalClose}
          />
      </Modal>}
    </>
  );
}
