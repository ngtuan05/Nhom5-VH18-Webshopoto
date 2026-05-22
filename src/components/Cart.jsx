import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartProvider";

function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.mainTitle}>Giỏ hàng của bạn</h1>

        {cart.length === 0 ? (
          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>🛒</div>
            <p style={styles.emptyText}>Giỏ hàng của bạn chưa có chiếc xe nào.</p>
            <Link to="/" style={styles.emptyButton}>Quay lại chọn xe</Link>
          </div>
        ) : (
          <div style={styles.layoutGrid}>
            
            {/* Cột trái: Danh sách xe */}
            <div style={styles.leftColumn}>
              {cart.map((car) => (
                <div 
                  style={styles.item} 
                  key={car.id}
                  onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.05)"}
                  onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.02)"}
                >
                  <div style={styles.imageWrapper}>
                    <img src={car.image} alt={car.name} style={styles.image} />
                  </div>

                  <div style={styles.info}>
                    <h3 style={styles.carName}>{car.name}</h3>
                    <div style={styles.specsRow}>
                      <span style={styles.specBadge}>Hãng: {car.brand}</span>
                      <span style={styles.specBadge}>Năm: {car.year}</span>
                    </div>
                    <p style={styles.priceContainer}>
                      Giá bán: <span style={styles.price}>{car.priceText}</span>
                    </p>
                  </div>

                  <button
                    style={styles.deleteButton}
                    onClick={() => removeFromCart(car.id)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#fef2f2";
                      e.currentTarget.style.borderColor = "#dc2626";
                      e.currentTarget.style.color = "#dc2626";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "#ffffff";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                      e.currentTarget.style.color = "#64748b";
                    }}
                  >
                    Xóa khỏi giỏ
                  </button>
                </div>
              ))}
            </div>

            {/* Cột phải: Khối tổng tiền & Thanh toán */}
            <div style={styles.rightColumn}>
              <div style={styles.summaryCard}>
                <h3 style={styles.summaryTitle}>Tóm tắt đơn hàng</h3>
                
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Số lượng xe:</span>
                  <span style={styles.summaryValue}>{cart.length} chiếc</span>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.totalRow}>
                  <span style={styles.totalLabel}>Tổng tạm tính:</span>
                  <span style={styles.totalPrice}>{total} triệu</span>
                </div>

                <p style={styles.taxNotice}>(Giá đã bao gồm thuế VAT và các chi phí tiêu chuẩn)</p>

                <Link to="/checkout" style={{ textDecoration: "none" }}>
                  <button 
                    style={styles.checkoutButton}
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
                    Tiến hành thanh toán
                  </button>
                </Link>
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
    flex: "1 1 600px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  rightColumn: {
    flex: "1 1 380px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
    border: "1px solid #f1f5f9",
    transition: "all 0.3s ease",
  },
  imageWrapper: {
    width: "180px",
    height: "110px",
    background: "#f1f5f9",
    borderRadius: "14px",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  info: {
    flex: 1,
  },
  carName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 10px 0",
  },
  specsRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
  },
  specBadge: {
    fontSize: "13px",
    color: "#475569",
    background: "#f1f5f9",
    padding: "3px 10px",
    borderRadius: "6px",
    fontWeight: "500",
  },
  priceContainer: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
  },
  price: {
    color: "#ef4444",
    fontWeight: "700",
    fontSize: "16px",
  },
  deleteButton: {
    padding: "10px 16px",
    backgroundColor: "#ffffff",
    color: "#64748b",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    flexShrink: 0,
  },
  summaryCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    position: "sticky", // Giúp khối này đứng yên khi cuộn danh sách xe dài
    top: "40px",
  },
  summaryTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 20px 0",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  summaryLabel: {
    color: "#64748b",
    fontSize: "15px",
  },
  summaryValue: {
    fontWeight: "600",
    color: "#0f172a",
    fontSize: "15px",
  },
  divider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "16px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "8px",
  },
  totalLabel: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a",
  },
  totalPrice: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#ef4444",
  },
  taxNotice: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: "0 0 24px 0",
    lineHeight: "1.4",
  },
  checkoutButton: {
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
  },
};

export default Cart;