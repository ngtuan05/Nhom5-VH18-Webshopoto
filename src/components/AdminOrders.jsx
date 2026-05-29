import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCarById } from "../config/api";

function AdminOrders() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("customerList") || "[]");
    setCustomers(saved);
  }, []);

  const formatPrice = (car) => {
    return car.priceText || (car.price ? `${car.price} triệu` : "Chưa rõ");
  };

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
      };
    }

    return {
      id: item?.id || "unknown",
      name: item?.name || "Xe không xác định",
      brand: item?.brand || "-",
      year: item?.year || "-",
    };
  };

  return (
    <div
      className="container py-5"
      style={{ fontFamily: "'Segoe UI', Roboto, Arial, sans-serif" }}
    >
      <div className="card shadow-sm p-4 mb-4">
        <h1 className="mb-4">Danh Sách Khách Hàng</h1>

        {/* Nút Reset khách hàng */}
        <div className="mb-3 d-flex justify-content-end">
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.setItem("customerList", JSON.stringify([]));
              setCustomers([]); // cập nhật state để giao diện trống ngay
            }}
          >
            Xóa thông tin khách hàng
          </button>
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="alert alert-info">
          Chưa có khách hàng nào xác nhận đơn mua.
        </div>
      ) : (
        <div className="row g-4">
          {customers.map((customer) => (
            <div key={customer.id} className="col-12">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-3">
                  <div>
                    <h5 className="fw-bold mb-1">{customer.name}</h5>
                    <p className="mb-1 text-secondary">
                      Số điện thoại: {customer.phone}
                    </p>
                    <p className="mb-1">
                      Ngày mua hàng:{" "}
                      {new Date(customer.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-danger-subtle text-danger py-2 px-3 rounded-pill">
                      {customer.itemCount ?? customer.items?.length ?? 0} xe
                    </span>
                    <Link
                      to={`/admin/invoice/${customer.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Xuất hóa đơn
                    </Link>
                  </div>
                </div>

                <div className="row gy-3">
                  {(customer.items || []).map((item) => {
                    const car = resolveCar(item);
                    return (
                      <div key={car.id} className="col-12">
                        <div className="border rounded-4 p-3 bg-light">
                          <h6 className="mb-1">{car.name}</h6>
                          <p className="mb-1 text-secondary">
                            Hãng: {car.brand}
                          </p>
                          <p className="mb-1 text-secondary">
                            Năm sản xuất: {car.year}
                          </p>
                          <p className="mb-0 text-secondary">
                            Giá: {formatPrice(car)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;