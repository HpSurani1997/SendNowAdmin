import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleAddAdminModalClose } from "../../redux/features/addTaskModalSlice";
import { addNewAdmin } from "../../redux/auth/authSlice";
import Select from "react-select";
import { Option } from "../../types";

const AddAdminModal = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.userData?.token);
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const [role, setRole] = useState<Option>({ value: "admin", label: "Admin" });
  const activeModal = useAppSelector(
    (state) => state.addTaskModal.isAdminModalOpen
  );

  const statusOptions = [
    { value: "super_admin", label: "Super Admin" },
    { value: "admin", label: "Admin" },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const closeModal = () => {
    dispatch(toggleAddAdminModalClose());
  };

  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(
        addNewAdmin({ name, email, password, token, status: role.value })
      )
        .unwrap()
        .then(() => {
          closeModal();
        });
    }
  };

  return (
    <>
      <div
        className={`ar-modal-overlay ${activeModal ? "active" : ""}`}
        role="button"
        onClick={closeModal}
      ></div>
      <div
        className={`add-new-task-modal ar-modal ${activeModal ? "active" : ""}`}
      >
        <div className="ar-modal-content">
          <div className="add-new-task-modal-header">
            <h2 id="addTaskModalLabel">Add New Admin</h2>
            <button
              className="btn btn-sm btn-icon btn-light"
              onClick={closeModal}
            >
              <i className="fa-light fa-times"></i>
            </button>
          </div>
          <div className="add-new-task-modal-body">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">Role</label>
                <Select
                  options={statusOptions}
                  value={role || null}
                  placeholder={"Select role"}
                  onChange={(selectedOption) => setRole(selectedOption as any)}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      backgroundColor: "transparent",
                      color: darkMode ? "#c4c4c4" : "#222222",
                      fontSize: 14,
                      borderColor: darkMode
                        ? "rgba(255, 255, 255, 0.12)"
                        : "#dbeaea",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="add-new-task-modal-footer">
            <button className="btn btn-sm btn-secondary" onClick={closeModal}>
              Close
            </button>
            <button className="btn btn-sm btn-success" onClick={handleSubmit}>
              Save Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdminModal;
