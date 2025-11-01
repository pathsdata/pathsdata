// src/components/AuthLeft.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import newLogo from "../../assets/images/New-Logo.png";
import "./SignIn.css";

const AuthLeft = () => {
  const location = useLocation();

  // determine which step is active based on current route
  const currentStep =
    location.pathname === "/verify-otp" ? 2 : 1;

  return (
    <div className="col-lg-6">
      <div
        className={`left d-flex flex-column ${
          currentStep === 1 ? "justify-content-center" : ""
        }`}
      >
        <div className="d-flex justify-content-center">
          <img
            src={newLogo}
            alt="Logo"
            style={{
              display: "flex",
              marginTop: "100px",
              marginBottom: "180px",
              width: "70%",
            }}
          />
        </div>
        <h1>Welcome to PATHSDATA!</h1>
        <p>Sign in and take the next step with us.</p>

        <div className="progres">
          <div
            className={`progres-data mb-3 ${
              currentStep === 1 ? "current" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <div className={`num ${currentStep === 1 ? "current" : ""}`}>
                1
              </div>
              <span>Sign in your account</span>
            </div>
          </div>

        <div className="line"></div>

          <div
            className={`progres-data mb-3 ${
              currentStep === 2 ? "current" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <div className={`num ${currentStep === 2 ? "current" : ""}`}>
                2
              </div>
              <span>Verify your account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLeft;
