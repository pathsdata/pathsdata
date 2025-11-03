import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import CreateUsers from "../../components/Models/Users/CreateUsers";
import EditUsers from "../../components/Models/Users/EditUsers";
import searchIcon from "../../assets/images/search.png";
import {
  listOrganizationMembers,
  removeOrganizationMember
} from "../../services/api";

// import "./WorkspaceCreate.css";
const initialState = {
  createUser: false,
  editUser: false,
  deleteUser: false,
};

const Users = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]); // store user ids
  const [sortOrder, setSortOrder] = useState("asc");
  const [isChecked, setIsChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(initialState);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteId, setDeleteId] = useState("");

  // Filtered data derived from search query (case-insensitive)
  const filteredData = userData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch members from API
  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const UserOrgId = localStorage.getItem("user_org_id");
      if (!UserOrgId) {
        toast.error("Organization ID not found");
        return;
      }

      const response = await listOrganizationMembers(UserOrgId);

      if (response?.data?.members) {
        // Transform API response to match table format
        const transformedData = response.data.members.map(member => ({
          id: member.userId,
          name: member.fullName || "N/A",
          email: member.email,
          role: member.roleName,
          roleId: member.roleId,
          // WorkspaceMemberResponse has status, OrganizationMemberResponse doesn't
          // Assume "active" for org members (since they've joined)
          status: member.status || "active",
          isOwner: member.isOwner,
          joinedAt: member.joinedAt
        }));
        setUserData(transformedData);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      // Error handling done by Axios interceptor
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch members on component mount
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleClose = () => {
    setShow(initialState);
    setDeleteId("");
  };
  const toggleCheckbox = () => {
    if (isChecked) {
      setSelectedRows([]);
      setIsChecked(false);
    } else {
      const ids = filteredData.map((user) => user.id);
      setSelectedRows(ids);
      setIsChecked(true);
    }
  };

  // Handle checkbox selection by user id
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
    navigate("/dashboard/add-user");
  };

  const handleUser = (user) => {
    console.log("Navigating to user:", user.name);
    // Navigate to user details
    // navigate("/user-details");
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this user?")) {
      return;
    }

    try {
      const UserOrgId = localStorage.getItem("user_org_id");
      await removeOrganizationMember(UserOrgId, userId);

      toast.success("User removed successfully");

      // Refresh the users list
      fetchMembers();
    } catch (error) {
      console.error("Error removing user:", error);
      // Error handling done by Axios interceptor
    }
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
                    <div className="table-title">Users</div>
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
                        </button>{" "}
                        <input
                          type="text"
                          placeholder="Search User"
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
                      onClick={() => {
                        // navigate("/add-member");
                        setShow((prev) => ({
                          prev,
                          createUser: true,
                        }));
                      }}
                    >
                      <img src={plusicon} className="me-2" />
                      Invite Users
                    </button>
                  </div>
                </div>
              </div>

              <div className="second table-responsive">
                {loading ? (
                  <div className="data-not-found my-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="mt-2">Loading users...</div>
                  </div>
                ) : filteredData.length === 0 ? (
                  <div className="data-not-found my-5">No Users Found</div>
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
                            Email
                          </th>
                          <th
                            onClick={handleSort}
                            style={{ cursor: "pointer" }}
                          >
                            Role
                          </th>
                          <th
                            onClick={handleSort}
                            style={{ cursor: "pointer" }}
                          >
                            Status
                          </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData?.map((user) => (
                          <tr key={user.id}>
                            <td style={{ maxWidth: "200px" }}>
                              <div className="d-flex align-items-center">
                                {/* <div
                                  className="d-flex justify-content-left align-items-center me-3"
                                  onClick={() => handleCheckboxChange(user.id)}
                                >
                                  {selectedRows.includes(user.id) ? (
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
                                  onClick={() => handleUser(user)}
                                  style={{ maxWidth: "100%" }}
                                >
                                  {/* <img
                                    src={organization_family}
                                    alt=""
                                    className="me-3"
                                  /> */}
                                  {user.name}
                                </div>
                              </div>
                            </td>

                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                              <span
                                className={`status ${user.status.toLowerCase()}`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td>
                              <img
                                src={editbtn}
                                alt="Edit"
                                className="me-3 cursor-pointer"
                                onClick={() => handleEdit(user)}
                              />
                              <img
                                src={deletebtn}
                                alt="Delete"
                                className="cursor-pointer"
                                onClick={() => handleDelete(user.id)}
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
      <CreateUsers show={show.createUser} handleClose={handleClose} GetUserList={fetchMembers} />
      {showEditModal && (
        <EditUsers
          show={showEditModal}
          handleClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          GetUserList={fetchMembers}
        />
      )}
    </>
  );
};

export default Users;
