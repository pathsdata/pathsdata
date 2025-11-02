import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import WorkspaceSidebar from "../../components/workspace/WorkspaceSidebar";
import Logout from "../../components/Models/Logout/Logout";
import Header from "../../pages/Header/Header";

const WorkspaceDashboardLayout = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [token]);

  const [mobileToggle, setMobileToggle] = useState(false);
  const [show, setShow] = useState(false);
  const [isLogouLoading, setIsLogouLoading] = useState(false);

  const handleLogout = async () => setShow(true);
  const handleClose = () => setShow(false);

  const confirmLogout = () => {
    setIsLogouLoading(true);
    setTimeout(() => {
      localStorage.removeItem("jwt_token");
      localStorage.setItem("openCloudOption", false);
      localStorage.setItem("openUser", false);
      navigate("/sign-in");
      setIsLogouLoading(false);
    }, 500);
  };

  const handleBackToWorkspaces = () => {
    navigate("/dashboard/workspace");
  };

  return (
    <div className="layout">
      <section className="main-section">
        <div className="layout has-sidebar fixed-sidebar fixed-header">
          <WorkspaceSidebar
            workspaceId={workspaceId}
            mobileToggle={mobileToggle}
            setMobileToggle={setMobileToggle}
            handleLogout={handleLogout}
            onBackToWorkspaces={handleBackToWorkspaces}
          />
          <div className="layout">
            <main className="content">
              <Header
                mobileToggle={mobileToggle}
                setMobileToggle={setMobileToggle}
                handleLogout={handleLogout}
              />
              <div className="outlet">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </section>

      <Logout
        show={show}
        handleClose={handleClose}
        handleLogout={confirmLogout}
        isLogouLoading={isLogouLoading}
      />
    </div>
  );
};

export default WorkspaceDashboardLayout;
