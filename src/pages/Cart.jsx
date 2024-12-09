import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../store/slices/cartSlice";
import { updateStock } from "../store/slices/productSlice";
import Button from "../components/atoms/Button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.items);

  const handleQuantityChange = (productId, newQuantity) => {
    const product = products.find((p) => p.id === productId);
    if (newQuantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleCheckout = () => {
    const validItems = cartItems.filter((item) => {
      const product = products.find((p) => p.id === item.id);
      return item.quantity <= product.stock;
    });

    validItems.forEach((item) => {
      dispatch(updateStock({ productId: item.id, quantity: item.quantity }));
    });

    dispatch(clearCart());
    toast.success("Checkout successful!");
    navigate("/");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate("/")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Shopping Cart
        </h1>
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {cartItems.map((item) => {
              const product = products.find((p) => p.id === item.id);
              const isOverStock = item.quantity > product.stock;

              return (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.title}</h3>
                        <p className="ml-4">
                          Rp{" "}
                          {(item.price * item.quantity * 15000).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        {isOverStock && (
                          <p className="text-red-500 text-xs">
                            Only {product.stock} available
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>Rp {(total * 15000).toLocaleString("id-ID")}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Button onClick={handleCheckout} className="w-full">
              Checkout
            </Button>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
