import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email và mật khẩu là bắt buộc");
      return;
    }

    try {
      const user = await login(email, password);
      if (user.isAdmin) {
        navigate("/admin/orders", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (loginError) {
      setError(loginError.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: 420, width: "100%" }}
      >
        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Tên đăng nhập:
            </label>

            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mật khẩu:
            </label>

            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </div>

          {/* XÓA disabled */}
          <button type="submit" className="btn btn-primary w-100">
            Đăng Nhập
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Đăng nhập admin: <strong>admin@autocar.com</strong> / <strong>123</strong>
        </p>
      </div>
    </div>
  );
}

export default Login;