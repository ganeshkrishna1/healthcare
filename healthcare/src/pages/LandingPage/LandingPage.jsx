import React from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/ui/Button";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <>
      <Header />
      <p>welcome</p>
      <div className="landing-head">
        <Button label="Login" buttonType="primary" route="login" />
        <Button label="Register" buttonType="primary" route="register" />
      </div>
    </>
  );
}
