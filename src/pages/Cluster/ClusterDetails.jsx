import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import filter from "../../assets/images/filter.png";
import disabled from "../../assets/images/disabled.png";
import pauseIcon from "../../assets/images/pause.png"; // running state
import videoIcon from "../../assets/images/video.png"; // stopped state
// import Delet eVpc from "../Modal/Delete/DeleteVpc";

const ClusterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ static data
  const [getClusterDetail, setGetClusterDetail] = useState({
    cluster_name: "Demo-Cluster",
    status: "running",
    created_by: "admin@example.com",
    created_at: "2025-04-03T12:56:11Z",
    region: "us-east-1",
    cluster_type: "distributed",
    asg: true,
    instance_type: "t3.medium",
    vcpus: 4,
    memory: "16GB",
    storage: {
      disk_type: "SSD",
      disk_size: "100GB",
      encryption: "Enabled",
    },
    worker_details: {
      number_of_nodes: 3,
      nodes: [{ instance_type: "t3.small" }],
      vcpus: 2,
      memory: "8GB",
      storage: {
        disk_type: "SSD",
        disk_size: "50GB",
        encryption: "Enabled",
      },
    },
    vpc_id: "vpc-1234567890",
    subnet_id: "subnet-0abc123def456",
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [clusterDeleteLoader, setClusterDeleteLoader] = useState(false);

  const handleClose = () => setShow(false);

  // ✅ Just dummy toggle
  const handleClusterToggle = () => {
    setLoading(true);
    setTimeout(() => {
      setGetClusterDetail((prev) => ({
        ...prev,
        status: prev.status === "running" ? "stopped" : "running",
      }));
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay-cluster">
          <div className="loader-cluster"></div>
        </div>
      )}

      <div className={`cluster_detail`}>
        <div className="add-section row">
          <div className="col-lg-12">
            <p className="add-title">{getClusterDetail?.cluster_name}</p>
          </div>

          <div className="top_btn mt-2">
            {getClusterDetail?.status !== "terminated" && (
              <button
                type="button"
                className="detail-btn"
                style={{ padding: "14px" }}
                onClick={() => setShow(true)}
              >
                <img src={disabled} className="img-fluid me-2" alt="" />
                Terminate
              </button>
            )}

            {(getClusterDetail?.status === "running" ||
              getClusterDetail?.status === "stopped") && (
              <button
                type="button"
                className="detail-btn"
                onClick={handleClusterToggle}
                disabled={loading}
              >
                <img
                  src={
                    getClusterDetail?.status === "running"
                      ? pauseIcon
                      : videoIcon
                  }
                  className="img-fluid me-2"
                  alt={
                    getClusterDetail?.status === "running" ? "Pause" : "Start"
                  }
                  style={{ height: "22px", width: "22px" }}
                />
                {getClusterDetail?.status === "running" ? "Stop" : "Start"}
              </button>
            )}
          </div>
        </div>

        <section className="content-section mt-4">
          <div className="second mt-3 mt-lg-4">
            <div className="row">
              <div className="col-lg-12">
                <div className="fisrt mt-4 mb-3 mb-lg-4">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-lg-6 mt-3 mt-lg-0 d-flex align-items-center">
                      <div className="table-title active cursor-pointer">
                        Configuration
                      </div>
                      <div className="table-title cursor-pointer">
                        Events logs
                      </div>
                      <div className="table-title cursor-pointer">
                        Libraries
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center justify-content-end">
                      <div>
                        <button className="filter boreder-0" type="button">
                          <img src={filter} className="me-2" alt="" /> Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---- Cluster Info ---- */}
                <div className="second table-responsive mb-3">
                  <div className="table-title">Cluster</div>
                  <table>
                    <thead>
                      <tr>
                        <th>Cluster Name</th>
                        <th>Status</th>
                        <th>Created By</th>
                        <th>Creation Date</th>
                        <th>Region</th>
                        <th>
                          {getClusterDetail?.cluster_type === "distributed" &&
                            "Auto scaling"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{getClusterDetail?.cluster_name}</td>
                        <td
                          className={`running ${
                            ["running", "starting"].includes(
                              getClusterDetail?.status
                            )
                              ? "green"
                              : "red"
                          }`}
                        >
                          {getClusterDetail?.status}
                        </td>
                        <td>{getClusterDetail?.created_by}</td>
                        <td>
                          {new Date(
                            getClusterDetail?.created_at
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                        <td>{getClusterDetail?.region}</td>
                        <td
                          className={`${
                            getClusterDetail?.asg
                              ? "enabled green"
                              : "enabled red"
                          }`}
                        >
                          {getClusterDetail?.asg ? "True" : "False"}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* ---- Master ---- */}
                  <div className="table-title">
                    {getClusterDetail?.cluster_type === "distributed" &&
                      "Master"}{" "}
                    Compute Resources
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Node Type</th>
                        <th>CPU per Node</th>
                        <th>Memory per Node</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{getClusterDetail?.instance_type}</td>
                        <td>{getClusterDetail?.vcpus}</td>
                        <td>{getClusterDetail?.memory}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* ---- Worker ---- */}
                  {getClusterDetail?.cluster_type === "distributed" && (
                    <>
                      <div className="table-title">
                        Worker Compute Resources
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Number of Nodes</th>
                            <th>Node Type</th>
                            <th>CPU per Node</th>
                            <th>Memory per Node</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {
                                getClusterDetail?.worker_details
                                  ?.number_of_nodes
                              }
                            </td>
                            <td>
                              {
                                getClusterDetail?.worker_details?.nodes[0]
                                  ?.instance_type
                              }
                            </td>
                            <td>{getClusterDetail?.worker_details?.vcpus}</td>
                            <td>{getClusterDetail?.worker_details?.memory}</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}

                  {/* ---- Master Storage ---- */}
                  <div className="table-title">
                    {getClusterDetail?.cluster_type === "distributed" &&
                      "Master"}{" "}
                    Storage Configuration
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Disk Type</th>
                        <th>Disk Size</th>
                        <th>Data Encryption</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{getClusterDetail?.storage?.disk_type}</td>
                        <td>{getClusterDetail?.storage?.disk_size}</td>
                        <td
                          className={`encryption ${
                            getClusterDetail?.storage?.encryption === "Enabled"
                              ? "green"
                              : "red"
                          }`}
                        >
                          {getClusterDetail?.storage?.encryption}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* ---- Worker Storage ---- */}
                  {getClusterDetail?.cluster_type === "distributed" && (
                    <>
                      <div className="table-title">
                        Worker Storage Configuration
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Disk Type</th>
                            <th>Disk Size</th>
                            <th>Data Encryption</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {
                                getClusterDetail?.worker_details?.storage
                                  ?.disk_type
                              }
                            </td>
                            <td>
                              {
                                getClusterDetail?.worker_details?.storage
                                  ?.disk_size
                              }
                            </td>
                            <td
                              className={`encryption ${
                                getClusterDetail?.worker_details?.storage
                                  ?.encryption === "Enabled"
                                  ? "green"
                                  : "red"
                              }`}
                            >
                              {
                                getClusterDetail?.worker_details?.storage
                                  ?.encryption
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}

                  {/* ---- Network ---- */}
                  <div className="table-title">Network Settings</div>
                  <table>
                    <thead>
                      <tr>
                        <th>VPC Network</th>
                        <th>Subnetwork</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{getClusterDetail?.vpc_id}</td>
                        <td>{getClusterDetail?.subnet_id}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <DeleteVpc
          show={show}
          handleClose={handleClose}
          handleDelete={() => setShow(false)}
          isDeleteLoading={clusterDeleteLoader}
        /> */}
      </div>
    </>
  );
};

export default ClusterDetails;
