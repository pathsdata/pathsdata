import { useNavigate, useParams } from "react-router-dom";

import cluster from "../../../assets/images/dashboard/workspace/cluster.png";
import cloud from "../../../assets/images/dashboard/workspace/cloud.png";
import left_arrow from "../../../assets/images/nvigation_arrows/left_arrow.png";

const WorkspaceHome = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();

 

  return (
    <>
      <div className="mt-4 pd">
        <div className="digital-ecosystem">
          <div className="workspace-header">
            <h1 className="workspace-title">Workspace 123</h1>
            <button
              className="back-home-btn boreder-0"
              onClick={() => navigate("/dashboard/home")}
            >
              <img src={left_arrow} alt="Back" className="me-2" />
              <span> Back to Main Home</span>
            </button>
          </div>
          <div className="row mt-4">
            <div className="col-lg-4 mb-4 mb-lg-5">
              <div
                className="home-card-view"
                onClick={() => navigate(`/workspace/${workspaceId}/cluster`)}
              >
                <div className="d-flex flex-column justify-content-between">
                  <img
                    src={cluster}
                    alt=""
                    height={50}
                    width={50}
                    className="mb-3"
                  />
                  <div>
                    <span className="digital-title">Cluster</span>
                    <p className="digital-desc">
                      Configure your clusters with cluster creation, running and
                      workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4 mb-lg-5">
              <div
                className="home-card-view"
                onClick={() =>
                  navigate(`/workspace/${workspaceId}/cloude-resource`)
                }
              >
                <div className="d-flex flex-column justify-content-between">
                  <img
                    src={cloud}
                    alt=""
                    height={50}
                    width={50}
                    className="mb-3"
                  />
                  <div>
                    <span className="digital-title">Cloud Resource</span>
                    <p className="digital-desc">
                      Manage and view your cloud resource i am usage details.
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

export default WorkspaceHome;
