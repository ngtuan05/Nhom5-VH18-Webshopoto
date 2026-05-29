
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartProvider";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Product({ cars }) {
  const { addToCart } = useCart();

  return (
    <section className="py-3 px-5">
      <Container>
        <h2 className="text-center fw-bold mb-1" style={{ fontSize: "32px" }}>
          Xe nổi bật
        </h2>

        <div
          className="mx-auto mb-4"
          style={{
            width: "60px",
            height: "3px",
            backgroundColor: "#e60000"
          }}
        ></div>

        {cars.length === 0 ? (
          <p className="text-center text-secondary fs-5">
            Không tìm thấy xe phù hợp.
          </p>
        ) : (
          <Row className="g-4">
            {cars.map((car) => (
              <Col md={4} key={car.id}>
                <Card
                  className="h-100 border-0 shadow-sm"
                  style={{ borderRadius: "10px" }}
                >
                  <Link to={`/detail/${car.id}`}>
                    <Card.Img
                      variant="top"
                      src={car.image}
                      alt={car.name}
                      style={{
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "10px 10px 0 0"
                      }}
                    />
                  </Link>

                  <Card.Body>
                    <Card.Title
                      style={{
                        fontSize: "22px",
                        margin: "12px 0 8px"
                      }}
                    >
                      {car.name}
                    </Card.Title>

                    <p>🚘 Hãng xe: {car.brand}</p>
                    <p>📅 Năm sản xuất: {car.year}</p>

                    <p>
                      <b>Giá bán: </b>
                      <span
                        style={{
                          color: "#e60000",
                          fontWeight: "700"
                        }}
                      >
                        {car.priceText}
                      </span>
                    </p>

                    <Button
                      variant="outline-danger"
                      className="w-100 fw-bold"
                      onClick={() => addToCart(car)}
                    >
                      Mua
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}

export default Product;