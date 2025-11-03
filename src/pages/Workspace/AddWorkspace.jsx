"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createWorkspace } from "../../services/api";
import "./WorkspaceCreate.css";

import third from "../../assets/images/workspace/3.svg";
import fourth from "../../assets/images/workspace/4.svg";
import left_arrow from "../../assets/images/nvigation_arrows/left_arrow.png";

const AddWorkspace = () => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState("quick-start");

  const [formData, setFormData] = useState({
    org_id: "",
    family_name: "",
    region: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.family_name.trim()) {
      toast.error("Please enter a workspace name");
      return;
    }

    if (!formData.region) {
      toast.error("Please select a region");
      return;
    }

    setLoader(true);

    try {
      // Transform form data to match API schema
      const payload = {
        name: formData.family_name,
        awsRegion: formData.region,
        // deploymentType could be added to settings if needed
        settings: {
          deploymentType: selectedOption // quick-start or pathsdata
        }
      };

      const response = await createWorkspace(payload);

      if (response?.data?.workspaceId || response?.status === 201) {
        toast.success("Workspace created successfully!");
        navigate("/dashboard/workspace");
      }
    } catch (error) {
      console.error("Error creating workspace:", error);
      // Error handling is done by Axios interceptor
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="workspace-container">
        {/* Header Section */}
        <div className="workspace-header ms-4">
          <h1 className="workspace-title">Workspace</h1>
          <button 
            className="back-button" 
            onClick={() => navigate("/dashboard/workspace")}
          >
            <img src={left_arrow} alt="Back" />
            <span>Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="workspace-content workspace-section">
          {/* Create Workspace Section */}
          <section className="">
            <h2 className="section-title">Create Workspace</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="family_name" className="form-label">
                  Workspace Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Workspace Name"
                  id="family_name"
                  name="family_name"
                  value={formData.family_name}
                  onChange={handleChange}
                  autoFocus
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="region" className="form-label">
                  Region
                </label>
                <select
                  name="region"
                  id="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select Region</option>
                  <option value="us-east-1">US East (N. Virginia)</option>
                  <option value="us-east-2">US East (Ohio)</option>
                  <option value="us-west-1">US West (N. California)</option>
                  <option value="us-west-2">US West (Oregon)</option>
                  <option value="ca-central-1">Canada (Central)</option>
                  <option value="ca-west-1">Canada West (Calgary)</option>
                  <option value="mx-central-1">Mexico (Central)</option>
                  <option value="eu-west-1">EU (Ireland)</option>
                  <option value="ap-southeast-1">
                    Asia Pacific (Singapore)
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* Combined Options Section */}
          <section className="">
            <h2 className="section-title">Storage And Compute</h2>

            <div className="all-options-grid">
            

              <label
                className={`option-card ${
                  selectedOption === "quick-start" ? "selected" : ""
                }`}
              >
                <div className="option-content-wrapper">
                  <div className="option-icon">
                    <img src={third} alt="Quick Start" />
                  </div>
                  <div className="option-text-content">
                    <div className="option-header">
                      <h3 className="option-title">
                        Automatically With Quick Start
                      </h3>
                      <input
                        type="radio"
                        name="workspace-option"
                        value="quick-start"
                        checked={selectedOption === "quick-start"}
                        onChange={() => handleOptionSelect("quick-start")}
                        className="option-radio"
                      />
                    </div>
                    <p className="option-description">
                      Auto Deploy In AWS. Resources Will Be Created In
                      Databricks - Managed VPC.
                    </p>
                  </div>
                </div>
              </label>

              <label
                className={`option-card ${
                  selectedOption === "pathsdata" ? "selected" : ""
                }`}
              >
                <div className="option-content-wrapper">
                  <div className="option-icon">
                    <img src={fourth} alt="PATHSDATA" />
                  </div>
                  <div className="option-text-content">
                    <div className="option-header">
                      <h3 className="option-title">Manually In PATHSDATA</h3>
                      <input
                        type="radio"
                        name="workspace-option"
                        value="pathsdata"
                        checked={selectedOption === "pathsdata"}
                        onChange={() => handleOptionSelect("pathsdata")}
                        className="option-radio"
                      />
                    </div>
                    <p className="option-description">
                      Setup Advanced Configs Such As Customer - Manage VPC And
                      Customer Managed Keys.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="workspace-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/dashboard/workspace")}
            disabled={loader}
          >
            Cancel
          </button>

          <button
            type="button"
            className={`btn-create ${loader ? "loading" : ""}`}
            disabled={loader}
            onClick={handleSubmit}
          >
            {loader ? (
              <span className="spinner" role="status" aria-hidden="true"></span>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddWorkspace;
