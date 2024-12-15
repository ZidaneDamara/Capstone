import { useState } from "react";
import { useDispatch } from "react-redux";
import { Search } from "lucide-react";
import { setSearchQuery } from "../../store/slices/searchSlice";

const SearchBar = ({ placeholder = "Search for items..." }) => {
  const [localQuery, setLocalQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(localQuery));
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl">
      <input
        type="text"
        className="w-full px-4 py-2 pl-4 pr-10 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
      >
        <Search className="w-5 h-5 text-gray-500" />
      </button>
    </form>
  );
};

export default SearchBar;
