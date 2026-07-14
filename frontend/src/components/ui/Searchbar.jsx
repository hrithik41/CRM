import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, User, Building2, Briefcase, LayoutGrid, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('All');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const typeDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
        setShowTypeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchSearch = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/search?q=${encodeURIComponent(query)}&type=${searchType.toLowerCase()}`);
        setResults(res || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchType]);

  const handleResultClick = (result) => {
    setShowDropdown(false);
    setQuery("");
    
    // Navigate based on type
    if (result.type === "contact") {
      navigate(`/contacts?contact_id=${result.id}`);
    } else if (result.type === "account") {
      navigate(`/accounts?account_id=${result.id}`);
    } else if (result.type === "opportunity") {
      navigate(`/opportunities?opportunity_id=${result.id}`);
    } else if (result.type === "project") {
      navigate(`/projects?project_id=${result.id}`);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'contact': return <User size={16} className="text-blue-500" />;
      case 'account': return <Building2 size={16} className="text-emerald-500" />;
      case 'opportunity': return <Briefcase size={16} className="text-purple-500" />;
      case 'project': return <LayoutGrid size={16} className="text-orange-500" />;
      default: return <Search size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="flex-1 max-w-3xl mx-8 hidden md:block relative" ref={dropdownRef}>
      <div className="flex items-center bg-white/10 rounded-full h-9 border border-white/10 text-sm focus-within:ring-1 focus-within:ring-blue-400/50 focus-within:bg-white/15 transition-all">
        
        {/* Type Selector Button */}
        <div className="relative h-full" ref={typeDropdownRef}>
          <button 
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="flex items-center gap-1.5 px-4 hover:bg-white/5 h-full rounded-l-full text-gray-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            Search: {searchType}
            <ChevronDown size={14} className={`transition-transform ${showTypeDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Type Dropdown */}
          {showTypeDropdown && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
              {['All', 'Contacts', 'Accounts', 'Opportunities', 'Projects'].map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setSearchType(type);
                    setShowTypeDropdown(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-50 ${searchType === type ? 'font-semibold text-blue-600 bg-blue-50/50' : 'text-slate-700'}`}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-white/20"></div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query.length >= 2) setShowDropdown(true); }}
          placeholder="Search..." 
          className="flex-1 bg-transparent border-none outline-none px-4 rounded-r-full text-white placeholder:text-gray-400 h-full w-full focus:ring-0"
        />
        {loading && (
          <div className="px-3">
            <Loader2 size={14} className="text-white/50 animate-spin" />
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
          {results.length > 0 ? (
            <div className="max-h-[400px] overflow-y-auto py-2">
              {results.map((result, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleResultClick(result)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-slate-800 truncate">
                      {result.title}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                      {result.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : !loading && query.length >= 2 ? (
            <div className="p-4 text-center text-sm text-slate-500">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
