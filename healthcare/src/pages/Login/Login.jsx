import React from "react";

import "./Login.css";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
export default function Login() {
  const handleOnClick = () => {
    console.log("login");
  };

  return (
    <div className="d-flex justify-content-center ">
      <div className="login-details">
        <h3 className="login-header d-flex justify-content-center p-2">
          Login
        </h3>
        <div className="d-flex flex-column g-1 px-2 login-inputs">
          <div>Email</div>
          <input type="text" />
        </div>
        <div className="d-flex flex-column g-1 px-2 mb-3 login-inputs">
          <div>Password</div>
          <input type="text" />
        </div>
        <Button
          label="Login"
          buttonType="primary"
          handleFunction={handleOnClick}
        />
        <div>
          Not a member? <Link to={"register"}>Register</Link>
        </div>
      </div>
    </div>
  );
}
