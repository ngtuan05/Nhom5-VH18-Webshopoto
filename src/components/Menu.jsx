import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navItems = isAdmin
    ? [
        { to: "/admin/orders", label: "Quản lý đơn mua" },
        { to: "/admin/sales", label: "Quản lý doanh số" },
        { label: "Đăng xuất", onClick: handleLogout },
      ]
    : isAuthenticated
    ? [
        { to: "/", label: "Trang chủ" },
        { to: "/cart", label: "Giỏ hàng" },
        { label: "Đăng xuất", onClick: handleLogout },
      ]
    : [
        { to: "/", label: "Trang chủ" },
        { to: "/cart", label: "Giỏ hàng" },
        { to: "/login", label: "Đăng nhập" },
      ];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Auto<span style={styles.red}>Car</span>
        </Link>

        <nav style={styles.nav}>
          {navItems.map((item, index) =>
            item.onClick ? (
              <button
                key={index}
                type="button"
                onClick={item.onClick}
                style={styles.navButton}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                style={
                  location.pathname === item.to
                    ? styles.activeLink
                    : styles.navLink
                }
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: "#f3f4f6",
    padding: "14px 40px",
  },

  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    borderRadius: "18px",
    padding: "14px 32px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    borderTop: "4px solid #ef4444",
  },

  logo: {
    textDecoration: "none",
    fontSize: "34px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "1px",
    fontFamily: "Arial",
  },

  red: {
    color: "#ef4444",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  navButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#111827",
    fontSize: "17px",
    fontWeight: "600",
    padding: "10px 20px",
    borderRadius: "12px",
    transition: "0.3s",
  },

  navLink: {
    textDecoration: "none",
    color: "#111827",
    fontSize: "17px",
    fontWeight: "600",
    padding: "10px 20px",
    borderRadius: "12px",
    transition: "0.3s",
  },

  activeLink: {
    textDecoration: "none",
    background: "#ef4444",
    color: "white",
    fontSize: "17px",
    fontWeight: "600",
    padding: "10px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(239,68,68,0.35)",
    transition: "0.3s",
  },
};

export default Menu;