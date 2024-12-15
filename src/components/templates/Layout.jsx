import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import CategoryNav from "./CategoryNav";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {!isAuthPage && <CategoryNav />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
