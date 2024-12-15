import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const BrandImages = [
  "/Brand.png",
  "/Brand2.png",
  "/Brand3.png",
  "/Brand4.png",
  "/Brand5.png",
  "/Brand6.png",
  "/Brand7.png",
  "/Brand8.png",
  "/Brand9.png",
  "/Brand10.png",
  "/Brand11.png",
];

const brands = [
  {
    name: "Hush Puppies",
    promotion: "Buy 3 Get 35%",
    link: "/brand/hush-puppies",
  },
  {
    name: "Quiksilver",
    promotion: "Up to 50%",
    link: "/brand/quiksilver",
  },
  {
    name: "Puma",
    promotion: "Voucher Up to 40%",
    link: "/brand/puma",
  },
  {
    name: "H&M",
    promotion: "Save Now : Up to 60%",
    link: "/brand/h-and-m",
  },
  {
    name: "X-eight",
    promotion: "Shirts Starts from 100K",
    link: "/brand/x-eight",
  },
  {
    name: "Osella",
    promotion: "Up to 86%",
    link: "/brand/osella",
  },
  {
    name: "Bomboogie",
    promotion: "Up to 65% + Voucher 12%",
    link: "/brand/bomboogie",
  },
  {
    name: "House of Cuff",
    promotion: "#TukarTambahCuff",
    link: "/brand/house-of-cuff",
  },
  {
    name: "Brand 9",
    promotion: "Special Offer",
    link: "/brand/brand-9",
  },
  {
    name: "Brand 10",
    promotion: "New Collection",
    link: "/brand/brand-10",
  },
  {
    name: "Brand 11",
    promotion: "Limited Edition",
    link: "/brand/brand-11",
  },
];

const Brand = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleBrands = 6;

  const nextSlide = () => {
    setStartIndex((prev) =>
      prev + visibleBrands >= brands.length ? 0 : prev + 2
    );
  };

  const prevSlide = () => {
    setStartIndex((prev) =>
      prev === 0 ? brands.length - visibleBrands : prev - 2
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center">
        Featured Brands
      </h2>

      <div className="relative overflow-hidden px-8">
        <button
          onClick={prevSlide}
          className="absolute -left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-10"
          aria-label="Previous brands"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          className="flex gap-6 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${startIndex * (100 / visibleBrands)}%)`,
          }}
        >
          {brands.map((brand, index) => (
            <Link key={index} to={brand.link} className="flex-none w-[180px]">
              <div className="w-36 flex flex-col items-center gap-2 mx-auto">
                <div className="w-36 h-36 rounded-full overflow-hidden bg-[#4A0404] p-2 border-2 border-[#B8860B]">
                  <img
                    src={BrandImages[index]}
                    alt={brand.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mt-2">
                    {brand.promotion}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-10"
          aria-label="Next brands"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Brand;
