import { useNavigate } from "react-router-dom";

import workspace from "../../assets/images/dashboard/workspace.png";
import security from "../../assets/images/dashboard/security.png";
import usage from "../../assets/images/dashboard/usage.png";
import users from "../../assets/images/dashboard/users.png";
import setting from "../../assets/images/dashboard/setting.png";
const NewHome = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("user-signup-token");
    localStorage.removeItem("user-signin-token");
    navigate("/signin");
  };

  return (
    <>
      <div className="mt-4 pd">
        <div className="digital-ecosystem">
         
          <div className="row mt-4">
            <div className="col-lg-4 mb-4 mb-lg-5">
              <div
                className="home-card-view"
                onClick={() => navigate("/dashboard/workspace")}
              >
                <div className="d-flex flex-column justify-content-between">
                  <img
                    src={workspace}
                    alt=""
                    height={50}
                    width={50}
                    className="mb-3"
                  />
                  <div>
                    <span className="digital-title">Workspace</span>
                    <p className="digital-desc">
                      Configure workspaces containing notebooks, libraries,
                      queries, and workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4 mb-lg-5">
              <div
                className="home-card-view"
                onClick={() => navigate("/dashboard/usage")}
              >
                <div className="d-flex flex-column justify-content-between">
                  <img
                    src={usage}
                    alt=""
                    height={50}
                    width={50}
                    className="mb-3"
                  />
                  <div>
                    <span className="digital-title">Usage</span>
                    <p className="digital-desc">
                      View usage details and graphs for your account in
                      PATHSDATA or estimated costs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4 mb-lg-5">
              <div
                className="home-card-view"
                onClick={() => navigate("/dashboard/users")}
              >
                <div className="d-flex flex-column justify-content-between">
                  <img
                    src={users}
                    alt=""
                    height={50}
                    width={50}
                    className="mb-3"
                  />
                  <div>
                    <span className="digital-title">Users</span>
                    <p className="digital-desc">
                      Manage identities for use with users, jobs, automated
                      tools and systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4 mb-lg-5">
              <div
                className="home-card-view"
                onClick={() => navigate("/dashboard/network")}
              >
                <div className="d-flex flex-column justify-content-between">
                  <img
                    src={security}
                    alt=""
                    height={50}
                    width={50}
                    className="mb-3"
                  />
                  <div>
                    <span className="digital-title">Security</span>
                    <p className="digital-desc">
                      Manage networking, data encryption, IAM settings and
                      enhanced security.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4 mb-lg-5">
              <div
                className="home-card-view"
                onClick={() => navigate("/dashboard/setting")}
              >
                <div className="d-flex flex-column justify-content-between">
                  <img
                    src={setting}   
                    alt=""
                    height={50}
                    width={50}
                    className="mb-3"
                  />
                  <div>
                    <span className="digital-title">Setting</span>
                    <p className="digital-desc">
                      Configure your PATHSDATA account profile, subscription and
                      billing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHome;
