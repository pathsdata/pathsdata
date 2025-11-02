import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../ui/Sidebar.css";
// Import images
import logout from "../../assets/images/sidebar/logout.png";
import sidebarlogo from "../../assets/images/sidebar/logo.png";
import dashboard from "../../assets/images/sidebar/dashboard.png";
import cluster from "../../assets/images/workspace_sidebar/clustor.png";
import cloud_resource from "../../assets/images/workspace_sidebar/cloud_resource.png";
const WorkspaceSidebar = ({
  workspaceId,
  mobileToggle,
  setMobileToggle,
  handleLogout,
}) => {
  const { pathname } = useLocation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const handleSidebarDismiss = () => {
    if (window.innerWidth <= 767) {
      setMobileToggle(!mobileToggle);
    }
    setIsSidebarExpanded(false);
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setIsSidebarExpanded(false);
  };

  const toggleSubMenu = (menu) => {
    setIsSidebarExpanded(openMenu !== menu);
    setSelectedMenu(menu);
    setOpenMenu(menu);
  };

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
                  to={`/workspace/${workspaceId}/home`}
                  className={`menu-link d-flex align-items-center`}
                >
                  <span className="menu-icon">
                    <img src={dashboard} alt="" />
                  </span>
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink
                  to={`/workspace/${workspaceId}/cluster`}
                  className={`menu-link d-flex align-items-center ${
                    pathname.includes(`/workspace/${workspaceId}/cluster`)
                      ? "active"
                      : ""
                  }`}
                  onClick={handleSidebarDismiss}
                >
                  <span
                    className="menu-icon"
                    onClick={() => toggleMenu("cluster")}
                  >
                    <img src={cluster} alt="" />
                  </span>
                </NavLink>
              </li>

              <li
                className={`menu-item ${
                  openMenu === "analytics" ? "open" : ""
                }`}
              >
                <NavLink
                  to={`/workspace/${workspaceId}/cloude-resource`}
                  className={`menu-link d-flex align-items-center`}
                  onClick={() => toggleSubMenu("cloude-resource")}
                >
                  <span className="menu-icon">
                    <img src={cloud_resource} alt="" />
                  </span>
                </NavLink>
              </li>

              <li className="menu-item">
                <Link
                  className="d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <span className="menu-icon">
                    <img src={logout} alt="" />
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

    </div>
  );
};

export default WorkspaceSidebar;
