import { useSelector } from "react-redux";
import ProductCard from "../components/molecules/ProductCard";
import PromotionalCarousel from "../components/molecules/PromotionalCarousel";
import Brand from "../components/molecules/Brand";
import WeeklySalesCard, {
  weeklySales,
} from "../components/molecules/WeeklySalesCard";
import Footer from "../components/organisms/Footer";

export default function Home() {
  const { items: products, status } = useSelector((state) => state.products);
  const searchQuery = useSelector((state) => state.search.query);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading") {
    return (
      <div className="flex-grow flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="flex-grow bg-white">
        <PromotionalCarousel />
        <Brand />
        <div className="w-full px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-8">
            Products
          </h2>
          {filteredProducts.length === 0 ? (
            <p className="mt-4 text-gray-500 text-center">
              No products found matching your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 max-w-7xl mx-auto">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-16 mb-6 text-center">
            Brand Pilihan Minggu Ini
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {weeklySales.map((sale, index) => (
              <WeeklySalesCard key={index} {...sale} index={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
