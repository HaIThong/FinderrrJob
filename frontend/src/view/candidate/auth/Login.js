import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import authApi from "../../../api/auth";
import { candAuthActions } from "../../../redux/slices/candAuthSlice";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Cập nhật import

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLogin = async (user) => {
    user.role = 1;
    setIsLoading(true);
    await authApi
      .login(user)
      .then((res) => {
        console.log(res);
        dispatch(candAuthActions.setCurrentCandidate(res.user));
        localStorage.setItem("candidate_jwt", res.authorization.token);
        if (window.location.pathname === "/sign-up") {
          navigate("/");
        } else {
          const closeBtn = document.getElementById("closeBtn");
          closeBtn.click();
          document.querySelector("button.resetBtn").click();
        }
      })
      .catch((error) => {
        setIsError(true);
      });
    setIsLoading(false);
  };

  const handleGoogleLoginSuccess = (response) => {
    const token = response.credential;
    const decoded = jwtDecode(token); // Sử dụng jwtDecode thay vì jwt_decode
    const user = {
      email: decoded.email,
      name: decoded.name,
      role: 1, // Giả định role là 1 cho ứng viên
    };

    dispatch(candAuthActions.setCurrentCandidate(user));
    localStorage.setItem("candidate_jwt", token);
    navigate("/");
  };

  const handleGoogleLoginError = () => {
    setIsError(true);
  };

  return (
    <div className="modal fade" id="login-box">
      <div className="modal-dialog">
        <div className="modal-content custom-modal-content">
          <div className="modal-header custom-modal-header">
            <h3 className="modal-title">Đăng nhập</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              id="closeBtn"
            ></button>
          </div>
          <div className="modal-body custom-modal-body">
            {/* Form đăng nhập */}
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="form-floating mb-3 position-relative">
                <input
                  type="text"
                  className={`form-control ${isError ? "is-invalid" : ""}`}
                  name="email"
                  {...register("email")}
                  placeholder="Email"
                />
                <label htmlFor="email">
                  <FaUser className="me-2" /> Email
                </label>
              </div>
              <div className="form-floating mb-3 position-relative">
                <input
                  type="password"
                  className={`form-control ${isError ? "is-invalid" : ""}`}
                  name="password"
                  {...register("password")}
                  placeholder="Mật khẩu"
                />
                <label htmlFor="password">
                  <FaLock className="me-2" /> Mật khẩu
                </label>
              </div>
              {isError && (
                <div className="text-danger text-center mb-3">
                  *Email hoặc mật khẩu không chính xác!
                </div>
              )}
              <div className="text-center mb-3">
                <a href="/k" className="d-block text-decoration-none">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                >
                  {isLoading && (
                    <span className="spinner-border spinner-border-sm me-2" />
                  )}
                  Đăng nhập
                </button>
                <button
                  type="reset"
                  className="resetBtn"
                  style={{ display: "none" }}
                />
              </div>
            </form>

            {/* Nút đăng nhập bằng Google */}
            <div className="text-center my-3">
              <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  useOneTap
                />
              </GoogleOAuthProvider>
            </div>

            {/* Liên kết đăng ký */}
            <div className="text-center mt-4">
              <p>Bạn chưa có tài khoản? <a href="/sign-up" className="text-primary">Đăng ký ngay</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
