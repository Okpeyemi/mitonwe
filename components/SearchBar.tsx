import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Recherche", 
  onSearch,
  className = ""
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form 
      className={`flex items-center rounded-[10px] border-2 border-secondary-foreground w-[450px] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-secondary focus-visible:ring-[3px] ${className}`}
      onSubmit={handleSubmit}
    >
      <button 
        type="submit" 
        className="p-2 text-secondary hover:text-white"
        aria-label="Search"
      >
        <SearchIcon size={15} />
      </button>
      <input
        type="text"
        className="text-secondary placeholder-gray-400 outline-none border-none flex-1 py-2 pr-4"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;