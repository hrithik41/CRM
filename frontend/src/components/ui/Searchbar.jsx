import React from 'react';
import { ChevronDown } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="flex-1 max-w-3xl mx-8 hidden md:block">
      <div className="flex items-center bg-white/10 rounded-full h-9 border border-white/10 overflow-hidden text-sm focus-within:ring-1 focus-within:ring-blue-400/50 focus-within:bg-white/15 transition-all">
        <button className="flex items-center gap-1.5 px-4 hover:bg-white/5 h-full text-gray-200 transition-colors whitespace-nowrap cursor-pointer">
          Search: All
          <ChevronDown size={14} />
        </button>
        <div className="h-5 w-px bg-white/20"></div>
        <input 
          type="text" 
          placeholder="Search..." 
          className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder:text-gray-400 h-full w-full focus:ring-0"
        />
      </div>
    </div>
  );
};

export default SearchBar;
