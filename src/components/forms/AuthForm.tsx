import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
type Props = {
  register?: boolean;
};
const AuthForm = ({ register }: Props) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const userData = useAppSelector((state) => state.auth.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.token) {
      navigate("/");
    } else if (userData && !userData.token && userData.message) {
      toast.error(userData.message);
    }
  }, [userData])

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    let newErrors: { email?: string; password?: string } = {};

    // Validation logic
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    // Stop submission if errors exist
    if (Object.keys(newErrors).length > 0) return;
    dispatch(loginAction({ email, password }));
    console.log({ email, password });
    
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <span className="input-group-text">
          <i className="fa-regular fa-user"></i>
        </span>
        <input
          type="text"
          name="email"
          className="form-control"
          placeholder={register ? "Full Name" : "Username or email address"}
        />
      </div>
      {errors.email && <div className="error-message">{errors.email}</div>}
      {register && (
        <div className="input-group mt-4">
          <span className="input-group-text">
            <i className="fa-regular fa-envelope"></i>
          </span>
          <input type="email" className="form-control" placeholder="Email" />
        </div>
      )}
      <div className="input-group mt-4">
        <span className="input-group-text">
          <i className="fa-regular fa-lock"></i>
        </span>
        <input
          type={passwordVisible ? "text" : "password"}
          className="form-control rounded-end"
          placeholder="Password"
          name="password"
        />
        <a
          role="button"
          className="password-show"
          onClick={togglePasswordVisibility}
        >
          <i className="fa-duotone fa-eye"></i>
        </a>
      </div>
      {errors.password && <div className="error-message">{errors.password}</div>}
      <div
        className={`d-flex ${
          register ? "justify-content-center" : "justify-content-between"
        } align-items-center mt-4 mb-4`}
      >
        {register ? (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="loginCheckbox"
            />
            <label
              className="form-check-label text-white"
              htmlFor="loginCheckbox"
            >
              I agree{" "}
              <a href="#" className="text-white text-decoration-underline">
                Terms & Policy
              </a>
            </label>
          </div>
        ) : (
          <>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="loginCheckbox"
              />
              <label
                className="form-check-label text-white"
                htmlFor="loginCheckbox"
              >
                Remember Me
              </label>
            </div>
            <Link to="/reset-password" className="text-white fs-14">
              Forgot Password?
            </Link>
          </>
        )}
      </div>
      <button type={"submit"} className="btn btn-primary w-100 login-btn">
        Sign in
      </button>
    </form>
  );
};
export default AuthForm;
