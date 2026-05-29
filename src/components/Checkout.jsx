
import React, { useState } from "react";
import { useCart } from "./CartProvider";
import { Link } from "react-router-dom";

import {
  Container,Row,Col,Card,Form,Button,Badge,Alert,
} from "react-bootstrap";

function Checkout() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const parsePrice = (car) => {
    if (typeof car.price === "number") {
      return car.price;
    }
    if (typeof car.priceText === "string") {
      const cleaned = car.priceText
        .replace(/\./g, "")
        .replace(/,/g, "")
        .replace(/\s*triệu/i, "")
        .replace(/\s*tỷ/i, "000")
        .replace(/[^0-9]/g, "");
      return Number(cleaned) || 0;
    }
    return 0;
  };

  const updateRevenue = (amount) => {
    const summary = JSON.parse(localStorage.getItem("salesSummary") || "{}");
    const totalRevenue = (summary.totalRevenue || 0) + amount;
    const totalOrders = (summary.totalOrders || 0) + 1;
    const totalUnits = (summary.totalUnits || 0) + cart.length;

    localStorage.setItem(
      "salesSummary",
      JSON.stringify({
        totalRevenue,
        totalOrders,
        totalUnits,
        lastUpdated: new Date().toISOString(),
      })
    );
  };

  const handleSubmit = () => {
    if (name.trim() === "" || phone.trim() === "") {
      alert("Vui lòng nhập đầy đủ họ tên và số điện thoại!");
      return;
    }

    const orderAmount = cart.reduce((sum, car) => sum + parsePrice(car), 0);

    const order = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      items: cart.map((car) => car.id),
      itemCount: cart.length,
      amount: orderAmount,
      createdAt: new Date().toISOString(),
      hasInvoice: false,
    };

    const savedCustomers = JSON.parse(localStorage.getItem("customerList") || "[]");
    savedCustomers.unshift(order);
    localStorage.setItem("customerList", JSON.stringify(savedCustomers));

    updateRevenue(orderAmount);

    alert("Đặt mua thành công! Doanh thu đã được cập nhật.");

    clearCart();
    setName("");
    setPhone("");
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>

        <h1 className="fw-bold mb-5">
          Thanh toán đơn hàng
        </h1>

        {cart.length === 0 ? (
          <Card className="border-0 shadow-sm rounded-4 text-center py-5 mx-auto">
            <Card.Body>

              <div
                className="mb-3"
                style={{ fontSize: "48px" }}
              >
                🛒
              </div>

              <p className="text-secondary fw-medium mb-4">
                Không có xe nào trong giỏ hàng của bạn.
              </p>

              <Link
                to="/"
                className="btn btn-dark rounded-4 px-4 py-3 fw-bold"
              >
                Khám phá các mẫu xe ngay
              </Link>

            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">

            {/* Left */}
            <Col lg={7}>

              <Card className="border-0 shadow-sm rounded-4 p-4 h-100">

                <div className="d-flex align-items-start gap-3 mb-4">

                  <div
                    className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                    style={{
                      width: "30px",
                      height: "30px",
                      fontSize: "14px",
                    }}
                  >
                    1
                  </div>

                  <div>
                    <h3 className="fw-bold mb-1">
                      Thông tin liên hệ
                    </h3>

                    <p className="text-secondary mb-0">
                      Điền thông tin để nhận tư vấn và ưu đãi tốt nhất.
                    </p>
                  </div>

                </div>

                <Form>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      Họ và tên{" "}
                      <span className="text-danger">
                        *
                      </span>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      className="py-3 rounded-4"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      Số điện thoại{" "}
                      <span className="text-danger">
                        *
                      </span>
                    </Form.Label>

                    <Form.Control
                      type="tel"
                      placeholder="Ví dụ: 0912345678"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      className="py-3 rounded-4"
                    />
                  </Form.Group>

                  <Button
                    variant="danger"
                    className="w-100 py-3 fw-bold rounded-4"
                    onClick={handleSubmit}
                  >
                    Xác nhận đặt mua sản phẩm
                  </Button>

                </Form>

              </Card>

            </Col>

            {/* Right */}
            <Col lg={5}>

              <Card className="border-0 shadow-sm rounded-4 p-4">

                <div className="d-flex align-items-start justify-content-between mb-4">

                  <div className="d-flex gap-3">

                    <div
                      className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                      style={{
                        width: "30px",
                        height: "30px",
                        fontSize: "14px",
                      }}
                    >
                      2
                    </div>

                    <div>
                      <h3 className="fw-bold mb-1">
                        Đơn hàng của bạn
                      </h3>
                    </div>

                  </div>

                  <Badge
                    bg="danger-subtle"
                    text="danger"
                    className="px-3 py-2 rounded-pill"
                  >
                    {cart.length} sản phẩm
                  </Badge>

                </div>

                <div
                  className="d-flex flex-column gap-3 pe-1"
                  style={{
                    maxHeight: "360px",
                    overflowY: "auto",
                  }}
                >

                  {cart.map((car) => (
                    <div
                      key={car.id}
                      className="d-flex align-items-center gap-3 border-bottom pb-3"
                    >

                      {car.image && (
                        <div
                          className="bg-light border rounded-3 d-flex align-items-center justify-content-center p-2"
                          style={{
                            width: "84px",
                            height: "64px",
                          }}
                        >
                          <img
                            src={car.image}
                            alt={car.name}
                            className="img-fluid"
                            style={{
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      )}

                      <div className="flex-grow-1">

                        <h4 className="fw-bold fs-6 mb-2">
                          {car.name}
                        </h4>

                        {car.brand && (
                          <span className="badge bg-light text-dark border">
                            {car.brand}
                          </span>
                        )}

                      </div>

                      <div className="text-end">

                        <span className="fw-bold text-danger">
                          {car.priceText}
                        </span>

                      </div>

                    </div>
                  ))}

                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">

                  <span className="text-secondary fw-medium">
                    Tổng số lượng xe:
                  </span>

                  <span className="fw-bold">
                    {cart.length} xe
                  </span>

                </div>

                <hr />

                <Alert
                  variant="warning"
                  className="d-flex gap-2 align-items-start rounded-4 mb-0"
                >

                  <span>💡</span>

                  <div
                    className="mb-0"
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Hệ thống sẽ giữ chỗ xe trong vòng 24h.
                    Nhân viên tư vấn sẽ liên hệ ngay qua số điện thoại bạn cung cấp.
                  </div>

                </Alert>

              </Card>

            </Col>

          </Row>
        )}

      </Container>
    </div>
  );
}

export default Checkout;