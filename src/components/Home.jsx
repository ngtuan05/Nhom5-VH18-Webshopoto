import React, { useState } from "react";
import Product from "./Product";
import { getCars } from "../config/api";

import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

function Home() {
  const cars = getCars();

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState(cars);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const handleSearch = () => {
    let filtered = cars;

    if (brand !== "") {
      filtered = filtered.filter(
        (car) => car.brand === brand
      );
    }

    if (price !== "") {
      if (price === "duoi500") {
        filtered = filtered.filter(
          (car) => car.price < 500
        );
      }

      if (price === "500den700") {
        filtered = filtered.filter(
          (car) =>
            car.price >= 500 &&
            car.price <= 700
        );
      }

      if (price === "tren700") {
        filtered = filtered.filter(
          (car) => car.price > 700
        );
      }
    }

    if (year !== "") {
      filtered = filtered.filter(
        (car) => car.year === Number(year)
      );
    }

    setResult(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentCars = result.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    result.length / itemsPerPage
  );

  return (
    <div style={styles.page}>

      {/* Banner */}
      <section style={styles.banner}>
        <div style={styles.bannerOverlay}></div>

        <div style={styles.bannerContainer}>
          <h1 style={styles.bannerText}>
            Tìm chiếc xe <br />

            <span style={styles.highlightText}>
              phù hợp nhất
            </span>{" "}
            với bạn
          </h1>

          <p style={styles.bannerSubtitle}>
            Hàng trăm mẫu xe đời mới,
            ưu đãi giữ chỗ trực tuyến trong 24h.
          </p>
        </div>
      </section>

      {/* Search */}
      <div style={styles.searchWrapper}>
        <section style={styles.searchBox}>

          <div style={styles.filterGroup}>
            <span style={styles.filterIcon}>
              🚗
            </span>

            <select
              style={styles.select}
              onChange={(e) =>
                setBrand(e.target.value)
              }
            >
              <option value="">
                Hãng xe (Tất cả)
              </option>

              <option value="Honda">
                Honda
              </option>

              <option value="Toyota">
                Toyota
              </option>

              <option value="Mazda">
                Mazda
              </option>

              <option value="Hyundai">
                Hyundai
              </option>

              <option value="Kia">
                Kia
              </option>

              <option value="Ford">
                Ford
              </option>

              <option value="Mitsubishi">
                Mitsubishi
              </option>

              <option value="VinFast">
                VinFast
              </option>

              <option value="Mercedes-Benz">
                Mercedes-Benz
              </option>

              <option value="BMW">
                BMW
              </option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterIcon}>
              💰
            </span>

            <select
              style={styles.select}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            >
              <option value="">
                Khoảng giá (Tất cả)
              </option>

              <option value="duoi500">
                Dưới 500 triệu
              </option>

              <option value="500den700">
                500 - 700 triệu
              </option>

              <option value="tren700">
                Trên 700 triệu
              </option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterIcon}>
              📅
            </span>

            <select
              style={styles.select}
              onChange={(e) =>
                setYear(e.target.value)
              }
            >
              <option value="">
                Năm sản xuất (Tất cả)
              </option>

              <option value="2021">
                2021
              </option>

              <option value="2022">
                2022
              </option>

              <option value="2023">
                2023
              </option>
            </select>
          </div>

          <button
            style={styles.searchButton}
            onClick={handleSearch}
          >
            Tìm kiếm xe
          </button>

        </section>
      </div>

      {/* Product */}
      <div style={styles.mainContent}>

        {currentCars.length === 0 ? (
          <div style={styles.noResult}>
            <span
              style={{ fontSize: "40px" }}
            >
              🔍
            </span>

            <p style={styles.noResultText}>
              Không tìm thấy mẫu xe nào phù hợp.
            </p>
          </div>
        ) : (
          <>
            <Product cars={currentCars} />

            {totalPages > 1 && (
              <div style={styles.pagination}>

                <button
                  style={{
                    ...styles.pageButton,
                    ...(currentPage === 1
                      ? styles.disabledButton
                      : {}),
                  }}
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(
                      (prev) => prev - 1
                    );

                    window.scrollTo({
                      top: 320,
                      behavior: "smooth",
                    });
                  }}
                >
                  ← Trước
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => {
                    const pageNumber =
                      index + 1;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => {
                          setCurrentPage(
                            pageNumber
                          );

                          window.scrollTo({
                            top: 320,
                            behavior:
                              "smooth",
                          });
                        }}
                        style={{
                          ...styles.pageNumberButton,
                          ...(pageNumber ===
                          currentPage
                            ? styles.activePageButton
                            : {}),
                        }}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                )}

                <button
                  style={{
                    ...styles.pageButton,
                    ...(currentPage ===
                    totalPages
                      ? styles.disabledButton
                      : {}),
                  }}
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() => {
                    setCurrentPage(
                      (prev) => prev + 1
                    );

                    window.scrollTo({
                      top: 320,
                      behavior: "smooth",
                    });
                  }}
                >
                  Sau →
                </button>

              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>

          {/* Left */}
          <div style={styles.footerColumn}>
            <h2 style={styles.footerHeading}>
              Auto Car Hà Đông
            </h2>

            <p style={styles.footerText}>
              Showroom Auto Car Hà Đông
              – Hà Nội.
            </p>

            <p style={styles.footerText}>
              Địa Chỉ: Số 7 & 9 Nguyễn
              Trãi, Hà Đông, Hà Nội.
            </p>

            <div style={styles.footerMenu}>
              <span>TRANG CHỦ</span>

              <span>
                TRẢI NGHIỆM KHÁCH HÀNG
              </span>

              <span>LIÊN HỆ</span>
            </div>

            <p style={styles.copyText}>
              Copyright 2026 ©
              autocarhadong.vn
            </p>
          </div>

          {/* Center */}
          <div style={styles.footerColumn}>
            <h2 style={styles.footerHeading}>
              Hỗ trợ khách hàng
            </h2>

            <p style={styles.footerText}>
              Hotline: 0974178993
            </p>

            <p style={styles.footerText}>
              Email:
              cskh@autocarhadong.com
            </p>
          </div>

          {/* Right */}
          <div style={styles.footerColumn}>
            <h2 style={styles.footerHeading}>
              Kết nối
            </h2>

            <div style={styles.socialContainer}>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/TOYOTA.Global"
                target="_blank"
                rel="noreferrer"
                style={styles.socialIcon}
              >
                <FaFacebookF />
              </a>

              {/* Youtube */}
              <a
                href="https://www.youtube.com/@ToyotaMotorVietnam"
                target="_blank"
                rel="noreferrer"
                style={styles.socialIcon}
              >
                <FaYoutube />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/toyota/"
                target="_blank"
                rel="noreferrer"
                style={styles.socialIcon}
              >
                <FaInstagram />
              </a>

            </div>

            <div style={styles.footerBrand}>
              Auto Car Hà Đông
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

const styles = {
  page: {
    background: "#f8fafc",
    fontFamily:
      "system-ui, -apple-system, sans-serif",
    minHeight: "100vh",
  },

  banner: {
    height: "420px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1470&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(90deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 60%, rgba(15,23,42,0) 100%)",
  },

  bannerContainer: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1140px",
    margin: "0 auto",
    width: "100%",
    padding: "0 20px",
  },

  bannerText: {
    fontSize: "46px",
    fontWeight: "800",
    lineHeight: "1.25",
    color: "#ffffff",
    margin: "0 0 16px 0",
  },

  highlightText: {
    color: "#ef4444",
  },

  bannerSubtitle: {
    color: "#cbd5e1",
    fontSize: "18px",
    margin: 0,
  },

  searchWrapper: {
    maxWidth: "1140px",
    margin: "-50px auto 40px auto",
    position: "relative",
    zIndex: 5,
    padding: "0 20px",
  },

  searchBox: {
    display: "flex",
    gap: "16px",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow:
      "0 20px 25px -5px rgba(0,0,0,0.1)",
    flexWrap: "wrap",
  },

  filterGroup: {
    flex: 1,
    minWidth: "200px",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  filterIcon: {
    position: "absolute",
    left: "14px",
    fontSize: "16px",
    pointerEvents: "none",
  },

  select: {
    width: "100%",
    padding:
      "14px 16px 14px 40px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    background: "#f8fafc",
    outline: "none",
  },

  searchButton: {
    padding: "14px 32px",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  mainContent: {
    maxWidth: "1140px",
    margin: "0 auto",
    padding:
      "0 20px 60px 20px",
  },

  noResult: {
    textAlign: "center",
    padding: "60px 0",
    background: "#ffffff",
    borderRadius: "20px",
  },

  noResultText: {
    marginTop: "10px",
    color: "#64748b",
    fontWeight: "500",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "48px",
  },

  pageButton: {
    padding: "10px 18px",
    border:
      "1px solid #cbd5e1",
    background: "#ffffff",
    borderRadius: "10px",
    cursor: "pointer",
  },

  pageNumberButton: {
    width: "40px",
    height: "40px",
    border:
      "1px solid #e2e8f0",
    background: "#ffffff",
    borderRadius: "10px",
    cursor: "pointer",
  },

  activePageButton: {
    background: "#0f172a",
    color: "#ffffff",
  },

  disabledButton: {
    opacity: 0.4,
    cursor: "not-allowed",
  },

  footer: {
    background: "#000",
    padding: "45px 20px 20px",
    color: "#fff",
  },

  footerContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    gap: "40px",
    flexWrap: "wrap",
  },

  footerColumn: {
    flex: "1",
    minWidth: "240px",
  },

  footerHeading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "18px",
    color: "#fff",
  },

  footerText: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#d1d5db",
    marginBottom: "8px",
  },

  footerMenu: {
    display: "flex",
    gap: "16px",
    marginTop: "24px",
    fontSize: "13px",
    color: "#9ca3af",
    fontWeight: "500",
    flexWrap: "wrap",
  },

  copyText: {
    marginTop: "16px",
    color: "#fff",
    fontWeight: "500",
    fontSize: "14px",
  },

  socialContainer: {
    display: "flex",
    gap: "14px",
    marginTop: "16px",
  },

  socialIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "1px solid #666",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "18px",
    textDecoration: "none",
    background: "#111",
    transition: "0.3s",
  },

  footerBrand: {
    marginTop: "40px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#fff",
  },
};

export default Home;