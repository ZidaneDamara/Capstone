import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import Button from "../components/atoms/Button";
import { Star, Truck, ArrowLeft, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === parseInt(id))
  );
  const token = useSelector((state) => state.auth.token);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (quantity > product.stock) {
      toast.error("Not enough stock available");
      return;
    }

    dispatch(addToCart({ product, quantity }));
    toast.success("Added to cart!");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-900 mb-8"
        >
          <ArrowLeft className="mr-2" /> Back to products
        </button>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          <div className="lg:col-span-1">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-lg w-full object-contain bg-gray-100 h-96"
            />
          </div>
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-4">
              {product.title}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-5 w-5 flex-shrink-0 ${
                      product.rating.rate > rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-700">
                {product.rating.rate} out of 5 stars ({product.rating.count}{" "}
                reviews)
              </p>
            </div>
            <div className="mt-4">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                Rp {(product.price * 15000).toLocaleString("id-ID")}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700">{product.description}</p>
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">
                  Stock Available
                </h3>
                <p className="text-sm text-gray-500">{product.stock} units</p>
              </div>
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="quantity"
                  className="mr-4 text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="mx-4 font-medium">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-8">
              <Button onClick={handleAddToCart} className="w-full">
                Add to Cart
              </Button>
            </div>
            <div className="mt-6 flex items-center">
              <Truck className="h-5 w-5 text-gray-400" />
              <p className="ml-2 text-sm text-gray-500">
                Free shipping on orders over Rp 500.000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
