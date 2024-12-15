import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingBag, User, LogOut } from "lucide-react";
import SearchBar from "../atoms/SearchBar";
import { logout } from "../../store/slices/authSlice";
import { setCartItems } from "../../store/slices/cartSlice";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => !!state.auth.token);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(setCartItems(JSON.parse(storedCart)));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-800 shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold text-white shrink-0">
            NexusHub.
          </Link>

          {location.pathname !== "/login" && (
            <div className="flex-1 max-w-xl">
              <SearchBar placeholder="Road to 12.12 Mega Campaign 🎯" />
            </div>
          )}

          <div className="flex items-center space-x-4 shrink-0">
            {isLoggedIn && (
              <Link to="/cart" className="relative">
                <ShoppingBag className="h-6 w-6 text-white" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white text-black text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="focus:outline-none"
              >
                <User className="h-6 w-6 text-white" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
