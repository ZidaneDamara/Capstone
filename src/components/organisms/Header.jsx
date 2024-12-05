import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingBag, User } from "lucide-react";
import SearchBar from "../atoms/SearchBar";

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold text-black shrink-0">
            NexusHub
          </Link>

          {location.pathname !== "/login" && (
            <div className="flex-1 max-w-xl">
              <SearchBar placeholder="Road to 12.12 Mega Campaign 🎯" />
            </div>
          )}

          <div className="flex items-center space-x-4 shrink-0">
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to="/login">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
