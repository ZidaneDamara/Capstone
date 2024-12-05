import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/slices/cartSlice";
import { Heart } from "lucide-react";
import Button from "../atoms/Button";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleAddToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Added to cart!");
  };

  // Calculate discount percentage
  const discountPercentage = Math.floor(
    ((product.price * 2 - product.price) / (product.price * 2)) * 100
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden group">
      {/* Image Section */}
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="w-full pt-[100%] relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain bg-gray-50 transition-opacity duration-300 group-hover:opacity-75"
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4 border-t border-gray-100 ">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
              {product.title}
            </h3>
            <h5 className="text-sm text-slate-700 py-1">
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </h5>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-red-600">
            Rp {(product.price * 15000).toLocaleString("id-ID")}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 line-through">
              Rp {(product.price * 30000).toLocaleString("id-ID")}
            </span>
            <span className="text-sm text-gray-600">
              -{discountPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="px-4 pb-4">
        <Button onClick={handleAddToCart} variant="card" className="text-sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
