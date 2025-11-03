import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLeft from "./AuthLeft";
import { verifySignInOTP, resendOTP, getProfile, listOrganizations } from "../../services/api";
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

  /**
   * Check if user has profile and organization, then navigate accordingly
   * - No profile? → /create-profile
   * - Has profile but no org? → /create-organization
   * - Has both? → /dashboard/home
   */
  const checkUserStatusAndNavigate = async () => {
    try {
      console.log("Checking user profile and organization status...");

      // Check both profile and organizations in parallel
      const [profileRes, orgsRes] = await Promise.all([
        getProfile().catch(() => null), // Return null if API fails
        listOrganizations().catch(() => null), // Return null if API fails
      ]);

      console.log("Profile response:", profileRes);
      console.log("Organizations response:", orgsRes);

      // Check if user has a profile
      const hasProfile = profileRes?.data?.data != null || profileRes?.data?.success === true;

      // Check if user belongs to any organizations
      const hasOrganization =
        (orgsRes?.data?.organizations && orgsRes.data.organizations.length > 0) ||
        (orgsRes?.data?.total && orgsRes.data.total > 0);

      console.log("Has profile:", hasProfile);
      console.log("Has organization:", hasOrganization);

      // Navigate based on what exists
      if (!hasProfile) {
        console.log("No profile found, navigating to /create-profile");
        navigate("/create-profile");
      } else if (!hasOrganization) {
        console.log("Profile exists but no organization, navigating to /create-organization");
        navigate("/create-organization");
      } else {
        console.log("Profile and organization exist, navigating to /dashboard/home");
        // Store organization ID if available
        if (orgsRes?.data?.organizations?.[0]?.id) {
          localStorage.setItem("user_org_id", orgsRes.data.organizations[0].id);
        }
        navigate("/dashboard/home");
      }
    } catch (error) {
      // If checking fails, default to onboarding flow for safety
      console.error("Error checking user status:", error);
      console.log("Defaulting to /create-profile due to error");
      navigate("/create-profile");
    }
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

        // Check if user has profile and organization to determine next step
        await checkUserStatusAndNavigate();
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
