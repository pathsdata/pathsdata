// NEw Try

import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import setting from "../assets/images/sidebar/setting.png";
import logout from "../assets/images/sidebar/logout.png";
import "./Sidebar.css";
import sidebarlogo from "../assets/images/sidebar/logo.png";

import dashboard from "../assets/images/sidebar/dashboard.png";
import cloudresource from "../assets/images/sidebar/cloud-resource.png";
import datacatalog from "../assets/images/sidebar/data-catalog.png";
import queryinterface from "../assets/images/sidebar/query-interface.png";
import user from "../assets/images/sidebar/user.png";
import workspace from "../assets/images/sidebar/workspace.png";
import pie from "../assets/images/sidebar/pie.png";
import network from "../assets/images/sidebar/network.png";
import users from "../assets/images/sidebar/users.png";
import billing from "../assets/images/sidebar/billing.png";
import clustoricon from "../assets/images/sidebar/clustor-icon.png";
import contacticon from "../assets/images/sidebar/contact-us.png";
import subscriptionicon from "../assets/images/sidebar/subscriptionicon.png";
import aichat from "../assets/images/sidebar/aichat.png";

import whats from "../assets/images/sidebar/whats.png";

const Sidebar = ({ mobileToggle, setMobileToggle, handleLogout }) => {
  const { pathname } = useLocation();
  const openClodeOption = JSON.parse(localStorage.getItem("openCloudOption"));
  const openUser = JSON.parse(localStorage.getItem("openUser"));

  const FamilyId = localStorage.getItem("family_id");
  const UserOrgId = localStorage.getItem("user_org_id");

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState("");

  const [sidebarToggle, setSidebarToggle] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  useEffect(() => {
    // setOpenMenu("cloud-resource")
  }, [openClodeOption, openUser]);

  console.log("openClodeOption", openClodeOption);

  const handleSidebarDismiss = () => {
    if (window.innerWidth <= 767) {
      setMobileToggle(!mobileToggle);
    }

    localStorage.setItem("openOrgFamily", false);
    localStorage.removeItem("org_id");
    setIsSidebarExpanded(false);
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);

    setIsSidebarExpanded(false);

    localStorage.removeItem("org_id");
    // localStorage.setItem("openCloudOption", false)
  };

  const toggleSubMenu = (menu) => {
    console.log("menu", menu);
    setIsSidebarExpanded(openSubMenu !== menu);

    setOpenSubMenu(openSubMenu === menu ? null : menu);

    // setIsSidebarExpanded(openSubMenu !== menu);
    setSelectedMenu(menu);
  };

  useEffect(() => {
    pathname === "/vpc" ||
    pathname === "/resourcesIAM" ||
    pathname === "/credential-configure" ||
    pathname === "/add-vpc" ||
    pathname === "/edit-vpc" ||
    pathname === "/add-resourcesIAM" ||
    pathname === "/edit-resourcesIAM" ||
    pathname === "/add-credential-configure" ||
    pathname === "/edit-credential-configure"
      ? (setSelectedMenu("cloud-resource"), setIsSidebarExpanded(true))
      : pathname === "/data-catalog" ||
        pathname === "/create-data-source" ||
        pathname === "/additional" ||
        pathname === "/credential" ||
        pathname === "/table-details"
      ? (setSelectedMenu("data-catalog"), setIsSidebarExpanded(true))
      : setIsSidebarExpanded(false);
  });

  return (
    <div className="sidebar-container">
      <div
        id="sidebar"
        className={`sidebar break-point-md has-bg-image ${
          isSidebarExpanded ? "collapsed" : ""
        }`}
      >
        <div className="sidebar-layout">
          <div className="sidebar-header">
            <div>
              <img src={sidebarlogo} alt="" className="img-fluid" />
            </div>
          </div>

          <nav className="menu open-current-submenu">
            <ul>
              <li className="menu-item">
                <NavLink
                  // to="/home"
                  to={
                    openClodeOption === true ||
                    (openClodeOption === false && openUser === true)
                      ? "/dashboard/home2"
                      : "/dashboard/home"
                  }
                  className={`menu-link d-flex align-items-center`}
                  // onClick={handleSidebarDismiss}
                >
                  <span className="menu-icon">
                    <img src={dashboard} alt="" />
                  </span>
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink
                  to="/dashboard/workspace"
                  className={`menu-link d-flex align-items-center ${
                    pathname === "/dashboard/workspace/add-workspace" ||
                    pathname === "/dashboard/workspace/edit-workspace" ||
                    pathname === "/dashboard/workspace"
                      ? "active"
                      : ""
                  }`}
                  onClick={handleSidebarDismiss}
                >
                  <span
                    className="menu-icon"
                    onClick={() => {
                      toggleMenu("workspace");
                    }}
                  >
                    <img src={workspace} alt="" />
                  </span>
                </NavLink>
              </li>
              <li
                className={`menu-item ${
                  openMenu === "cloud-resource" ? "open" : ""
                }`}
              >
                <NavLink
                  to="/dashboard/usage"
                  className={`menu-link d-flex align-items-center 
                                                    ${
                                                      openMenu === "pie" ||
                                                      pathname ===
                                                        "/dashboard/usage"
                                                    }
                                                `}
                  onClick={() => toggleSubMenu("cloud-resource")}
                >
                  <span className="menu-icon">
                    <img src={pie} alt="" />
                  </span>
                </NavLink>
              </li>

              <li
                className={`menu-item ${
                  openMenu === "cloud-resource" ? "open" : ""
                }`}
              >
                <NavLink
                  to="/dashboard/users"
                  className={`menu-link d-flex align-items-center 
                                                    ${
                                                      openMenu === "users" ||
                                                      pathname ===
                                                        "/dashboard/users"
                                                    }
                                                `}
                  onClick={() => toggleSubMenu("users")}
                >
                  <span className="menu-icon">
                    <img src={users} alt="" />
                  </span>
                </NavLink>
              </li>

              <li
                className={`menu-item ${
                  openMenu === "data-catalog" ? "open" : ""
                }`}
              >
                <NavLink
                  to="/dashboard/network"
                  className={`menu-link d-flex align-items-center 
                                                    ${
                                                      openMenu === "network" ||
                                                      pathname ===
                                                        "/dashboard/network"
                                                        ? "active"
                                                        : ""
                                                    }
                                                `}
                  onClick={() => toggleSubMenu("network")}
                >
                  <span className="menu-icon">
                    <img src={network} alt="" />
                  </span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/dashboard/setting"
                  className={`menu-link d-flex align-items-center 
                                                ${
                                                  pathname ===
                                                    "query-execution" ||
                                                  pathname.startsWith(
                                                    "/dashboard/setting"
                                                  )
                                                    ? "active"
                                                    : ""
                                                }
                                            `}
                  onClick={handleSidebarDismiss}
                >
                  <span className="menu-icon">
                    <img src={setting} alt="" />
                  </span>
                  <span
                    className="menu-title"
                    onClick={() => toggleMenu("setting")}
                  >
                    Query Interface
                  </span>
                </NavLink>
              </li>
              <li className="menu-item">
                <Link
                  // to="/sign-in"
                  className="d-flex align-items-center"
                  onClick={() => handleLogout()}
                >
                  <span className="menu-icon">
                    <img src={logout} alt="" />
                  </span>
                </Link>
              </li>
              {/*

              <li className="menu-item">
                <NavLink
                  to="/cluster"
                  className={`menu-link d-flex align-items-center 
                                                ${
                                                  pathname === "/add-cluster" ||
                                                  pathname.startsWith(
                                                    "/cluster-detail"
                                                  )
                                                    ? "active"
                                                    : ""
                                                }
                                            `}
                  onClick={handleSidebarDismiss}
                >
                  <span className="menu-icon">
                    <img src={clustoricon} alt="" />
                  </span>
                  <span
                    className="menu-title"
                    onClick={() => toggleMenu("cluster")}
                  >
                    Cluster
                  </span>
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink
                  to="/user-management"
                  className={`menu-link d-flex align-items-center 
                                                    ${
                                                      pathname ===
                                                        "/add-member" ||
                                                      pathname === "/role"
                                                        ? "active"
                                                        : ""
                                                    }`}
                  onClick={handleSidebarDismiss}
                >
                  <span className="menu-icon">
                    <img src={user} alt="" />
                  </span>
                  <span
                    className="menu-title"
                    onClick={() => toggleMenu("user-management")}
                  >
                    User Management
                  </span>
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink
                  to="/user-management"
                  className={`menu-link d-flex align-items-center 
                                                    ${
                                                      pathname ===
                                                        "/add-member" ||
                                                      pathname === "/role"
                                                        ? "active"
                                                        : ""
                                                    }`}
                  onClick={handleSidebarDismiss}
                >
                  <span className="menu-icon">
                    <img src={user} alt="" />
                  </span>
                  <span
                    className="menu-title"
                    onClick={() => toggleMenu("user-management")}
                  >
                    User Management
                  </span>
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink
                  to="/ai-chat"
                  className={`menu-link d-flex align-items-center ${
                    pathname === "/ai-chat" ? "active" : ""
                  }`}
                  onClick={handleSidebarDismiss}
                >
                  <span className="menu-icon">
                    <img src={aichat} alt="" height={22} />
                  </span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/subscription-list"
                  className={`menu-link d-flex align-items-center ${
                    pathname === "/subscription-upgrade" ? "active" : ""
                  }`}
                  onClick={handleSidebarDismiss}
                >
                  <span className="menu-icon">
                    <img src={subscriptionicon} alt="" height={22} />
                  </span>
                </NavLink>
              </li>
              <li className="menu-item">
                <Link
                  // to="/billing"
                  className="d-flex align-items-center"
                  onClick={handleSidebarDismiss}
                >
                  <span className="menu-icon">
                    <img src={billing} alt="" />
                  </span>
                </Link>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/setting"
                  className="d-flex align-items-center"
                  onClick={handleSidebarDismiss}
                >
                  <span className="menu-icon">
                    <img src={setting} alt="" />
                  </span>
             
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/contact-us"
                  className={`menu-link d-flex align-items-center`}
                  onClick={handleSidebarDismiss}
                >
                  <span className="menu-icon">
                    <img src={contacticon} alt="" height={22} />
                  </span>
                </NavLink>
              </li>
              <li className="menu-item">
                <Link
                  className="d-flex align-items-center"
                  onClick={handleSidebarDismiss}
                >
                  <span className="menu-icon">
                    <img src={whats} alt="" />
                  </span>
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  // to="/sign-in"
                  className="d-flex align-items-center"
                  onClick={() => handleLogout()}
                >
                  <span className="menu-icon">
                    <img src={logout} alt="" />
                  </span>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>

      {/* Second Sidebar (Appears when Cloud Resource is clicked) */}
      {isSidebarExpanded && (
        <>
          <div className="new-sidebar d-flex flex-column">
            {/* <div className="sidebar-header">
                                <div className="menu-title">
                                    {
                                        pathname === "/vpc" ||
                                            pathname === "/add-vpc" ||
                                            pathname === "/resourcesIAM" ||
                                            pathname === "/add-resourcesIAM" ||
                                            pathname === "/credential-configure" ||
                                            pathname === "/add-credential-configure"
                                            ? "Cloud Resource" : "Data Catelogue"
                                    }
                                </div>
                            </div> */}

            <div className="sidebar-menu">
              <ul>
                {selectedMenu === "cloud-resource" ? (
                  <>
                    <li className="menu-item">
                      <NavLink
                        to="/vpc"
                        // to={openClodeOption === true ? "/home2" : "/home"}
                        className={`menu-link d-flex align-items-center ${
                          pathname === "/add-vpc" || pathname === "/edit-vpc"
                            ? "active"
                            : ""
                        }`}
                        // onClick={handleSidebarDismiss}
                      >
                        <span className="menu-title">Network</span>
                      </NavLink>
                    </li>

                    <li className="menu-item">
                      <NavLink
                        to="/resourcesIAM"
                        // to={openClodeOption === true ? "/home2" : "/home"}
                        className={`menu-link d-flex align-items-center ${
                          pathname === "/add-resourcesIAM" ||
                          pathname === "/edit-resourcesIAM"
                            ? "active"
                            : ""
                        }`}
                        // onClick={handleSidebarDismiss}
                      >
                        <span className="menu-title">Cluster Resource IAM</span>
                      </NavLink>
                    </li>

                    <li className="menu-item">
                      <NavLink
                        to="/credential-configure"
                        // to={openClodeOption === true ? "/home2" : "/home"}
                        className={`menu-link d-flex align-items-center ${
                          pathname === "/add-credential-configure" ||
                          pathname === "/edit-credential-configure"
                            ? "active"
                            : ""
                        }`}
                        // onClick={handleSidebarDismiss}
                      >
                        <span className="menu-title">Credential Configure</span>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="menu-item">
                      <NavLink
                        // to="/home"
                        to={"/data-catalog"}
                        // className={`menu-link d-flex align-items-center`}
                        className={`menu-link d-flex align-items-center 
                                                        ${
                                                          pathname ===
                                                            "/create-data-source" ||
                                                          pathname ===
                                                            "/database" ||
                                                          pathname ===
                                                            "/table-details"
                                                            ? "active"
                                                            : ""
                                                        }
                                                    `}
                        // onClick={handleSidebarDismiss}
                      >
                        <span className="menu-title">Data Management</span>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
