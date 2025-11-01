import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plusicon from "../../../assets/images/plus.png";
import filter from "../../../assets/images/filter.png";
import upicon from "../../../assets/images/upIcon.png";
import downicon from "../../../assets/images/downIcon.png";
import checkedIcon from "../../../assets/images/checked.png";
import uncheckIcon from "../../../assets/images/unchecked.svg";
import editbtn from "../../../assets/images/edit-btn.png";
import deletebtn from "../../../assets/images/delete-btn.png";
import organization_family from "../../../assets/images/organization_family.png";
import CreateRoles from "../../../components/Models/Users/Roles/CreateRoles";
import searchIcon from "../../../assets/images/search.png";

const initialState = {
  createUser: false,
  editUser: false,
  deleteUser: false,
};

const Roles = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([
    {
      id: "1",
      role: "fam_admin",
      type: "predefined",
      description: "Admin of family",
      created_at: "12 Oct, 2025",
    },
    {
      id: "2",
      role: "fam_admin",
      type: "predefined",
      description: "Admin of family",
      created_at: "12 Oct, 2025",
    },
    {
      id: "3",
      role: "fam_cluster_admin",
      type: "predefined",
      description: "Admin of cluster under family",
      created_at: "12 Oct, 2025",
    },
  ]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isChecked, setIsChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(initialState);

  const filteredData = userData.filter((item) =>
    item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClose = () => {
    setShow(initialState);
  };

  const toggleCheckbox = () => {
    if (isChecked) {
      setSelectedRows([]);
      setIsChecked(false);
    } else {
      const ids = filteredData.map((item) => item.id);
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

  return (
    <>
      <section className="content-section mt-4">
        <div className="second mt-3 mt-lg-4">
          <div className="row">
            <div className="col-lg-12">
              <div className="fisrt mb-3 mb-lg-5">
                <div className="row justify-content-between align-items-center">
                  <div className="col-lg-6 col-xl-3 mt-3 mt-lg-0 d-flex align-items-center ">
                    <div className="table-title">Role</div>
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
                          placeholder="Search Role"
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
                      onClick={() =>
                        setShow((prev) => ({
                          ...prev,
                          createUser: true,
                        }))
                      }
                    >
                      <img src={plusicon} className="me-2" />
                      Create Role
                    </button>
                  </div>
                </div>
              </div>

              <div className="second table-responsive">
                {filteredData.length === 0 ? (
                  <div className="data-not-found my-5">No Roles Found</div>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "20%" }}>Role</th>
                        <th style={{ width: "15%" }}>Type</th>
                        <th style={{ width: "35%" }}>Description</th>
                        <th style={{ width: "20%" }}>Created At</th>
                        <th style={{ width: "10%" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.role}</td>
                          <td>{item.type}</td>
                          <td>{item.description}</td>
                          <td>{item.created_at}</td>
                          <td>
                            <img
                              src={editbtn}
                              alt="Edit"
                              className="me-3 cursor-pointer"
                            />
                            <img
                              src={deletebtn}
                              alt="Delete"
                              className="cursor-pointer"
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

      <CreateRoles show={show.createUser} handleClose={handleClose} />
    </>
  );
};

export default Roles;
