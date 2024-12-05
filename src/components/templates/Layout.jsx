import { Outlet, useLocation } from "react-router-dom";
import Header from "../organisms/Header";
import CategoryNav from "../organisms/CategoryNav";

export default function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {!isLoginPage && <CategoryNav />}
      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
