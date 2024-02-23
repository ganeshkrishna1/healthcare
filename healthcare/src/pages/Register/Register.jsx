import React from "react";

import "./Register.css";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

export default function Register() {
  const handleFunction = () => {};
  return (
    <>
      <div className="d-flex justify-content-center ">
        <div className="register-main d-flex flex-column g-2 justify-content-center align-items-center">
          <div className="register-title">Register</div>
          <div className="register-details">
            <div className="register-inputStyle">
              <div>First Name</div>
              <input type="text" />
            </div>
            <div className="register-inputStyle">
              <div>Last Name</div>
              <input type="text" />
            </div>
          </div>
          <div className="register-email">
            <div className="register-inputStyle">
              <div>Email</div>
              <input type="email" />
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
              <input type="text" />
            </div>
            <div className="register-inputStyle">
              <div>Confirm Password</div>
              <input type="text" />
            </div>
          </div>
          <Button
            label="Register"
            buttonType="primary"
            handleFunction={handleFunction}
          />
          <div className=" mb-2 ">
            Already a member ? <Link to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
