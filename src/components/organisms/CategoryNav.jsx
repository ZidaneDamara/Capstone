import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const formatCategoryName = (category) => {
    return category
      .replace(/['"]/g, "")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
          <Link
            to="/"
            className={`
              relative py-4 px-1 text-sm font-medium text-gray-900 uppercase tracking-wider whitespace-nowrap
              before:absolute before:bottom-0 before:left-0 before:h-0.5 
              before:w-0 before:bg-black before:transition-all before:duration-300
              hover:before:w-full
              ${location.pathname === "/" ? "before:w-full" : ""}
            `}
          >
            ALL
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className={`
                relative py-4 px-1 text-sm font-medium text-gray-900 uppercase tracking-wider whitespace-nowrap
                before:absolute before:bottom-0 before:left-0 before:h-0.5 
                before:w-0 before:bg-black before:transition-all before:duration-300
                hover:before:w-full
                ${
                  location.pathname === `/category/${category}`
                    ? "before:w-full"
                    : ""
                }
              `}
            >
              {formatCategoryName(category)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
