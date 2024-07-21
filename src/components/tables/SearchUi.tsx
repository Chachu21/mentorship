import { SearchIcon } from "lucide-react";
import React, { useState, ChangeEvent } from "react";
interface Props {
  handleSearch: (term: string) => void;
  search: string;
}

const SearchUi = ({ handleSearch, search }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="flex items-center space-x-2 ">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={`Search by ${search}`}
        className="block w-48 sm:w-auto shadow-sm border-gray-300 rounded-md px-3 py-2 focus:outline-none"
      />
      <button
        onClick={() => handleSearch(searchTerm)}
        className="flex items-center justify-center px-3 py-2 bg-cc text-white rounded-md hover:bg-[#235c5c] focus:outline-none focus:bg-[#3a7777]"
      >
        <SearchIcon className="w-5 h-5" /> {/* Using the search icon */}
      </button>
    </div>
  );
};

export default SearchUi;
