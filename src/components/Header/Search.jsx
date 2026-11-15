import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search({ onSearch }) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const text = value.trim();
    navigate(text ? `/products?q=${encodeURIComponent(text)}` : "/products");

    if (onSearch) onSearch();
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full md:w-auto">
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Поиск комплектующих"
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-400 md:w-60"
      />
    </form>
  );
}

export default Search;