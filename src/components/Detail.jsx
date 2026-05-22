import React from "react";
import { useParams, Link } from "react-router-dom";
import { getCarById } from "../config/api";
import { useCart } from "./CartProvider";

function Detail() {
  const { id } = useParams();
  const car = getCarById(id);
  const { addToCart } = useCart();

  if (!car) {
    return (
      <div style={styles.errorPage}>
        <h2 style={styles.errorTitle}>Không tìm thấy xe</h2>
        <Link to="/" style={styles.errorBackBtn}>← Quay về trang chủ</Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
       
        <Link 
          to="/" 
          style={styles.topBackLink}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#e2e8f0";
            e.currentTarget.style.color = "#0f172a";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.color = "#475569";
          }}
        >
          <span style={styles.backArrow}>←</span> Quay lại danh sách xe
        </Link>

        <div style={styles.card}>
          
          <div style={styles.imageSection}>
            <div style={styles.imageWrapper}>
              <img src={car.image} alt={car.name} style={styles.image} />
            </div>
          </div>

          
          <div style={styles.infoSection}>
            <div style={styles.headerBox}>
              <span style={styles.brandTag}>{car.brand}</span>
              <h1 style={styles.name}>{car.name}</h1>
            </div>

            <div style={styles.priceContainer}>
              <span style={styles.priceLabel}>Giá niêm yết</span>
              <span style={styles.priceValue}>{car.priceText}</span>
            </div>

            
            <div style={styles.specsGrid}>
              <div style={styles.specCard}>
                <span style={styles.specLabel}>Năm sản xuất</span>
                <span style={styles.specValue}>{car.year}</span>
              </div>
              <div style={styles.specCard}>
                <span style={styles.specLabel}>Thương hiệu</span>
                <span style={styles.specValue}>{car.brand}</span>
              </div>
            </div>

           
            <div style={styles.divider}></div>
            <div style={styles.descriptionSection}>
              <h3 style={styles.sectionTitle}>Thông tin chi tiết</h3>
              <p style={styles.descriptionText}>{car.description}</p>
            </div>
            <div style={styles.divider}></div>

            
            <div style={styles.actionRow}>
              <button
                style={styles.primaryButton}
                onClick={() => addToCart(car)}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#dc2626";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#ef4444";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
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
  },

  container: {
    maxWidth: "1140px", 
    margin: "0 auto",
  },

  // Style mới cho nút quay lại
  topBackLink: {
    textDecoration: "none",
    color: "#475569",          
    background: "#ffffff",     
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-flex",    
    alignItems: "center",
    gap: "8px",                
    padding: "10px 18px",      
    borderRadius: "12px",      
    border: "1px solid #e2e8f0", 
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)", 
    marginBottom: "24px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out", 
  },

  backArrow: {
    fontSize: "16px",
    fontWeight: "bold",
  },

  card: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "32px",
    display: "flex",
    flexDirection: "row",
    gap: "48px",
    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 10px 30px -3px rgba(0, 0, 0, 0.03)",
    flexWrap: "wrap",
  },

  imageSection: {
    flex: "1 1 450px", 
    display: "flex",
    alignItems: "flex-start",
  },

  imageWrapper: {
    width: "100%",
    background: "#f1f5f9",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "4/3", 
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "12px",
  },

  infoSection: {
    flex: "1 1 500px",
    display: "flex",
    flexDirection: "column",
  },

  headerBox: {
    marginBottom: "20px",
  },

  brandTag: {
    background: "#fef2f2",
    color: "#ef4444",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "inline-block",
    marginBottom: "12px",
  },

  name: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    lineHeight: "1.2",
  },

  priceContainer: {
    background: "#fafafa",
    padding: "16px 20px",
    borderRadius: "16px",
    border: "1px solid #f1f5f9",
    marginBottom: "24px",
    display: "flex",
    flexDirection: "column",
  },

  priceLabel: {
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "4px",
  },

  priceValue: {
    color: "#ef4444",
    fontSize: "30px",
    fontWeight: "800",
  },

  specsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },

  specCard: {
    border: "1px solid #e2e8f0",
    padding: "14px 18px",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  specLabel: {
    color: "#64748b",
    fontSize: "13px",
  },

  specValue: {
    fontWeight: "600",
    fontSize: "16px",
    color: "#334155",
  },

  divider: {
    height: "1px",
    background: "#e2e8f0",
    width: "100%",
    margin: "8px 0 24px 0",
  },

  descriptionSection: {
    marginBottom: "8px",
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 10px 0",
  },

  descriptionText: {
    color: "#475569",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: 0,
  },

  actionRow: {
    marginTop: "auto", 
    paddingTop: "16px",
  },

  primaryButton: {
    width: "100%", 
    padding: "16px 32px",
    background: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
    transition: "all 0.2s ease",
  },

  errorPage: {
    textAlign: "center",
    padding: "100px 20px",
    background: "#f8fafc",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },

  errorTitle: {
    color: "#1e293b",
    fontSize: "24px",
    margin: 0,
  },

  errorBackBtn: {
    color: "#ef4444",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Detail;