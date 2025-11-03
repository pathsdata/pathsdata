import { useNavigate } from "react-router-dom";
import deletebtn from "../../assets/images/delete-btn.png";
import editbtn from "../../assets/images/edit-btn.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createNetwork } from "../../services/api";
// import Subnet from "../../Components/Modal/Subnet/Subnet";
// import SecurityGroup from "../../Components/Modal/SecurityGroup/SecurityGroup";
// import EditSubnet from "../../Components/Modal/Subnet/EditSubnet";
// import EditSecurityGroup from "../../Components/Modal/SecurityGroup/EditSecurityGroup";
import left_arrow from "../../assets/images/nvigation_arrows/left_arrow.png";

const AddNetwork = () => {
  const navigate = useNavigate();
  // Support both workspace_id (new) and family_id (legacy) for backward compatibility
  const workspaceId = localStorage.getItem("workspace_id") || localStorage.getItem("family_id");

  const [loading, setLoading] = useState(false);
  const [subnetList, setSubnetList] = useState([]);
  const [securityList, setSecurityList] = useState([]);

  const [formData, setFormData] = useState({
    vpc_name: "",
    vpc_id: "",
    security_group_ids: [],
    subnet_ids: [],
    region: "",
    endpoint: "",
  });


  // ✅ Static dummy data instead of API
  useEffect(() => {
    const staticSubnets = ["subnet-001a", "subnet-002b", "subnet-003c"];
    const staticSecurityGroups = ["sg-0145", "sg-0289", "sg-0321"];

    setSubnetList(staticSubnets);
    setSecurityList(staticSecurityGroups);

    setFormData((prev) => ({
      ...prev,
      subnet_ids: staticSubnets,
      security_group_ids: staticSecurityGroups,
      vpc_name: "Demo-VPC",
      vpc_id: "vpc-0098",
      endpoint: "vpc-endpoint-xyz123",
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (index) => {
    const updatedSubnets = subnetList.filter((_, i) => i !== index);
    setSubnetList(updatedSubnets);
    toast.info("Subnet deleted from static list");
  };

  const handleSecurityDelete = (index) => {
    const updatedSecurity = securityList.filter((_, i) => i !== index);
    setSecurityList(updatedSecurity);
    toast.info("Security group deleted from static list");
  };

  const handleCancel = () => {
    navigate(-1);
    localStorage.removeItem("subnets");
    localStorage.removeItem("Securitygroup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { vpc_name, vpc_id, security_group_ids, subnet_ids, endpoint } =
      formData;

    if (
      !vpc_name.trim() ||
      !vpc_id.trim() ||
      !endpoint.trim() ||
      security_group_ids.length === 0 ||
      subnet_ids.length === 0
    ) {
      setLoading(false);
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      // Transform field names to camelCase per API schema
      const payload = {
        vpcName: vpc_name,
        vpcId: vpc_id,
        region: formData.region || "",
        subnetIds: subnet_ids,
        securityGroupIds: security_group_ids,
        endpoint: endpoint
      };

      // workspace_id is now a path parameter, not in the body
      const res = await createNetwork(workspaceId, payload);

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201 || res?.data?.success) {
        toast.success(res?.data?.message || "Network created successfully!");
        navigate("/dashboard/network");
      }
    } catch (err) {
      console.error("Error creating network:", err);
      // Error handling is done by Axios interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pd mt-4 add-section-background">
        <div className="workspace-header">
          <h1 className="workspace-title">Network</h1>
          <button
            className="back-button"
            onClick={() => navigate("/dashboard/workspace")}
          >
            <img src={left_arrow} alt="Back" />
            <span>Back</span>
          </button>
        </div>

        <section className="add-content-section">
          <div className="add-section row">
            <div className="col-lg-12">
              <p className="add-title">Create VPC</p>
            </div>
          </div>
          <div className="second">
            <div className="row mt-4">
              <div className="col-lg-6 mb-3 ">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <div className="add-input">
                  <input
                    type="text"
                    name="vpc_name"
                    placeholder="Enter Name"
                    value={formData.vpc_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-3 ">
                <label htmlFor="Name" className="form-label">
                  VPC ID
                </label>
                <div className="add-input">
                  <input
                    type="text"
                    name="vpc_id"
                    placeholder="Enter VPC"
                    value={formData.vpc_id}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-lg-6 mb-3 ">
                <div className="subnet-view">
                  <div className="d-flex justify-content-between subnet">
                    <label className="form-label">Subnet</label>
                    <button
                      className="save-btn"
                      type="button"
                      onClick={() => setSubnetShow(true)}
                    >
                      + Add
                    </button>
                  </div>

                  {subnetList.map((item, index) => (
                    <div className="add-input mt-3 mb-3" key={index}>
                      <div className="input-group">
                        <input type="text" value={item} readOnly />
                        <span className="input-delete">
                          <img
                            src={editbtn}
                            alt="Edit"
                            className="me-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEditSubnet(item)}
                          />
                          <img
                            src={deletebtn}
                            alt="Delete"
                            onClick={() => handleDelete(index)}
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-6 mb-3 ">
                <div className="subnet-view">
                  <div className="d-flex justify-content-between subnet">
                    <label className="form-label">Security Group</label>
                    <button
                      className="save-btn"
                      type="button"
                      onClick={() => setSecurityShow(true)}
                    >
                      + Add
                    </button>
                  </div>
                  {securityList.map((item, index) => (
                    <div className="add-input mt-3 mb-3" key={index}>
                      <div className="input-group">
                        <input type="text" value={item} readOnly />
                        <span className="input-delete">
                          <img
                            src={editbtn}
                            alt="Edit"
                            className="me-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEditSecurity(item)}
                          />
                          <img
                            src={deletebtn}
                            alt="Delete"
                            onClick={() => handleSecurityDelete(index)}
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <label htmlFor="region" className="form-label">
                VPC Endpoint
              </label>
              <div className="col-lg-12 mb-3 ">
                <div className="add-input">
                  <input
                    type="text"
                    name="endpoint"
                    placeholder="Enter Endpoint"
                    value={formData.endpoint}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="d-flex justify-content-center py-5">
          <button
            className="cancel-button me-2 me-md-4"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={`save-button ${loading ? "loading" : ""}`}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm me-3 ms-3"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNetwork;
