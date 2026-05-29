import React, { useState } from "react";
import Product from "./Product";
import { getCars } from "../config/api";
import {FaFacebookF,FaYoutube,FaInstagram,} from "react-icons/fa";
import {Container,Row,Col,Form,Button,Pagination,} from "react-bootstrap";

function Home() {
  const cars = getCars();
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState(cars);

  const [currentPage, setCurrentPage] =
    useState(1);

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
    <div className="bg-light min-vh-100">

      {/* Banner */}
      <section
        className="d-flex align-items-center position-relative"
        style={{
          height: "420px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1470&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(90deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 60%, rgba(15,23,42,0) 100%)",
          }}
        ></div>

        <Container className="position-relative">
          <h1
            className="fw-bold text-white"
            style={{
              fontSize: "46px",
              lineHeight: "1.25",
            }}
          >
            Tìm chiếc xe <br />

            <span className="text-danger">
              phù hợp nhất
            </span>{" "}
            với bạn
          </h1>

          <p
            className="text-light mb-0"
            style={{ fontSize: "18px" }}
          >
            Hàng trăm mẫu xe đời mới,
            ưu đãi giữ chỗ trực tuyến trong 24h.
          </p>
        </Container>
      </section>

      {/* Search */}
      <Container
        className="position-relative"
        style={{
          marginTop: "-50px",
          zIndex: 5,
        }}
      >
        <section className="bg-white rounded-4 shadow-lg p-4">
          <Row className="g-3">

            <Col lg={3} md={6}>
              <Form.Select
                onChange={(e) =>
                  setBrand(e.target.value)
                }
                className="py-3"
              >
                <option value="">
                  🚗 Hãng xe (Tất cả)
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
              </Form.Select>
            </Col>

            <Col lg={3} md={6}>
              <Form.Select
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="py-3"
              >
                <option value="">
                  💰 Khoảng giá (Tất cả)
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
              </Form.Select>
            </Col>

            <Col lg={3} md={6}>
              <Form.Select
                onChange={(e) =>
                  setYear(e.target.value)
                }
                className="py-3"
              >
                <option value="">
                  📅 Năm sản xuất (Tất cả)
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
              </Form.Select>
            </Col>

            <Col lg={3} md={6}>
              <Button
                variant="danger"
                className="w-100 py-3 fw-bold"
                onClick={handleSearch}
              >
                Tìm kiếm xe
              </Button>
            </Col>

          </Row>
        </section>
      </Container>

      {/* Product */}
      <Container className="py-5">

        {currentCars.length === 0 ? (
          <div className="bg-white rounded-4 text-center py-5 shadow-sm">
            <span style={{ fontSize: "40px" }}>
              🔍
            </span>

            <p className="text-secondary fw-medium mt-3">
              Không tìm thấy mẫu xe nào phù hợp.
            </p>
          </div>
        ) : (
          <>
            <Product cars={currentCars} />

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">

                <Pagination>

                  <Pagination.Prev
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
                  />

                  {Array.from(
                    { length: totalPages },
                    (_, index) => {
                      const pageNumber =
                        index + 1;

                      return (
                        <Pagination.Item
                          key={pageNumber}
                          active={
                            pageNumber ===
                            currentPage
                          }
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
                        >
                          {pageNumber}
                        </Pagination.Item>
                      );
                    }
                  )}

                  <Pagination.Next
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
                  />

                </Pagination>

              </div>
            )}
          </>
        )}
      </Container>

      {/* Footer */}
      <footer className="bg-black text-white pt-5 pb-3">
        <Container>
          <Row className="g-5">

            {/* Left */}
            <Col md={4}>
              <h2 className="fw-bold mb-4">
                Auto Car Hà Đông
              </h2>

              <p className="text-light">
                Showroom Auto Car Hà Đông
                – Hà Nội.
              </p>

              <p className="text-light">
                Địa Chỉ: Số 7 & 9 Nguyễn
                Trãi, Hà Đông, Hà Nội.
              </p>

              <div className="d-flex flex-wrap gap-3 small text-secondary mt-4">
                <span>TRANG CHỦ</span>

                <span>
                  TRẢI NGHIỆM KHÁCH HÀNG
                </span>

                <span>LIÊN HỆ</span>
              </div>

              <p className="mt-3 fw-medium">
                Copyright 2026 ©
                autocarhadong.vn
              </p>
            </Col>

            {/* Center */}
            <Col md={4}>
              <h2 className="fw-bold mb-4">
                Hỗ trợ khách hàng
              </h2>

              <p className="text-light">
                Hotline: 0974178993
              </p>

              <p className="text-light">
                Email:
                cskh@autocarhadong.com
              </p>
            </Col>

            {/* Right */}
            <Col md={4}>
              <h2 className="fw-bold mb-4">
                Kết nối
              </h2>

              <div className="d-flex gap-3">

                <a
                  href="https://www.facebook.com/TOYOTA.Global"
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex align-items-center justify-content-center text-white text-decoration-none border rounded-circle"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#111",
                  }}
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://www.youtube.com/@ToyotaMotorVietnam"
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex align-items-center justify-content-center text-white text-decoration-none border rounded-circle"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#111",
                  }}
                >
                  <FaYoutube />
                </a>

                <a
                  href="https://www.instagram.com/toyota/"
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex align-items-center justify-content-center text-white text-decoration-none border rounded-circle"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#111",
                  }}
                >
                  <FaInstagram />
                </a>

              </div>

              <div className="mt-5 fs-5 fw-semibold">
                Auto Car Hà Đông
              </div>
            </Col>

          </Row>
        </Container>
      </footer>

    </div>
  );
}

export default Home;