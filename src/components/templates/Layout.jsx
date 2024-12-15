import { Outlet, useLocation } from "react-router-dom";
import Header from "../organisms/Header";
import CategoryNav from "../organisms/CategoryNav";

const Layout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {!isAuthPage && <CategoryNav />}
      <Outlet />
    </div>
  );
};

export default Layout;
