import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  Bell, 
  Layers 
} from 'lucide-react';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const getInitials = (name) => {
    if (!name) return "US";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white/70 backdrop-blur-xl sticky top-0 z-30">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search accounts, contacts, or opportunities..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-300"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-6">
        
        {/* Onsite System Button */}
        <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-sm font-semibold transition-colors duration-300 border border-indigo-100">
          <Layers size={16} />
          Onsite System
        </button>

        {/* Icon Actions */}
        <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
          <button className="p-2 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300">
            <Clock size={18} />
          </button>
          <button className="p-2 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2">
          <button className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 border border-white">
            {user ? getInitials(user.name) : "US"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
