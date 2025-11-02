import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLeft from "./AuthLeft";
import { verifySignInOTP, resendOTP } from "../../services/api";
import { setAuth } from "../../services/auth";
import "./SignIn.css";

const initialState = { otp: "" };

const OTPVerify = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      toast.error("Email not found. Please sign in again.");
      navigate("/sign-in");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await verifySignInOTP({
        email: email,
        otpCode: formData.otp,
      });

      console.log("OTP verification response:", response);

      // API returns accessToken and userId (not jwt_token and user_id)
      const token = response?.data?.accessToken || response?.data?.jwt_token;
      const userId = response?.data?.userId || response?.data?.user_id;

      if (token) {
        console.log("JWT token found, setting auth and navigating...");
        setAuth(token);
        localStorage.setItem("user_id", userId);
        toast.success("OTP verified successfully!");

        // Use setTimeout to ensure state updates complete before navigation
        setTimeout(() => {
          console.log("Navigating to /create-profile");
          navigate("/create-profile");
        }, 100);
      } else {
        console.error("JWT token not found in response:", response);
        toast.error("Invalid response from server. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      // Error handling is done by Axios interceptor
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);

    try {
      const response = await resendOTP({ email: email });

      if (response.data) {
        toast.success(response.data.message || "OTP resent successfully!");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      // Error handling is done by Axios interceptor
    } finally {
      setResendLoading(false);
    }
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

          <div className="mt-3 text-center">
            <button
              type="button"
              className="btn btn-link"
              onClick={handleResendOTP}
              disabled={resendLoading}
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OTPVerify;
