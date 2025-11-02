import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import profileUser from "../../../assets/images/profile.png";
import profileselect from "../../../assets/images/profile-select.png";
import { createProfile } from "../../../services/api";
import { countries, languages } from "../../../constants/countries";
import "../SignIn.css";

const CreateProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    email_id: localStorage.getItem("email") || "",
    name: "",
    phone_number: "",
    language: "",
    country: "",
    image_base64_value: "",
  });
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState(null); // For displaying the image preview
  console.log("profileImage", profileImage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Display image preview
        setProfile((prev) => ({
          ...prev,
          image_base64_value: reader.result, // Save Base64 value
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email_id, name, language, country } = profile;

    if (
      !email_id.trim() ||
      !name.trim() ||
      !country.trim() ||
      !language.trim()
    ) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await createProfile(profile);

      if (res?.data?.success || res?.data?.statusCode === 200) {
        toast.success(res?.data?.message || "Profile created successfully");
        // Note: JWT token was already set during sign-in/verify-otp flow
        // Profile creation is an authenticated endpoint that updates user profile
        navigate("/create-organization");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      // Error handling is done by Axios interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="row justify-content-center align-items-center newsignin-section new-auth">
      <div className="col-lg-5">
        <div className="header">
          <h4>Create Profile</h4>
          <p>
            Reclaim control of your data with confidence. Secure, seamless{" "}
            <br className="d-none d-xl-block" />
            and built to empower you every step of the way.
          </p>
        </div>

        <form onSubmit={handleCreateProfile}>
          <div className="form-inputs">
            <div className="mb-4">
              <div className="profile-image-container text-center">
                <img
                  src={profileImage || profileUser}
                  alt="Profile"
                  className="profile-image"
                />
                <label htmlFor="profile" className="camera-icon">
                  <img src={profileselect} alt="Upload" />
                </label>
              </div>
              <input
                type="file"
                id="profile"
                name="profile"
                className="form-control d-none"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Please enter name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select
                name="country"
                id="country"
                value={profile.country}
                onChange={handleInputChange}
                className="form-control form-select"
              >
                <option value="">Please select country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="">
              <label htmlFor="language" className="form-label">
                Language
              </label>
              <select
                name="language"
                id="language"
                value={profile.language}
                onChange={handleInputChange}
                className="form-control form-select"
              >
                <option value="">Please select language</option>
                {languages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 last-btn">
            <button
              type="submit"
              className={`profile-btn ${loading ? "loading" : ""} w-100`}
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
    </section>
  );
};

export default CreateProfile;
