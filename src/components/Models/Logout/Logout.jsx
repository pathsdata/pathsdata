import { Modal } from "react-bootstrap";

const Logout = ({ show, handleClose, handleLogout, isLogoutLoading }) => {

  return ( 
    <Modal show={show} onHide={handleClose} centered>
      <div>
        <div className="delete-modal-body">
          <div className="content text-center">
            <span className="delete-modal-title">Logout</span>
          </div>

          <div className="mt-2">
            <div className="d-flex justify-content-center">
              <p style={{ fontSize: "17px", color: "#fff" }}>
                {`Are you sure you want to Logout?`}
              </p>
            </div>
          </div>
        </div>
        <div className="delete-modal-footer">
          <div className="d-flex justify-content-center">
            <button
              className="cancel-btn  me-md-2"
              type="button"
              onClick={handleClose}
            >
              No
            </button>
            <button
              type="submit"
              className="save-btn"
              disabled={isLogoutLoading}
              onClick={handleLogout}
            >
              {isLogoutLoading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Yes"
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Logout;
