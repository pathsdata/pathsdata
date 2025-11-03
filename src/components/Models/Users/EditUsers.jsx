import { useEffect, useState, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getRoles, updateOrganizationMember, updateWorkspaceMember } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const initialState = {
    name: "",
    email_id: "",
    role: "",
};

const EditUsers = ({ show, handleClose, GetUserList, user }) => {

    const navigate = useNavigate();

    // Support both workspace_id (new) and family_id (legacy) for backward compatibility
    const workspaceId = localStorage.getItem("workspace_id") || localStorage.getItem("family_id");
    const UserOrgId = localStorage.getItem("user_org_id");

    const [roleList, setRoleList] = useState([]);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    console.log(formData);


    const handleCloseHide = () => {
        handleClose();
        setFormData(initialState);
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        setLoading(true);

        try {
            // Find the role ID from the selected role name
            const selectedRole = roleList.find(r => r.role_name === formData.role);
            if (!selectedRole) {
                toast.error("Please select a valid role");
                setLoading(false);
                return;
            }

            // Get the user ID from the user prop
            const userId = user?.id || user?.user_id;
            if (!userId) {
                toast.error("User ID not found");
                setLoading(false);
                return;
            }

            // Payload should only contain roleId per API schema
            const payload = {
                roleId: selectedRole.id || selectedRole.role_id
            };

            const res = UserOrgId
                ? await updateOrganizationMember(UserOrgId, userId, payload)
                : await updateWorkspaceMember(workspaceId, userId, payload);

            if (res?.data?.statusCode === 200 || res?.data?.success) {
                toast.success(res?.data?.message || "User updated successfully");
                setFormData(initialState);
                handleClose();
                GetUserList();
            }
        } catch (err) {
            console.error("Error updating user:", err);
            // Error handling is done by Axios interceptor
        } finally {
            setLoading(false);
        }
    };


    const GetRoleList = useCallback(async () => {
        try {
            const params = UserOrgId
                ? { org_id: UserOrgId }
                : { workspace_id: workspaceId };

            const res = await getRoles(params);

            if (res?.data?.statusCode === 200 || res?.data) {
                setRoleList(res?.data?.data || res?.data);
            }
        } catch (err) {
            console.error("Error fetching roles:", err);
            // Error handling is done by Axios interceptor
        }
    }, [UserOrgId, workspaceId]);

    useEffect(() => {
        if (show) {
            GetRoleList();
        }
    }, [show, GetRoleList])

    useEffect(() => {
        setFormData({
            name: user?.name,
            email_id: user?.email_id,
            role: user?.role?.name,
        });
    }, [user]);


    return (
        <Modal show={show} onHide={handleCloseHide} centered className='user-modal'>
            <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseHide}></button>
            </div>
            <div className="modal-body mt-3">
                <div className="content text-center">
                    <span className="mb-1 delete-modal-title">Edit User</span>
                    <p className='mt-3 mt-lg-4'>
                        Edit a new team member by entering their details below.
                        You can assign an existing role or create a new one if
                        needed.
                    </p>
                </div>
                <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                        <div className="add-input d-inline mb-4">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                placeholder="Enter Name"
                                className='mb-4'
                                value={formData?.name}
                                onChange={handleChange}
                                autoFocus
                                readOnly
                            />
                        </div>
                        <div className="add-input d-inline mb-4">
                            <label htmlFor="email_id" className="form-label">Email</label>
                            <input
                                type="email"
                                id='email_id'
                                name='email_id'
                                placeholder="Enter Email"
                                className='mb-4'
                                value={formData?.email_id}
                                onChange={handleChange}
                                autoFocus
                                readOnly
                            />
                        </div>
                        <div className="add-input d-inline mb-4">
                            <label htmlFor="name" className="form-label">Role</label>

                            <select
                                name="role"
                                id="role"
                                value={formData?.role}
                                className='mb-2'
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Role</option>
                                {
                                    roleList?.length > 0 ? (
                                        roleList?.map((i) => (
                                            <option value={i?.role_name}>{i?.role_name}</option>
                                        ))
                                    ) : (
                                        <option disabled>No Role Availabel</option>
                                    )
                                }
                            </select>

                            {/* {roleList?.length === 0 && ( */}
                            <span
                                className='cursor-pointer' onClick={() => {
                                    navigate("/role")
                                }}
                            >
                                + Create new Role
                            </span>
                            {/* )} */}

                        </div>

                        <div className="mt-4 w-100 d-flex justify-content-between">
                            <button
                                type="submit"
                                // className="save-button w-50 mt-2"
                                className={`w-50 mt-2 save-button ${loading ? 'loading' : ''} `}
                                disabled={loading}
                            >
                                {
                                    loading ? (
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                    ) : (
                                        "Edit"
                                    )
                                }
                            </button>

                            <button type="submit" className="cancel-button w-50 mt-2" onClick={handleCloseHide}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default EditUsers