import { useState } from "react";
import { Modal } from "react-bootstrap";
import "../OTPVerify.css";

const initialState = {
  name: "",
  description_id: "",
  permission: "",
  role: "",
};

const CreateRoles = ({ show, handleClose }) => {
  const [loading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleCloseHide = () => {
    handleClose();
    setFormData(initialState);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     console.log(formData);

  //     setLoading(true);

  //     try {
  //         const url = UserOrgId
  //             ? `/organization/invite_user`
  //             : `/family/invite_user`;

  //         const payload = {
  //             ...formData,
  //             ...(UserOrgId ? { org_id: UserOrgId } : { family_id: familyId }),
  //         }

  //         const res = await Axios.post(url, payload, authorizationHeaders());

  //         if (res?.data?.statusCode === 200) {
  //             toast.success(res?.data?.message);
  //             setFormData(initialState);
  //             handleClose();
  //             GetUserList();
  //         } else {
  //             toast.error(res?.data?.message);
  //         }
  //     } catch (err) {
  //         console.error("Error Post-User++", err);
  //         if (err?.message === "Network Error") {
  //             toast.error(err?.message);
  //         }
  //         if (err?.response?.data?.statusCode === 400) {
  //             toast.error(err?.response?.data?.message);
  //         }
  //         if (err?.response?.data?.statusCode === "440") {
  //             toast.error("Session expired. Please log in again.");
  //             localStorage.clear();
  //             localStorage.setItem("openCloudOption", false);
  //             navigate("/sign-in");
  //         } else {
  //             toast.error(err?.response?.data?.message || "An error occurred");
  //         }
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  // const GetRoleList = async () => {
  //     try {
  //         const url = UserOrgId
  //             ? `/roles?org_id=${UserOrgId}`
  //             : `/roles?family_id=${familyId}`;

  //         const res = await Axios.get(url, authorizationHeaders());

  //         if (res?.data?.statusCode === 200) {
  //             setRoleList(res?.data?.data);
  //         }
  //         else {
  //             toast.error(res.data?.message);
  //         }

  //     } catch (err) {
  //         console.error("Error Role++", err);

  //         if (err?.response?.data?.statusCode === "440") {
  //             toast.error("Session expired. Please log in again.");
  //             localStorage.clear();
  //             localStorage.setItem("openCloudOption", false);
  //             navigate("/sign-in");
  //         } else {
  //             toast.error(err?.response?.data?.message || "An error occurred");
  //         }
  //     }
  // }

  // useEffect(() => {
  //     GetRoleList();
  // }, [])

  return (
    <Modal show={show} onHide={handleCloseHide} centered className="user-modal">
      <div className="modal-header">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleCloseHide}
        ></button>
      </div>
      <div className="modal-body mt-3">
        <div className="content text-center">
          <span className="mb-1 delete-modal-title">Create New Role</span>
          <p className="mt-3 mt-lg-4">
            Set up a new user role by giving it a name, a short description and
            defining what it can do using permission in JSON format.
          </p>
        </div>
        <div className="mt-4">
          <form>
            <div className="add-input d-inline mb-4">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Please enter name"
                className="mb-4"
                value={formData.name}
                onChange={handleChange}
                autoFocus
                required
              />
            </div>
            <div className="add-input d-inline mb-4">
              <label htmlFor="description_id" className="form-label">
                Descriptiom
              </label>
              <input
                type="description"
                id="description_id"
                name="description_id"
                placeholder="Describe what this role is for"
                className="mb-4"
                value={formData.description_id}
                onChange={handleChange}
                autoFocus
                required
              />
            </div>
            <div className="add-input d-inline mb-1">
              <label htmlFor="description_id" className="form-label">
                Permission(JSON)
              </label>
              <input
                type="Permission"
                id="permission"
                name="permission"
                placeholder="Define custom permissions in JSON format"
                className="mb-4"
                value={formData.permission}
                onChange={handleChange}
                autoFocus
                required
              />
            </div>
            <div className="content text-start">
              <p className="">
               Need help? See AWS IAM JSON examples
              </p>
            </div>
            <div className="mt-4 w-100 d-flex justify-content-between">
              <button
                type="submit"
                className="cancel-button w-50 mt-2"
                onClick={handleCloseHide}
              >
                Cancel
              </button>
              <button
                type="submit"
                // className="save-button w-50 mt-2"
                className={`w-50 mt-2 save-button ${loading ? "loading" : ""} `}
                disabled={loading}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Create Role"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateRoles;
