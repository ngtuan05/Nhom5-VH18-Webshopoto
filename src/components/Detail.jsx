
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getCarById } from "../config/api";
import { useCart } from "./CartProvider";
import {Container,Row,Col,Card,Button,Badge,} from "react-bootstrap";

function Detail() {
  const { id } = useParams();
  const car = getCarById(id);
  const { addToCart } = useCart();

  if (!car) {
    return (
      <div className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center text-center gap-3">
        <h2 className="fw-bold text-dark">
          Không tìm thấy xe
        </h2>

        <Link
          to="/"
          className="text-danger fw-semibold text-decoration-none"
        >
          ← Quay về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>

        <Link
          to="/"
          className="btn btn-light border shadow-sm rounded-3 fw-semibold mb-4 d-inline-flex align-items-center gap-2 text-secondary"
        >
          <span className="fw-bold">
            ←
          </span>

          Quay lại danh sách xe
        </Link>

        <Card className="border-0 shadow-sm rounded-4 p-4">
          <Row className="g-5 align-items-start">

            {/* Image */}
            <Col lg={6}>
              <div className="bg-light rounded-4 p-4">
                <img
                  src={car.image}
                  alt={car.name}
                  className="img-fluid rounded-3 w-100"
                  style={{
                    objectFit: "contain",
                    aspectRatio: "4/3",
                  }}
                />
              </div>
            </Col>

            {/* Info */}
            <Col lg={6} className="d-flex flex-column">

              <div className="mb-4">
                <Badge
                  bg="danger-subtle"
                  text="danger"
                  className="px-3 py-2 mb-3 text-uppercase"
                >
                  {car.brand}
                </Badge>

                <h1
                  className="fw-bold text-dark"
                  style={{
                    fontSize: "32px",
                    lineHeight: "1.2",
                  }}
                >
                  {car.name}
                </h1>
              </div>

              {/* Price */}
              <div className="bg-light border rounded-4 p-4 mb-4">
                <div className="text-secondary small mb-1">
                  Giá niêm yết
                </div>

                <div
                  className="fw-bold text-danger"
                  style={{
                    fontSize: "30px",
                  }}
                >
                  {car.priceText}
                </div>
              </div>

              {/* Specs */}
              <Row className="g-3 mb-4">

                <Col md={6}>
                  <div className="border rounded-4 p-3 d-flex flex-column">
                    <span className="text-secondary small">
                      Năm sản xuất
                    </span>

                    <span className="fw-semibold fs-6 text-dark">
                      {car.year}
                    </span>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="border rounded-4 p-3 d-flex flex-column">
                    <span className="text-secondary small">
                      Thương hiệu
                    </span>

                    <span className="fw-semibold fs-6 text-dark">
                      {car.brand}
                    </span>
                  </div>
                </Col>

              </Row>

              <hr />

              {/* Description */}
              <div className="mb-4">
                <h3 className="fw-bold fs-5 text-dark mb-3">
                  Thông tin chi tiết
                </h3>

                <p
                  className="text-secondary mb-0"
                  style={{
                    lineHeight: "1.7",
                  }}
                >
                  {car.description}
                </p>
              </div>

              <hr />

              {/* Button */}
              <div className="mt-auto pt-3">
                <Button
                  variant="danger"
                  className="w-100 py-3 fw-bold rounded-4"
                  onClick={() => addToCart(car)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>

            </Col>

          </Row>
        </Card>

      </Container>
    </div>
  );
}

export default Detail;