import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plusicon from "../../assets/images/plus.png";
import filter from "../../assets/images/filter.png";
import editbtn from "../../assets/images/edit-btn.png";
import deletebtn from "../../assets/images/delete-btn.png";
import organization_family from "../../assets/images/organization_family.png";
import searchIcon from "../../assets/images/search.png";
import workspaceArrow from "../../assets/images/workspace_arrow.png";

const Cluster = () => {
  const navigate = useNavigate();

  // ✅ Static cluster data as per your screenshot
  const [clusterData, setClusterData] = useState([
    {
      id: "1",
      name: "Test Cluster 1",
      type: "Standalone",
      status: "Creating",
      createdAt: "28 Oct, 2025",
    },
    {
      id: "2",
      name: "Test Cluster 2",
      type: "Standalone",
      status: "Running",
      createdAt: "25 Oct, 2025",
    },
    {
      id: "3",
      name: "Test Cluster 3",
      type: "Distribute",
      status: "Updating",
      createdAt: "12 Oct, 2025",
    },
    {
      id: "4",
      name: "Test Cluster 4",
      type: "Distribute",
      status: "Deleting",
      createdAt: "12 Oct, 2025",
    },
  ]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isChecked, setIsChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter clusters by name
  const filteredData = clusterData.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCheckbox = () => {
    if (isChecked) {
      setSelectedRows([]);
      setIsChecked(false);
    } else {
      const ids = filteredData.map((c) => c.id);
      setSelectedRows(ids);
      setIsChecked(true);
    }
  };

  const handleCheckboxChange = (id) => {
    let newSelected = [];
    if (selectedRows.includes(id)) {
      newSelected = selectedRows.filter((i) => i !== id);
    } else {
      newSelected = [...selectedRows, id];
    }
    setSelectedRows(newSelected);
    setIsChecked(
      newSelected.length === filteredData.length && filteredData.length > 0
    );
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleCreate = () => {
    navigate("add-cluster");
  };

  const handleClusterDetails = (cluster) => {
    navigate(`${cluster.id}/cluster-detail`);
  };

  const handleEdit = (cluster) => {
    console.log("Editing cluster:", cluster.name);
  };

  const handleDelete = (clusterId) => {
    console.log("Deleting cluster:", clusterId);
    setClusterData(clusterData.filter((cluster) => cluster.id !== clusterId));
  };

  return (
    <>
      <section className="content-section mt-4">
        <div className="second mt-3 mt-lg-4">
          <div className="row">
            <div className="col-lg-12">
              <div className="fisrt mb-3 mb-lg-5">
                <div className="row justify-content-between align-items-center">
                  <div className="col-lg-6 col-xl-3 mt-3 mt-lg-0 d-flex align-items-center ">
                    <div className="table-title">Cluster</div>
                  </div>

                  <div className="col-lg-6 d-flex align-items-center justify-content-end">
                    <div>
                      <button className="filter boreder-0 " type="button">
                        <img src={filter} className="me-2" /> Filter
                      </button>
                    </div>

                    <div className="ms-3 me-3">
                      <div className="pseudo-search">
                        <button type="submit">
                          <img src={searchIcon} alt="search" className="search-icon" />
                        </button>{" "}
                        <input
                          type="text"
                          placeholder="Search Cluster"
                          autoFocus
                          required
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      className="add-btn boreder-0 "
                      type="button"
                      onClick={() => handleCreate()}
                    >
                      <img src={plusicon} className="me-2"  />
                      Create Cluster
                    </button>
                  </div>
                </div>
              </div>

              <div className="second table-responsive">
                {filteredData.length === 0 ? (
                  <div className="data-not-found my-5">No Clusters Found</div>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th
                          onClick={handleSort}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          {/* <div className="d-flex justify-content-left align-items-center me-3">
                            <div onClick={toggleCheckbox}>
                              {isChecked ? (
                                <img
                                  src={checkedIcon}
                                  className="checkbox-view"
                                />
                              ) : (
                                <img
                                  src={uncheckIcon}
                                  className="checkbox-view"
                                />
                              )}
                            </div>
                          </div> */}
                          <div className="mt-1">
                            <p>
                              Name{" "}
                              {/* {sortOrder === "asc" ? (
                                <img
                                  src={upicon}
                                  style={{ paddingLeft: "10px" }}
                                />
                              ) : (
                                <img
                                  src={downicon}
                                  style={{ paddingLeft: "10px" }}
                                />
                              )} */}
                            </p>
                          </div>
                        </th>

                        <th>Cluster Type</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Details</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((cluster) => (
                        <tr key={cluster.id}>
                          <td style={{ maxWidth: "200px" }}>
                            <div className="d-flex align-items-center">
                              {/* <div
                                className="d-flex justify-content-left align-items-center me-3"
                                onClick={() => handleCheckboxChange(cluster.id)}
                              >
                                {selectedRows.includes(cluster.id) ? (
                                  <img
                                    src={checkedIcon}
                                    className="checkbox-view"
                                  />
                                ) : (
                                  <img
                                    src={uncheckIcon}
                                    className="checkbox-view"
                                  />
                                )}
                              </div> */}
                              <div
                                className="info d-flex align-items-center cursor-pointer"
                                onClick={() => handleClusterDetails(cluster)}
                              >
                                {/* <img
                                  src={organization_family}
                                  alt=""
                                  className="me-3"
                                /> */}
                                {cluster.name}
                              </div>
                            </div>
                          </td>

                          <td>{cluster.type}</td>
                          <td>
                            <span
                              className={`status ${cluster.status.toLowerCase()}`}
                            >
                              {cluster.status}
                            </span>
                          </td>
                          <td>{cluster.createdAt}</td>
                          <td>
                            <img
                              onClick={() => handleClusterDetails(cluster)}
                              src={workspaceArrow}
                              alt="Go to Dashboard"
                              className="workspace-arrow"
                            />
                          </td>
                          <td>
                            <img
                              src={editbtn}
                              alt="Edit"
                              className="me-3 cursor-pointer"
                              onClick={() => handleEdit(cluster)}
                            />
                            <img
                              src={deletebtn}
                              alt="Delete"
                              className="cursor-pointer"
                              onClick={() => handleDelete(cluster.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cluster;
