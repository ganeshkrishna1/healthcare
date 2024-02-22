import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";

export default function Button({ label, buttonType, route, handleFunction }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    } else {
      handleFunction();
    }
  };

  return (
    <div className={buttonType} onClick={handleClick}>
      {label}
    </div>
  );
}
