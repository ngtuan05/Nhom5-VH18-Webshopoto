import React, { useState } from "react";
import { useCart } from "./CartProvider";
import { Link } from "react-router-dom";

function Checkout() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (name.trim() === "" || phone.trim() === "") {
      alert("Vui lòng nhập đầy đủ họ tên và số điện thoại!");
      return;
    }

    alert("Đặt mua thành công! Nhân viên AutoCar sẽ liên hệ với bạn.");
    clearCart();
    setName("");
    setPhone("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.mainTitle}>Thanh toán đơn hàng</h1>

        {cart.length === 0 ? (
          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>🛒</div>
            <p style={styles.emptyText}>Không có xe nào trong giỏ hàng của bạn.</p>
            <Link to="/" style={styles.emptyButton}>Khám phá các mẫu xe ngay</Link>
          </div>
        ) : (
          <div style={styles.layoutGrid}>
            
            {/* Cột 1: Form thông tin khách hàng */}
            <div style={styles.leftColumn}>
              <div 
                style={styles.card}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)"}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 4px 20px -2px rgba(0, 0, 0, 0.05)"}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.stepBadge}>1</div>
                  <div>
                    <h3 style={styles.sectionTitle}>Thông tin liên hệ</h3>
                    <p style={styles.sectionSubtitle}>Điền thông tin để nhận tư vấn và ưu đãi tốt nhất.</p>
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <label id="label-name" style={styles.inputLabel}>Họ và tên <span style={styles.required}>*</span></label>
                  <div style={styles.inputWrapper}>
                    <span style={styles.inputIcon}>👤</span>
                    <input
                      style={styles.input}
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#ef4444";
                        e.currentTarget.style.background = "#ffffff";
                        document.getElementById("label-name").style.color = "#ef4444";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.style.background = "#f8fafc";
                        document.getElementById("label-name").style.color = "#334155";
                      }}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label id="label-phone" style={styles.inputLabel}>Số điện thoại <span style={styles.required}>*</span></label>
                  <div style={styles.inputWrapper}>
                    <span style={styles.inputIcon}>📞</span>
                    <input
                      style={styles.input}
                      type="tel"
                      placeholder="Ví dụ: 0912345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#ef4444";
                        e.currentTarget.style.background = "#ffffff";
                        document.getElementById("label-phone").style.color = "#ef4444";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.style.background = "#f8fafc";
                        document.getElementById("label-phone").style.color = "#334155";
                      }}
                    />
                  </div>
                </div>

                <button 
                  style={styles.submitButton} 
                  onClick={handleSubmit}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#dc2626";
                    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(239, 68, 68, 0.4)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#ef4444";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.25)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Xác nhận đặt mua sản phẩm
                </button>
              </div>
            </div>

            {/* Cột 2: Tóm tắt đơn hàng */}
            <div style={styles.rightColumn}>
              <div 
                style={styles.summaryCard}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)"}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 4px 20px -2px rgba(0, 0, 0, 0.05)"}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.stepBadge}>2</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", justifyContent: "space-between" }}>
                    <h3 style={styles.sectionTitle}>Đơn hàng của bạn</h3>
                    <span style={styles.countBadge}>{cart.length} sản phẩm</span>
                  </div>
                </div>
                
                <div style={styles.carList}>
                  {cart.map((car) => (
                    <div key={car.id} style={styles.carItem}>
                      {car.image && (
                        <div style={styles.carImageWrapper}>
                          <img src={car.image} alt={car.name} style={styles.carImage} />
                        </div>
                      )}
                      <div style={styles.carInfo}>
                        <h4 style={styles.carName}>{car.name}</h4>
                        {car.brand && <span style={styles.carBrand}>{car.brand}</span>}
                      </div>
                      <div style={styles.carPriceBox}>
                        <span style={styles.price}>{car.priceText}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.calcRow}>
                  <span style={styles.calcLabel}>Tổng số lượng xe:</span>
                  <span style={styles.calcValue}>{cart.length} xe</span>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.summaryFooter}>
                  <span style={styles.noticeIcon}>💡</span>
                  <p style={styles.noticeText}>
                    Hệ thống sẽ giữ chỗ xe trong vòng 24h. Nhân viên tư vấn sẽ liên hệ ngay qua số điện thoại bạn cung cấp.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f8fafc", 
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    color: "#0f172a",
  },
  container: {
    maxWidth: "1140px",
    margin: "0 auto",
  },
  mainTitle: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "36px",
    letterSpacing: "-0.5px",
  },
  layoutGrid: {
    display: "flex",
    flexDirection: "row",
    gap: "32px",
    flexWrap: "wrap", 
  },
  leftColumn: {
    flex: "1 1 520px",
  },
  rightColumn: {
    flex: "1 1 460px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "36px",
    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid #f1f5f9",
  },
  summaryCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "36px",
    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "28px",
  },
  stepBadge: {
    background: "#0f172a",
    color: "#ffffff",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
    flexShrink: 0,
    marginTop: "2px",
  },
  countBadge: {
    background: "#fef2f2",
    color: "#ef4444",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 4px 0",
  },
  sectionSubtitle: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
    lineHeight: "1.5",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "24px",
  },
  inputLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#334155",
    transition: "color 0.2s ease",
  },
  required: {
    color: "#ef4444",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "16px",
    fontSize: "16px",
    color: "#94a3b8",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "14px 16px 14px 44px", 
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    fontSize: "16px",
    color: "#0f172a",
    outline: "none",
    background: "#f8fafc",
    transition: "all 0.2s ease",
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    marginTop: "8px",
  },
  carList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxHeight: "360px",
    overflowY: "auto",
    paddingRight: "4px",
  },
  carItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    paddingBottom: "16px",
    borderBottom: "1px solid #f1f5f9",
  },
  carImageWrapper: {
    width: "84px",
    height: "64px",
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #f1f5f9",
  },
  carImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 6px 0",
  },
  carBrand: {
    fontSize: "12px",
    color: "#475569",
    background: "#f1f5f9",
    padding: "3px 8px",
    borderRadius: "6px",
    fontWeight: "500",
  },
  carPriceBox: {
    textAlign: "right",
  },
  price: {
    color: "#ef4444",
    fontWeight: "800",
    fontSize: "16px",
  },
  calcRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  calcLabel: {
    fontSize: "15px",
    color: "#64748b",
    fontWeight: "500",
  },
  calcValue: {
    fontSize: "16px",
    color: "#0f172a",
    fontWeight: "700",
  },
  divider: {
    height: "1px",
    background: "#e2e8f0",
    width: "100%",
    margin: "16px 0",
  },
  summaryFooter: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    background: "#fffbeb",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #fef3c7",
  },
  noticeIcon: {
    fontSize: "16px",
    marginTop: "1px",
  },
  noticeText: {
    fontSize: "13px",
    color: "#b45309",
    lineHeight: "1.5",
    margin: 0,
    fontWeight: "500",
  },
  emptyCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "80px 20px",
    textAlign: "center",
    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
    maxWidth: "500px",
    margin: "40px auto 0 auto",
    border: "1px solid #f1f5f9",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  emptyText: {
    color: "#64748b",
    fontSize: "16px",
    marginBottom: "24px",
    fontWeight: "500",
  },
  emptyButton: {
    display: "inline-block",
    textDecoration: "none",
    background: "#0f172a",
    color: "#ffffff",
    padding: "14px 28px",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "15px",
    transition: "background 0.2s",
  },
};

export default Checkout;