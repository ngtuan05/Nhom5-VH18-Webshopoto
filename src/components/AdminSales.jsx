import React, { useEffect, useState } from "react";
import { getCarById } from "../config/api";

function AdminSales() {
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUnits: 0,
    lastUpdated: null,
  });

  const resolveOrderAmount = (order) => {
    if (typeof order.amount === "number") {
      return order.amount;
    }

    if (Array.isArray(order.items)) {
      return order.items.reduce((sum, item) => {
        const id = typeof item === "number" ? item : item?.id;
        if (!id) return sum;
        const car = getCarById(id);
        return sum + (car?.price || 0);
      }, 0);
    }

    return 0;
  };

  useEffect(() => {
    const savedSummary = JSON.parse(
      localStorage.getItem("salesSummary") || "{}",
    );
    const customers = JSON.parse(localStorage.getItem("customerList") || "[]");

    let totalRevenue = savedSummary.totalRevenue || 0;
    let totalOrders = savedSummary.totalOrders || 0;
    let totalUnits = savedSummary.totalUnits || 0;
    let lastUpdated = savedSummary.lastUpdated || null;

    if (
      (!totalRevenue && customers.length > 0) ||
      customers.length !== totalOrders ||
      totalUnits === 0
    ) {
      totalRevenue = customers.reduce(
        (sum, order) => sum + resolveOrderAmount(order),
        0,
      );
      totalOrders = customers.length;
      totalUnits = customers.reduce(
        (sum, order) =>
          sum +
          (order.itemCount ||
            (Array.isArray(order.items) ? order.items.length : 0)),
        0,
      );
      lastUpdated = new Date().toISOString();
      localStorage.setItem(
        "salesSummary",
        JSON.stringify({ totalRevenue, totalOrders, totalUnits, lastUpdated }),
      );
    }

    setSummary({ totalRevenue, totalOrders, totalUnits, lastUpdated });
  }, []);

  const formatMoney = (value) => {
    return `${value.toLocaleString("vi-VN")} triệu`;
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4">
        <h1 className="mb-4">Quản lý doanh số</h1>
        <p>Thống kê doanh thu tự động cập nhật sau mỗi đơn hàng thành công.</p>

        <div className="row gy-3 mt-4">
          <div className="col-md-4">
            <div className="p-4 border rounded-4 bg-light">
              <p className="text-secondary mb-2">Tổng doanh thu</p>
              <h2 className="fw-bold">{formatMoney(summary.totalRevenue)}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border rounded-4 bg-light">
              <p className="text-secondary mb-2">Tổng đơn hàng</p>
              <h2 className="fw-bold">{summary.totalOrders}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border rounded-4 bg-light">
              <p className="text-secondary mb-2">Tổng xe đã bán</p>
              <h2 className="fw-bold">{summary.totalUnits}</h2>
            </div>
          </div>
        </div>

        {summary.lastUpdated && (
          <p className="text-secondary mt-4 mb-0">
            Cập nhật lần cuối:{" "}
            {new Date(summary.lastUpdated).toLocaleDateString("vi-VN")}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminSales;
