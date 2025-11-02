import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrganization } from "../../../services/api";
import "../SignIn.css";

export default function CreateOrganization() {
  const navigate = useNavigate();
  const [org, setOrg] = useState({
    name: "",
    description: "",
    account: "123456789012",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrg((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!org.name.trim()) {
      toast.error("Please enter organization name");
      return;
    }

    setLoading(true);

    try {
      const response = await createOrganization({
        name: org.name,
        description: org.description || undefined,
      });

      if (response.data) {
        // API returns organizationId (camelCase) per OpenAPI schema
        const organizationId = response.data.organizationId || response.data.organization_id || response.data.id;

        if (organizationId) {
          localStorage.setItem("user_org_id", organizationId);
        }

        toast.success(response.data.message || "Organization created successfully!");
        navigate('/dashboard/home');
      }
    } catch (error) {
      console.error("Error creating organization:", error);
      // Error handling is done by Axios interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="row justify-content-center align-items-center newsignin-section new-auth">
      <div className="col-lg-5">
        <div className="header">
          <h4>Create Organization</h4>
          <p>
            Reclaim control of your data with confidence. Secure, seamless{" "}
            <br className="d-none d-xl-block" />
            and built to empower you every step of the way.
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-inputs">
            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                Organization Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={org.name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Please enter organization name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={org.description}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Please enter description"
                rows="3"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="account" className="form-label">
                Account Number
              </label>
              <input
                type="text"
                id="account"
                name="account"
                value={org.account}
                onChange={handleInputChange}
                className="form-control"
                placeholder="123456789012"
                readOnly
              />
              
            </div>
          </div>

          <div className="mt-5 last-btn">
            <button
              type="submit"
              className={`profile-btn ${loading ? "loading" : ""} w-100`}
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
