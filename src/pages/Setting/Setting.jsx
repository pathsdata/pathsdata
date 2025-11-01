import editbtn from "../../assets/images/edit-btn.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Setting = () => {
  const navigate = useNavigate();

  const [subscriptionData, setSubscriptionData] = useState({});
  const [profileData, setProfileData] = useState({});

  const GetProfileData = async () => {
    try {
      const res = await Axios.get(`/profile`, authorizationHeaders());
      // console.log("profile++", res);

      if (res?.data?.statusCode === 200) {
        setProfileData(res?.data?.data);
      } else {
        toast.error(res.data?.message);
      }
    } catch (err) {
      console.error("Error Profile++", err);

      if (err?.message === "Network Error") {
        toast.error(err?.message);
      }
      if (err?.response?.data?.statusCode === "440") {
        toast.error("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/sign-in");
      } else {
        toast.error(err?.response?.data?.message || "An error occurred");
      }
    }
  };

  const GetSubscriptionData = async () => {
    try {
      const res = await Axios.get(`/subscription`, authorizationHeaders());
      console.log("networkres", res);

      if (res.data?.statusCode === 200) {
        setSubscriptionData(res.data.data);
      } else {
        toast.error(res.data?.message);
      }
    } catch (err) {
      console.error("Error subscription++", err);

      if (err?.message === "Network Error") {
        // toast.error(err?.message);
      }
      if (err?.response?.data?.statusCode === "440") {
        toast.error("Session expired. Please log in again.");
        localStorage.clear();
        localStorage.setItem("openCloudOption", false);
        navigate("/sign-in");
      } else {
        toast.error(err?.response?.data?.message || "An error occurred");
      }
    }
  };

  const handleUpgrade = () => {
    navigate("/subscription-upgrade", {
      state: { plan: subscriptionData?.subscription_type, account: true },
    });
  };

  const handleCancel = async () => {
    try {
      const res = await Axios.delete(`/subscription`, authorizationHeaders());
      if (res?.data?.statusCode === 200) {
        toast.success(res.data?.message);
        GetSubscriptionData();
      } else {
        if (err?.message === "Network Error") {
          toast.error(err?.message);
        }
        if (err?.response?.data?.statusCode === "440") {
          toast.error("Session expired. Please log in again.");
          localStorage.clear();
          localStorage.setItem("openCloudOption", false);
          navigate("/sign-in");
        } else {
          toast.error(err?.response?.data?.message || "An error occurred");
        }
      }
    } catch (err) {
      console.error("Error Delete resourcesIAM++", err);
    }
  };

  useEffect(() => {
    GetSubscriptionData();

    GetProfileData();
  }, []);

  return (
    <>
      <section className="setting-sec pd">
        <div className="workspace-header">
          <h1 className="workspace-title">Setting</h1>
        </div>
        <div className="setting-form">
          <div className="">
            <div className="add-title d-flex justify-content-between align-items-center">
              <div>Account Setting</div>

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
                  Organization Name
                </label>
                <div className="add-input">
                  <input
                    type="text"
                    id="email_id"
                    name="email_id"
                    placeholder="Enter Email"
                    value={profileData?.email_id || ""}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-lg-6 mb-3 mb-lg-4">
                <label htmlFor="phone_number" className="form-label">
                  Description{" "}
                </label>
                <div className="add-input">
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    placeholder="Enter Mobile Number"
                    value={profileData?.phone_number || ""}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Setting;
