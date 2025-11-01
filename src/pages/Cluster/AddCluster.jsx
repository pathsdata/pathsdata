import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import left_arrow from "../../assets/images/nvigation_arrows/left_arrow.png";

export const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "rgba(4, 9, 32, 1)",
    border: "none",
    boxShadow: "none",
    color: "rgba(255, 255, 255, 1)",
    padding: "7px 13px",
    fontSize: "1rem",
    borderRadius: "10px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "rgb(0, 47, 255)"
      : state.isFocused
      ? "#0d6efd"
      : "rgba(4, 9, 32, 1)",
    color: "white",
    fontSize: "1rem",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "rgba(4, 9, 32, 1)",
    border: "1px solid rgb(255, 255, 255)",
    borderRadius: "5px",
    marginRight: "5px",
    color: "rgba(255, 255, 255, 1)",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "rgba(255, 255, 255, 1)",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "rgba(255, 255, 255, 1)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "rgba(255, 255, 255, 1)",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "rgba(255, 255, 255, 1)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgba(4, 9, 32, 1)",
    border: "1px solid #333",
    borderRadius: "10px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(255, 255, 255, 1)",
  }),
};

const initialState = {
  cluster_name: "",
  cluster_type: "standalone",
  assume_role_arn: "",
  network: "",
  region: "",
  subnet_id: "",
  sg_ids: [],
  instance_type: "",
  runtime: "",
  ebs_size: "",
  instance_profile_arn: "",
  worker_details: {
    instance_type: "",
    instance_profile_arn: "",
    subnet_id: "",
    sg_ids: [],
    ebs_size: "",
    number_worker_nodes: "",
  },
};

const AddCluster = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("worker_")) {
      const key = name.replace("worker_", "");
      setFormData((prev) => ({
        ...prev,
        worker_details: {
          ...prev.worker_details,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Static Form Submitted", formData);
    alert("Static cluster form submitted (no API call).");
  };

  const staticNetworkList = [
    {
      vpc_name: "VPC-Primary",
      subnet_ids: ["subnet-111", "subnet-222"],
      security_group_ids: ["sg-123", "sg-456"],
    },
  ];

  const staticResourcesIAM = [
    {
      instance_profile_name: "MasterProfile",
      instance_profile_arn: "arn:aws:iam::111:instance-profile/MasterProfile",
    },
  ];

  const staticCredentialList = [
    { role_name: "AdminRole", role_arn: "arn:aws:iam::111:role/AdminRole" },
  ];

  const staticRuntimeList = ["v1.0", "v1.1", "v2.0"];
  const selectedNetworkList = staticNetworkList[0];

  return (
    <div className="pd mt-4">
     
        <div className="workspace-header">
          <h1 className="workspace-title">Create Workspace</h1>
          <button 
            className="back-button" 
            onClick={() => navigate("/dashboard/workspace")}
          >
            <img src={left_arrow} alt="Back" />
            <span>Back</span>
          </button>
        </div>

      <form onSubmit={handleSubmit}>
        {/* BASIC SETTINGS */}
        <section className="add-content-section mb-5">
          <p className="cluster-section-title">Basic Setting</p>
          <div className="second mt-3 mt-lg-4">
            <div className="row mt-4">
              <div className="col-lg-6 mb-4">
                <label className="form-label">Name</label>
                <div className="add-input">
                  <input
                    type="text"
                    name="cluster_name"
                    placeholder="Enter Name"
                    value={formData.cluster_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <label className="form-label">Cluster Type</label>
                <div className="add-input">
                  <select
                    name="cluster_type"
                    value={formData.cluster_type}
                    onChange={handleChange}
                  >
                    <option value="standalone">Standalone</option>
                    <option value="distributed">Distributed</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <label className="form-label">Credential Configure</label>
                <div className="add-input">
                  <select
                    name="assume_role_arn"
                    value={formData.assume_role_arn}
                    onChange={handleChange}
                  >
                    <option value="">Select Credential Configure</option>
                    {staticCredentialList.map((i, index) => (
                      <option key={index} value={i.role_arn}>
                        {i.role_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NETWORK SETTINGS */}
        <section className="add-content-section mb-5">
          <p className="cluster-section-title">Network Setting</p>
          <div className="second mt-3 mt-lg-4">
            <div className="row mt-4">
              <div className="col-lg-6 mb-4">
                <label className="form-label">Network</label>
                <div className="add-input">
                  <select
                    name="network"
                    value={formData.network}
                    onChange={handleChange}
                  >
                    <option value="">Select Network</option>
                    {staticNetworkList.map((i, index) => (
                      <option key={index} value={i.vpc_name}>
                        {i.vpc_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <label className="form-label">Master Node Subnet</label>
                <div className="add-input">
                  <select
                    name="subnet_id"
                    value={formData.subnet_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Master Node Subnet</option>
                    {selectedNetworkList.subnet_ids.map((i, idx) => (
                      <option key={idx} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <label className="form-label">Master Node Security Group</label>
                <div className="add-input">
                  <Select
                    isMulti
                    options={selectedNetworkList.security_group_ids.map(
                      (i) => ({
                        label: i,
                        value: i,
                      })
                    )}
                    value={formData.sg_ids.map((i) => ({
                      label: i,
                      value: i,
                    }))}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions.map(
                        (option) => option.value
                      );
                      handleChange({
                        target: { name: "sg_ids", value: selectedValues },
                      });
                    }}
                    styles={customSelectStyles}
                  />
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <label className="form-label">Region</label>
                <div className="add-input">
                  <input
                    type="text"
                    name="region"
                    placeholder="Enter Region"
                    value={formData.region}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NODE CONFIGURATION */}
        <section className="add-content-section mb-5">
          <p className="cluster-section-title">Node Configuration</p>
          <div className="second mt-3 mt-lg-4">
            <div className="row mt-4">
              <div className="col-lg-6 mb-4">
                <label className="form-label">Master Node Type</label>
                <div className="add-input">
                  <select
                    name="instance_type"
                    value={formData.instance_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Master Node Type</option>
                    <option value="t2.micro">t2.micro</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <label className="form-label">PATHSDATA Run Time</label>
                <div className="add-input">
                  <select
                    name="runtime"
                    value={formData.runtime}
                    onChange={handleChange}
                  >
                    <option value="">Select PATHSDATA Run Time</option>
                    {staticRuntimeList.map((r, idx) => (
                      <option key={idx} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <label className="form-label">EBS Size</label>
                <div className="add-input">
                  <input
                    type="text"
                    name="ebs_size"
                    placeholder="Enter EBS Size"
                    value={formData.ebs_size}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <label className="form-label">Master Node Profile</label>
                <div className="add-input">
                  <select
                    name="instance_profile_arn"
                    value={formData.instance_profile_arn}
                    onChange={handleChange}
                  >
                    <option value="">Select Master Node Profile</option>
                    {staticResourcesIAM.map((i, idx) => (
                      <option key={idx} value={i.instance_profile_arn}>
                        {i.instance_profile_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONDITIONAL WORK NODE CONFIGURATION */}
        {formData.cluster_type === "distributed" && (
          <section className="add-content-section mb-5">
            <p className="cluster-section-title">Work Node Configuration</p>
            <div className="second mt-3 mt-lg-4">
              <div className="row mt-4">
                <div className="col-lg-6 mb-4">
                  <label className="form-label">Work Node Type</label>
                  <div className="add-input">
                    <select
                      name="worker_instance_type"
                      value={formData.worker_details.instance_type}
                      onChange={handleChange}
                    >
                      <option value="">Select Work Node Type</option>
                      <option value="t2.micro">t2.micro</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-6 mb-4">
                  <label className="form-label">Work Node Profile</label>
                  <div className="add-input">
                    <select
                      name="worker_instance_profile_arn"
                      value={formData.worker_details.instance_profile_arn}
                      onChange={handleChange}
                    >
                      <option value="">Select Work Node Profile</option>
                      {staticResourcesIAM.map((i, idx) => (
                        <option key={idx} value={i.instance_profile_arn}>
                          {i.instance_profile_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6 mb-4">
                  <label className="form-label">Work Node Subnet</label>
                  <div className="add-input">
                    <select
                      name="worker_subnet_id"
                      value={formData.worker_details.subnet_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Work Node Subnet</option>
                      {selectedNetworkList.subnet_ids.map((i, idx) => (
                        <option key={idx} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6 mb-4">
                  <label className="form-label">Work Node Security Group</label>
                  <div className="add-input">
                    <Select
                      isMulti
                      options={selectedNetworkList.security_group_ids.map(
                        (i) => ({
                          label: i,
                          value: i,
                        })
                      )}
                      value={formData.worker_details.sg_ids.map((i) => ({
                        label: i,
                        value: i,
                      }))}
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map(
                          (option) => option.value
                        );
                        handleChange({
                          target: {
                            name: "worker_sg_ids",
                            value: selectedValues,
                          },
                        });
                      }}
                      styles={customSelectStyles}
                    />
                  </div>
                </div>

                <div className="col-lg-6 mb-4">
                  <label className="form-label">Work Node EBS</label>
                  <div className="add-input">
                    <input
                      type="text"
                      name="worker_ebs_size"
                      placeholder="Enter Work Node EBS"
                      value={formData.worker_details.ebs_size}
                      onChange={handleChange}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                  </div>
                </div>

                <div className="col-lg-6 mb-4">
                  <label className="form-label">Number of Workers</label>
                  <div className="add-input">
                    <input
                      type="text"
                      name="worker_number_worker_nodes"
                      placeholder="Enter Number of Workers"
                      value={formData.worker_details.number_worker_nodes}
                      onChange={handleChange}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="d-flex justify-content-center py-5">
          <button
            type="button"
            className="cancel-button me-2 me-md-4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`save-button ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCluster;
