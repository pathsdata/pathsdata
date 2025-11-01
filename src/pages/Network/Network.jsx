import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plusicon from "../../assets/images/plus.png";
import filter from "../../assets/images/filter.png";
import upicon from "../../assets/images/upIcon.png";
import downicon from "../../assets/images/downIcon.png";
import searchIcon from "../../assets/images/search.png";
import checkedIcon from "../../assets/images/checked.png";
import uncheckIcon from "../../assets/images/unchecked.svg";
// import settingbtn from "../../assets/images/setting-btn.png";
import editbtn from "../../assets/images/edit-btn.png";
import deletebtn from "../../assets/images/delete-btn.png";
import organization_family from "../../assets/images/organization_family.png";
// import "./WorkspaceCreate.css";

const Network = () => {
  const navigate = useNavigate();

  // Static network data matching the image content
  const [networkData, setNetworkData] = useState([
    {
      id: "1",
      name: "Network 1",
      createdAt: "28 Oct, 2025",
    },
    {
      id: "2",
      name: "Network 2",
      createdAt: "28 Oct, 2025",
    },
    {
      id: "3",
      name: "Network 3",
      createdAt: "28 Oct, 2025",
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]); // store network ids
  const [sortOrder, setSortOrder] = useState("asc");
  const [isChecked, setIsChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered data derived from search query (case-insensitive)
  const filteredData = networkData.filter((network) =>
    network.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCheckbox = () => {
    if (isChecked) {
      setSelectedRows([]);
      setIsChecked(false);
    } else {
      const ids = filteredData.map((network) => network.id);
      setSelectedRows(ids);
      setIsChecked(true);
    }
  };

  // Handle checkbox selection by network id
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
    navigate("/dashboard/network/add-network");
  };

  const handleNetwork = (network) => {
    console.log("Navigating to network:", network.name);
    // Navigate to network details
    // navigate("/network-details");
  };

  const handleEdit = (network) => {
    console.log("Editing network:", network.name);
    // navigate("/edit-network", { state: { network } });
  };

  const handleDelete = (networkId) => {
    console.log("Deleting network:", networkId);
    setNetworkData(networkData.filter((network) => network.id !== networkId));
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
                    <div className="table-title">Network</div>
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
                          <img src={searchIcon} alt="search" />
                        </button>
                        <input
                          type="text"
                          placeholder="Search Network"
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
                      Create Network
                    </button>
                  </div>
                </div>
              </div>

              <div className="second table-responsive">
                {filteredData.length === 0 ? (
                  <div className="data-not-found my-5">No Networks Found</div>
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
                            Created At
                          </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData?.map((network) => (
                          <tr key={network.id}>
                            <td style={{ maxWidth: "200px" }}>
                              <div className="d-flex align-items-center">
                                {/* <div
                                  className="d-flex justify-content-left align-items-center me-3"
                                  onClick={() =>
                                    handleCheckboxChange(network.id)
                                  }
                                >
                                  {selectedRows.includes(network.id) ? (
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
                                  onClick={() => handleNetwork(network)}
                                  style={{ maxWidth: "100%" }}
                                >
                                  {/* <img
                                    src={organization_family}
                                    alt=""
                                    className="me-3"
                                  /> */}
                                  {network.name}
                                </div>
                              </div>
                            </td>

                            <td>{network.createdAt}</td>
                            <td>
                              <img
                                src={editbtn}
                                alt="Edit"
                                className="me-3 cursor-pointer"
                                onClick={() => handleEdit(network)}
                              />
                              <img
                                src={deletebtn}
                                alt="Delete"
                                className="cursor-pointer"
                                onClick={() => handleDelete(network.id)}
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

export default Network;
