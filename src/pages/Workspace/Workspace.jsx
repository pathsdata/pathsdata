import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plusicon from "../../assets/images/plus.png";
import filter from "../../assets/images/filter.png";
import upicon from "../../assets/images/upIcon.png";
import downicon from "../../assets/images/downIcon.png";
import checkedIcon from "../../assets/images/checked.png";
import uncheckIcon from "../../assets/images/unchecked.svg";
// import settingbtn from "../../assets/images/setting-btn.png";
import editbtn from "../../assets/images/edit-btn.png";
import deletebtn from "../../assets/images/delete-btn.png";
import organization_family from "../../assets/images/organization_family.png";
import "./WorkspaceCreate.css";
import searchIcon from "../../assets/images/search.png";
import workspaceArrow from "../../assets/images/workspace_arrow.png";

const Workspace = () => {
  const navigate = useNavigate();

  // Static workspace data
  const [workspaceData, setWorkspaceData] = useState([
    {
      id: "1",
      name: "Workspace 23",
      region: "US-East",
      status: "Running",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Workspace 456",
      region: "US-West",
      status: "Running",
      createdAt: "2024-02-20",
    },
    {
      id: "3",
      name: "Analytics Hub",
      region: "EU-Central",
      status: "Creating",
      createdAt: "2024-03-10",
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]); // store workspace ids
  const [sortOrder, setSortOrder] = useState("asc");
  const [isChecked, setIsChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered data derived from search query (case-insensitive)
  const filteredData = workspaceData.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCheckbox = () => {
    if (isChecked) {
      setSelectedRows([]);
      setIsChecked(false);
    } else {
      const ids = filteredData.map((w) => w.id);
      setSelectedRows(ids);
      setIsChecked(true);
    }
  };

  // Handle checkbox selection by workspace id
  const handleCheckboxChange = (id) => {
    let newSelected = [];
    if (selectedRows.includes(id)) {
      newSelected = selectedRows.filter((i) => i !== id);
    } else {
      newSelected = [...selectedRows, id];
    }
    setSelectedRows(newSelected);
    // mark header checkbox as checked only if all visible rows are selected
    setIsChecked(
      newSelected.length === filteredData.length && filteredData.length > 0
    );
  };

  // Sort table by column
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleCreate = () => {
    navigate("/dashboard/workspace/add-workspace");
  };

  const handleWorkspace = (workspace) => {
    navigate(`/workspace/${workspace.id}/home`);
  };

  const handleEdit = (workspace) => {
    console.log("Editing workspace:", workspace.name);
    // navigate("/edit-workspace", { state: { workspace } });
  };

  const handleDelete = (workspaceId) => {
    console.log("Deleting workspace:", workspaceId);
    setWorkspaceData(
      workspaceData.filter((workspace) => workspace.id !== workspaceId)
    );
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
                    <div className="table-title ">Workspace</div>
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
                          placeholder="Search Workspace"
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
                      Create Workspace
                      <img src={plusicon} className="me-2" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="second table-responsive">
                {filteredData.length === 0 ? (
                  <div className="data-not-found my-5">No Workspaces Found</div>
                ) : (
                  <>
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

                          <th
                            onClick={handleSort}
                            style={{ cursor: "pointer" }}
                          >
                            Region
                          </th>
                          <th
                            onClick={handleSort}
                            style={{ cursor: "pointer" }}
                          >
                            Status
                          </th>
                          <th
                            onClick={handleSort}
                            style={{ cursor: "pointer" }}
                          >
                            Created At
                          </th>
                          <th
                            onClick={handleSort}
                            style={{ cursor: "pointer" }}
                          >
                            Details
                          </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData?.map((workspace) => (
                          <tr key={workspace.id}>
                            <td style={{ maxWidth: "200px" }}>
                              <div className="d-flex align-items-center">
                                {/* <div
                                  className="d-flex justify-content-left align-items-center me-3"
                                  onClick={() =>
                                    handleCheckboxChange(workspace.id)
                                  }
                                >
                                  {selectedRows.includes(workspace.id) ? (
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
                                  onClick={() => handleWorkspace(workspace)}
                                  style={{ maxWidth: "100%" }}
                                >
                                  {/* <img
                                    src={organization_family}
                                    alt=""
                                    className="me-3"
                                  /> */}
                                  {workspace.name}
                                </div>
                              </div>
                            </td>

                            <td>{workspace.region}</td>
                            <td>
                              <span
                                className={`status ${workspace.status.toLowerCase()}`}
                              >
                                {workspace.status}
                              </span>
                            </td>
                            <td>{workspace.createdAt}</td>
                            <td>
                              <img
                                onClick={() => handleWorkspace(workspace)}
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
                                onClick={() => handleEdit(workspace)}
                              />
                              <img
                                src={deletebtn}
                                alt="Delete"
                                className="cursor-pointer"
                                onClick={() => handleDelete(workspace.id)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Workspace;
