import { useSelector } from "react-redux";
import ProductCard from "../components/molecules/ProductCard";
import PromotionalCarousel from "../components/molecules/PromotionalCarousel";
import WeeklySalesCard, {
  weeklySales,
} from "../components/molecules/WeeklySalesCard";

export default function Home() {
  const { items: products, status } = useSelector((state) => state.products);
  const searchQuery = useSelector((state) => state.search.query);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <PromotionalCarousel />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex justify-center">
          Products
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="mt-4 text-gray-500">
            No products found matching your search.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex justify-center mt-16 mb-6">
          Top Sales Product This Week
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {weeklySales.map((sale, index) => (
            <WeeklySalesCard key={index} {...sale} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
