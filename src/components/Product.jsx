import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartProvider";

function Product({ cars }) {
  const { addToCart } = useCart();

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Xe nổi bật</h2>
      <div style={styles.underline}></div>

      {cars.length === 0 ? (
        <p style={styles.empty}>Không tìm thấy xe phù hợp.</p>
      ) : (
        <div style={styles.grid}>
          {cars.map((car) => (
            <div style={styles.card} key={car.id}>
              <Link to={`/detail/${car.id}`}>
                <img
                  src={car.image}
                  alt={car.name}
                  style={styles.image}
                />
              </Link>

              <h3 style={styles.carName}>{car.name}</h3>
              <p>🚘 Hãng xe: {car.brand}</p>
              <p>📅 Năm sản xuất: {car.year}</p>
              <p>
                <b>Giá bán: </b>
                <span style={styles.price}>{car.priceText}</span>
              </p>

              <button style={styles.buyButton} onClick={() => addToCart(car)}>
                Mua
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    padding: "10px 80px 30px"
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "5px"
  },
  underline: {
    width: "60px",
    height: "3px",
    backgroundColor: "#e60000",
    margin: "0 auto 25px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    backgroundColor: "#fff"
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "7px"
  },
  carName: {
    fontSize: "22px",
    margin: "12px 0 8px"
  },
  price: {
    color: "#e60000",
    fontWeight: "700"
  },
  buyButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#fff",
    color: "#e60000",
    border: "1px solid #e60000",
    borderRadius: "5px",
    fontWeight: "700",
    cursor: "pointer"
  },
  empty: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777"
  }
};

export default Product;