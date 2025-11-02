import editbtn from "../../assets/images/edit-btn.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddCloudResourceIAMRole = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {};
  
  const handleCancel = () => {
    navigate(-1);
    localStorage.removeItem("subnets");
    localStorage.removeItem("Securitygroup");
  };

  return (
    <>
      <section className="setting-sec pd">
        <div className="setting-form">
          <div className="">
            <div className="add-title d-flex justify-content-between align-items-center">
              <div>Create Cloud Resource IAM Role</div>

              <div>
                <img
                  src={editbtn}
                  alt="Edit"
                  className="me-4 cursor-pointer"
                  onClick={() => navigate("/edit-profile")}
                />
              </div>
            </div>
            <form className="row mt-4">
              <div className="col-lg-6 mb-3 mb-lg-4">
                <label htmlFor="email_id" className="form-label">
                  Name
                </label>
                <div className="add-input">
                  <input
                    type="text"
                    id="email_id"
                    name="email_id"
                    placeholder="Please enter name"
                    value={profileData?.email_id || ""}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-lg-6 mb-3 mb-lg-4">
                <label htmlFor="phone_number" className="form-label">
                  Cloud Resource IAM Role
                </label>
                <div className="add-input">
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    placeholder="Please enter cloud resource iam role"
                    value={profileData?.phone_number || ""}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="d-flex justify-content-center py-5">
        <button
          className="cancel-button me-2 me-md-4"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={`save-button ${loading ? "loading" : ""}`}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm me-3 ms-3"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Create"
          )}
        </button>
      </div>
    </>
  );
};
export default AddCloudResourceIAMRole;
