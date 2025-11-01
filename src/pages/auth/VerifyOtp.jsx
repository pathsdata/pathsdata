import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLeft from "./AuthLeft";
import "./SignIn.css";

const initialState = { email_id: "", otp: "" };

const OTPVerify = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    // Simulate successful OTP verification
    localStorage.setItem('jwt_token', 'dummy_token');
    localStorage.setItem('pd-authed', 'true');
    navigate("/create-profile");
  };

  return (
    <section className="row newsignin-section">
      <AuthLeft />

      <div className="col-lg-6 d-flex flex-column justify-content-center">
        <div className="right">
          <div className="header">
            <h4>Verify OTP</h4>
            <p>
              Reclaim control of your data with confidence. <br />
              Secure, seamless, and built to empower you every <br />
              step of the way.
            </p>
          </div>

          <form onSubmit={handleOtpVerify}>
            <div className="mb-4">
              <label htmlFor="otp" className="form-label">
                Email OTP
              </label>
              <input
                type="text"
                pattern="\d*"
                maxLength={16}
                name="otp"
                id="otp"
                className="form-control"
                placeholder="Please enter email OTP"
                value={formData.otp}
                onChange={handleChange}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                }
                required
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className={`sign-btn ${loading ? "loading" : ""} w-100`}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OTPVerify;
