import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartProvider";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
} from "react-bootstrap";

function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        <h1 className="fw-bold mb-5 display-6">
          Giỏ hàng của bạn
        </h1>

        {cart.length === 0 ? (
          <Card className="text-center border-0 shadow-sm rounded-4 py-5 mx-auto" style={{ maxWidth: "500px" }}>
            <Card.Body>
              <div className="fs-1 mb-3">
                🛒
              </div>

              <p className="text-secondary fw-medium mb-4">
                Giỏ hàng của bạn chưa có
                chiếc xe nào.
              </p>

              <Link to="/">
                <Button
                  variant="dark"
                  className="px-4 py-3 rounded-4 fw-bold"
                >
                  Quay lại chọn xe
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">

            {/* Cột trái */}
            <Col lg={8}>
              <div className="d-flex flex-column gap-3">

                {cart.map((car) => (
                  <Card
                    key={car.id}
                    className="border-0 shadow-sm rounded-4 p-3"
                  >
                    <div className="d-flex flex-wrap align-items-center gap-4">

                      <div
                        className="bg-light rounded-4 d-flex align-items-center justify-content-center p-2 flex-shrink-0"
                        style={{
                          width: "180px",
                          height: "110px",
                        }}
                      >
                        <img
                          src={car.image}
                          alt={car.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit:
                              "contain",
                          }}
                        />
                      </div>

                      <div className="flex-grow-1">
                        <h3 className="fw-bold fs-5 mb-3">
                          {car.name}
                        </h3>

                        <div className="d-flex gap-2 mb-3 flex-wrap">
                          <Badge
                            bg="light"
                            text="dark"
                            className="px-3 py-2 rounded-3 fw-medium"
                          >
                            Hãng: {car.brand}
                          </Badge>

                          <Badge
                            bg="light"
                            text="dark"
                            className="px-3 py-2 rounded-3 fw-medium"
                          >
                            Năm: {car.year}
                          </Badge>
                        </div>

                        <p className="text-secondary mb-0">
                          Giá bán:{" "}
                          <span className="text-danger fw-bold fs-6">
                            {car.priceText}
                          </span>
                        </p>
                      </div>

                      <Button
                        variant="outline-secondary"
                        className="rounded-4 fw-semibold px-3 py-2"
                        onClick={() =>
                          removeFromCart(
                            car.id
                          )
                        }
                      >
                        Xóa khỏi giỏ
                      </Button>

                    </div>
                  </Card>
                ))}

              </div>
            </Col>

            {/* Cột phải */}
            <Col lg={4}>
              <Card
                className="border-0 shadow-sm rounded-4 p-4 position-sticky"
                style={{ top: "40px" }}
              >
                <Card.Body>

                  <h3 className="fw-bold fs-4 mb-4">
                    Tóm tắt đơn hàng
                  </h3>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-secondary">
                      Số lượng xe:
                    </span>

                    <span className="fw-semibold">
                      {cart.length} chiếc
                    </span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between align-items-baseline mb-2">
                    <span className="fw-bold fs-6">
                      Tổng tạm tính:
                    </span>

                    <span className="fw-bold text-danger fs-2">
                      {total} triệu
                    </span>
                  </div>

                  <p className="text-secondary small mb-4">
                    (Giá đã bao gồm thuế
                    VAT và các chi phí
                    tiêu chuẩn)
                  </p>

                  <Link
                    to="/checkout"
                    style={{
                      textDecoration:
                        "none",
                    }}
                  >
                    <Button
                      variant="danger"
                      className="w-100 py-3 rounded-4 fw-bold"
                    >
                      Tiến hành thanh toán
                    </Button>
                  </Link>

                </Card.Body>
              </Card>
            </Col>

          </Row>
        )}
      </Container>
    </div>
  );
}

export default Cart;