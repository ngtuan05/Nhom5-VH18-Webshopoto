import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import AdminOrders from "./components/AdminOrders";
import AdminSales from "./components/AdminSales";
import Invoice from "./components/Invoice";
import RequireAdmin from "./components/RequireAdmin";
import { CartProvider } from "./components/CartProvider";
import { AuthProvider } from "./components/AuthProvider";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <BrowserRouter>
          <Menu />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin/orders"
              element={
                <RequireAdmin>
                  <AdminOrders />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/invoice/:id"
              element={
                <RequireAdmin>
                  <Invoice />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/sales"
              element={
                <RequireAdmin>
                  <AdminSales />
                </RequireAdmin>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;