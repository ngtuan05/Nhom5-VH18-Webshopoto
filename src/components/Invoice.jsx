import React from "react";
import { Link, useParams } from "react-router-dom";
import { getCarById } from "../config/api";

function Invoice() {
  const { id } = useParams();
  const customers = JSON.parse(localStorage.getItem("customerList") || "[]");
  const customer = customers.find((item) => String(item.id) === String(id));

  const resolveCar = (item) => {
    if (typeof item === "number") {
      return (
        getCarById(item) || {
          id: item,
          name: "Xe không xác định",
          brand: "-",
          year: "-",
        }
      );
    }

    if (item?.id) {
      const car = getCarById(item.id);
      if (car) return car;

      return {
        id: item.id,
        name: item.name || "Xe không xác định",
        brand: item.brand || "-",
        year: item.year || "-",
        price: item.price,
        priceText: item.priceText,
      };
    }

    return {
      id: item?.id || "unknown",
      name: item?.name || "Xe không xác định",
      brand: item?.brand || "-",
      year: item?.year || "-",
      price: item?.price,
      priceText: item?.priceText,
    };
  };

  const formatPrice = (car) => {
    return car.priceText || (car.price ? `${car.price} triệu` : "Chưa rõ");
  };

  if (!customer) {
    return (
      <div
        className="container py-5"
        style={{ fontFamily: "'Segoe UI', Roboto, Arial, sans-serif" }}
      >
        <div className="card shadow-sm p-4">
          <h1 className="mb-4">Hóa đơn không tìm thấy</h1>
          <p>Không tìm thấy đơn hàng với mã: {id}</p>
          <Link to="/admin/orders" className="btn btn-primary mt-3">
            Quay lại danh sách đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  const invoiceItems = (customer.items || []).map((item) => resolveCar(item));
  const totalAmount =
    customer.amount ??
    invoiceItems.reduce((sum, car) => sum + (car.price || 0), 0);

  return (
    <div
      className="container py-5"
      style={{ fontFamily: "'Segoe UI', Roboto, Arial, sans-serif" }}
    >
      <div className="card shadow-sm p-4 mb-4">
        <h1 className="mb-4">Hóa đơn bán hàng</h1>
        <p className="mb-1">
          Ngày mua hàng:{" "}
          {new Date(customer.createdAt).toLocaleDateString("vi-VN")}
        </p>
        

        <div className="mb-4">
          <p className="mb-1">
            <strong>Họ tên:</strong> {customer.name}
          </p>
          <p className="mb-1">
            <strong>Số điện thoại:</strong> {customer.phone}
          </p>
          <p className="mb-0">
            <strong>Số lượng xe:</strong>{" "}
            {customer.itemCount ?? customer.items?.length ?? 0}
          </p>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên xe</th>
                <th>Hãng</th>
                <th>Năm sản xuất</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((car, index) => (
                <tr key={`${customer.id}-${car.id}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{car.name}</td>
                  <td>{car.brand}</td>
                  <td>{car.year}</td>
                  <td>{formatPrice(car)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="fw-bold mt-3">
          Tổng giá trị: {totalAmount.toLocaleString("vi-VN")} triệu
        </p>

        <Link to="/admin/orders" className="btn btn-secondary mt-4">
          Quay lại danh sách đơn hàng
        </Link>
      </div>
    </div>
  );
}

export default Invoice;
