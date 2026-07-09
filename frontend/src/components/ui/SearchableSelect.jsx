import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

const SearchableSelect = ({ options, value, onChange, placeholder = "Select...", hasError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className={`w-full px-3 py-2 border rounded-lg focus-within:ring-2 transition-all text-sm bg-white flex justify-between items-center cursor-pointer min-h-[38px] ${hasError ? 'border-red-500 focus-within:ring-red-500/20 focus-within:border-red-500' : 'border-slate-300 focus-within:ring-blue-500/20 focus-within:border-blue-500'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-slate-800" : "text-slate-400 truncate pr-2"}>{value || placeholder}</span>
        <ChevronDown size={16} className="text-slate-400 shrink-0" />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-slate-100 flex items-center gap-2">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input 
              type="text" 
              className="w-full text-sm outline-none bg-transparent"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div 
                  key={option}
                  className="px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-slate-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
