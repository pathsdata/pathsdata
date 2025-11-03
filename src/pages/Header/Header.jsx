import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import notification1 from "../../assets/images/notification1.png";
import dummyuser from "../../assets/images/dummy-user.jpg";
import bottomarrow from "../../assets/images/bottom-arrow.png";
import "./Header.css";
import { getProfile } from "../../services/api";

const Header = ({ mobileToggle, setMobileToggle, handleLogout }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [headerTitle, setHeaderTitle] = useState("");
  const [profileData, setProfileData] = useState({});
  const [profileImage, setProfileImage] = useState("");

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        if (response?.data) {
          setProfileData(response.data);
          // If profile has a picture, set it
          if (response.data.profilePictureUrl) {
            setProfileImage(response.data.profilePictureUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Fallback to email from localStorage if API fails
        const email = localStorage.getItem("email");
        if (email) {
          setProfileData({ email, fullName: email.split("@")[0] });
        }
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    let name = "";
    if (pathname === "/dashboard") {
      name = "Hello John";
    } else if (
      pathname === "/dashboard/home" ||
      pathname === "/dashboard/home2" ||
      pathname === "/home" ||
      pathname === "/home2"
    ) {
      name = "Home";
    } else if (pathname === "/invitation") {
      name = "Invitation";
    } else if (
      pathname === "/vpc" ||
      pathname === "/add-vpc" ||
      pathname === "/edit-vpc"
    ) {
      name = "Cloud Resource";
    } else if (
      pathname === "/resourcesIAM" ||
      pathname === "/add-resourcesIAM" ||
      pathname === "/edit-resourcesIAM"
    ) {
      name = "Cloud Resource";
    } else if (
      pathname === "/credential-configure" ||
      pathname === "/add-credential-configure" ||
      pathname === "/edit-credential-configure"
    ) {
      name = "Cloud Resource";
    } else if (
      pathname === "/cluster" ||
      pathname === "/add-cluster" ||
      pathname === "/edit-cluster" ||
      pathname.startsWith("/cluster-detail")
    ) {
      name = "Cluster";
    } else if (
      pathname === "/data-catalog" ||
      pathname === "/create-data-source"
    ) {
      name = "Data Source";
    } else if (pathname === "/database") {
      name = "Data Source";
    } else if (pathname === "/table-list") {
      name = "Data Source";
    } else if (pathname === "/table-details") {
      name = "Data Source";
    } else if (pathname === "/query-history") {
      name = "Query History";
    } else if (pathname === "/query-execution") {
      name = "Query Execution";
    } else if (pathname === "/query-runner") {
      name = "Query Runner";
    } else if (pathname === "/contact-us") {
      name = "Contact Us";
    } else if (
      pathname === "/user-management" ||
      pathname === "/add-member" ||
      pathname === "/role"
    ) {
      name = "User Management";
    } else if (
      pathname === "/family" ||
      pathname === "/add-family" ||
      pathname === "/edit-family"
    ) {
      name = "Family";
    } else if (
      pathname === "/organization" ||
      pathname === "/add-organization" ||
      pathname === "/edit-organization" ||
      pathname === "/organization-dash" ||
      pathname.startsWith("/organization-dash")
    ) {
      name = "Organization";
    } else if (
      pathname === "/subscription-list" ||
      pathname === "/subscription-upgrade"
    ) {
      name = "Subscription";
    } else if (pathname === "/setting") {
      name = "Setting ";
    } else if (pathname === "/ai-chat") {
      name = "AI Chat";
    } else if (pathname === "/edit-profile") {
      name = "Edit Profile ";
    }

    setHeaderTitle(name);
  }, [pathname]);

  const resizeBase64Image = (base64String, width, height) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
    });
  };

  return (
    <header className="admin-header nav navbar navbar-expand-xl navbar-light iq-navbar">
      <div className="container-fluid navbar-inner p-0">
        <div className="d-flex flex-column">
          {/* <h5 className="site-menu-title mb-0">{headerTitle}</h5> */}
            <div className="welcome-section">
              <span className="second-view-title">Welcome to PATHSDATA!</span>
              <p className="second-view-desc">
                All the tools you need to manage your workspace, users and
                security in one place.
              </p>
            </div>
        </div>

        <div className="d-flex align-items-center ">
         

          <ul className="mb-2 navbar-nav navbar-list mb-lg-0">
            <li className="nav-item dropdown">
              <Link
                className="nav-link d-flex align-items-center position-relative ps-2 ps-md-3 p-0 profile"
                href="#"
                id="profile-dropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={profileImage || dummyuser}
                  className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded rounded-circle logo"
                  loading="lazy"
                />
                {profileData?.fullName || profileData?.email || "User"}
                <img src={bottomarrow} className="profile-arrow" />
              </Link>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="profile-dropdown"
              >
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="mb-2 navbar-nav navbar-list mb-lg-0">
            <li className="nav-item dropdown ps-2 ps-md-3 ">
              <div
                className="nav-link d-flex align-items-center position-relative notification"
                href="#"
                // id="language-dropdown"
                role="button"
                // data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={notification1}
                  className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded"
                  loading="lazy"
                />
              </div>
            </li>
          </ul>
        </div>

        <button
          id="btn-toggle"
          className="border-0 sidebar-toggler break-point-md btn-line ms-3"
          onClick={() => setMobileToggle(!mobileToggle)}
        >
          <i className="ri-menu-line ri-xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;
