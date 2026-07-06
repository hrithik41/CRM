import React from 'react'
import { Clock, Bell, Home, ChevronDown, List, Layers, LayoutGrid } from 'lucide-react'

const Navbar = () => {
  return (
    <div className="flex flex-col w-full text-white font-sans sticky top-0 z-50 shadow-md">
      {/* Top Row */}
      <div className="flex items-center justify-between px-4 h-14 bg-[#0B213E]">
        {/* Left: Apps Menu & Logo */}
        <div className="flex items-center gap-3">
          <button className="text-white hover:bg-white/10 p-1.5 rounded-md transition-colors cursor-pointer">
            <LayoutGrid size={20} />
          </button>
          <img 
            src="/ubslogo.png" 
            alt="UBS Logo" 
            className="h-6 object-contain" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.insertAdjacentHTML('afterend', '<span class="font-bold text-lg tracking-wide">UBS F<span class="text-blue-400">O</span>RUMS</span>');
            }}
          />
        </div>

        {/* Center: Search */}
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

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-5">
          <button className="bg-white text-[#0B213E] font-semibold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-gray-100 transition-colors cursor-pointer shadow-sm">
            <Layers size={14} />
            Onsite System
          </button>
          
          <button className="text-gray-300 hover:text-white transition-colors cursor-pointer" title="Recent Items">
            <Clock size={20} />
          </button>
          
          <button className="text-gray-300 hover:text-white transition-colors relative cursor-pointer" title="Notifications">
            <Bell size={20} />
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none border border-[#0B213E]">
              3
            </span>
          </button>
          
          <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/10 hover:ring-white/30 transition-all cursor-pointer shadow-inner">
            SR
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-center px-4 h-10 bg-[#0B213E] border-t border-white/5 text-sm overflow-x-auto no-scrollbar shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]">
        <button className="flex items-center gap-2 px-4 h-full bg-[#1A365D] border-b-2 border-white font-medium text-white cursor-pointer transition-colors">
          <Home size={16} />
          Home
        </button>
        
        <NavDropdownItem label="Contacts" />
        <NavDropdownItem label="Accounts" />
        <NavDropdownItem label="Opportunities" />
        <NavDropdownItem label="Projects" />
        <NavDropdownItem label="Campaigns" />
        
        <button className="flex items-center gap-2 px-4 h-full text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer group">
          <List size={16} className="group-hover:text-white transition-colors" />
          Tasks
          <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ml-1 group-hover:bg-red-500 transition-colors">
            3
          </span>
        </button>
      </div>
    </div>
  )
}

const NavDropdownItem = ({ label }) => (
  <button className="flex items-center gap-1.5 px-4 h-full text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer group">
    {label}
    <ChevronDown size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
  </button>
)

export default Navbar
