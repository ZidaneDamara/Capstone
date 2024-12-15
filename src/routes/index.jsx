import { Routes, Route } from "react-router-dom";
import Layout from "../components/templates/Layout";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import CategoryPage from "../pages/CategoryPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="category/:category" element={<CategoryPage />} />
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="cart" element={<Cart />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
