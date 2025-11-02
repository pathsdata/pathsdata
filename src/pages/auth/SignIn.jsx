import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLeft from "./AuthLeft"; // import shared left section
import { requestSignInOTP } from "../../services/api";
import "./SignIn.css";

const initialState = { email_id: "" };

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await requestSignInOTP({ email: formData.email_id });

      if (response.data) {
        localStorage.setItem("email", formData.email_id);
        toast.success(response.data.message || "OTP sent successfully!");
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      // Error handling is done by Axios interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="row newsignin-section">
      <AuthLeft />

      <div className="col-lg-6 d-flex flex-column justify-content-center">
        <div className="right">
          <div className="header">
            <h4>Sign In account</h4>
            <p>
              Reclaim control of your data with confidence.
              <br className="d-none d-xl-block" />
              Secure, seamless, and built to empower you every
              <br className="d-none d-xl-block" />
              step of the way.
            </p>
          </div>

          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label htmlFor="email_id" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email_id"
                name="email_id"
                className="form-control"
                placeholder="Please enter email"
                value={formData.email_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className={`sign-btn ${loading ? "loading" : ""} w-100`}
                disabled={loading}
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

export default SignIn;
