import { useForm } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/auth";

function Signup() {
  const required_field = <span className="text-danger fw-bold">*</span>;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const navigate = useNavigate();

  const AlertMsg = ({ msg }) => {
    return (
      <div className="d-flex justify-content-start">
        <span className="text-danger text-start" style={{ fontSize: "15px" }}>
          <span className="h5">
            <AiFillWarning />
          </span>
          <span className="ms-1">{msg}</span>
        </span>
      </div>
    );
  };

  const onSubmit = async (user_inf) => {
    console.log(user_inf);
    try {
      await authApi.register(user_inf);
      alert('Đăng ký thành công!\nNhấn "OK" để quay về trang chủ');
      if (window.location.pathname === "/sign-up") {
        navigate("/home");
      }
    } catch (error) {
      alert("Email đã tồn tại trong hệ thống!");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-4 border mt-5 rounded bg-white shadow">
          <div className="pt-3 text-center">
            <strong style={{ fontSize: "20px" }}>Đăng ký</strong>
          </div>
          <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex mb-3">
              <div className="me-2 w-50 position-relative">
                <label htmlFor="lastname" className="form-label">
                  Họ{required_field}
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                  {...register("lastname", { required: true })}
                  id="lastname"
                  placeholder="Họ..."
                />
                {errors.lastname && <AlertMsg msg="Hãy nhập họ" />}
              </div>
              <div className="w-50 position-relative">
                <label htmlFor="firstname" className="form-label">
                  Tên{required_field}
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                  {...register("firstname", { required: true })}
                  id="firstname"
                  placeholder="Tên..."
                />
                {errors.firstname && <AlertMsg msg="Hãy nhập tên" />}
              </div>
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="su_email" className="form-label">
                Email{required_field}
              </label>
              <input
                type="text"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
                id="su_email"
                placeholder="Email..."
              />
              {errors.email?.type === "required" && (
                <AlertMsg msg="Hãy nhập email" />
              )}
              {errors.email?.type === "pattern" && (
                <AlertMsg msg="Email không đúng định dạng" />
              )}
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="su_pswd" className="form-label">
                Mật khẩu{required_field}
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                })}
                id="su_pswd"
                placeholder="Mật khẩu..."
              />
              {errors.password?.type === "required" && (
                <AlertMsg msg="Hãy nhập mật khẩu" />
              )}
              {errors.password?.type === "pattern" && (
                <AlertMsg msg="Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số" />
              )}
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="re_pswd" className="form-label">
                Nhập lại mật khẩu{required_field}
              </label>
              <input
                type="password"
                className={`form-control ${errors.re_password ? "is-invalid" : ""}`}
                {...register("re_password", { required: true })}
                id="re_pswd"
                placeholder="Nhập lại mật khẩu..."
              />
              {errors.re_password?.type === "required" && (
                <AlertMsg msg="Không được để trống" />
              )}
              {!errors.password &&
                (watch("re_password") !== "" &&
                watch("password") !== watch("re_password") ? (
                  <AlertMsg msg="Mật khẩu nhập lại không khớp" />
                ) : null)}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">
                Đăng ký
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p>Bạn đã có tài khoản? <a href="/login" className="text-primary">Đăng nhập ngay</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
