import React, { useState, useEffect } from "react";
import {
  Clock,
  Bell,
  Home,
  ChevronDown,
  List,
  Layers,
  LayoutGrid,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./ui/searchBar";
import Button from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const getInitials = (name) => {
    if (!name) return "US"; // Default fallback
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex flex-col w-full text-white font-sans sticky top-0 z-50 shadow-md">
      {/* Top Row */}
      <div className="flex items-center justify-between px-4 h-14 bg-[#0B213E]">
        {/* Left: Apps Menu & Logo */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="iconSm" className="text-white">
            <LayoutGrid size={20} />
          </Button>
          <img
            src="/ubslogo.png"
            alt="UBS Logo"
            className="h-5 object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
              e.target.insertAdjacentHTML(
                "afterend",
                '<span class="font-bold text-lg tracking-wide">UBS F<span class="text-blue-400">O</span>RUMS</span>',
              );
            }}
          />
        </div>

        {/* Center: Search */}
        <SearchBar />

        {/* Right: Actions & Profile */}
        <div className="flex items-center">
          <Button variant="secondary" size="pill" className="flex gap-1.5">
            <Layers size={14} />
            Onsite System
          </Button>

          <Button variant="icon" title="Recent Items">
            <Clock size={20} />
          </Button>

          <Button variant="icon" title="Notifications">
            <Bell size={20} />
          </Button>

          <Button variant="profile" size="circle">
            {user ? getInitials(user.name) : "US"}
          </Button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-center px-4 h-10 bg-[#0B213E] border-t border-white/5 text-sm overflow-x-auto no-scrollbar shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]">
        <Button
          variant="ghost"
          size="nav"
          active={location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/newdashboard")}
          className="gap-2 w-[140px]"
          onClick={() => navigate("/dashboard")}
        >
          <Home size={16} />
          Home
        </Button>

        <NavDropdownItem
          label="Contacts"
          path="/contacts"
          currentPath={location.pathname}
        />
        <NavDropdownItem
          label="Accounts"
          path="/accounts"
          currentPath={location.pathname}
        />
        <NavDropdownItem
          label="Opportunities"
          path="/opportunities"
          currentPath={location.pathname}
        />
        <NavDropdownItem
          label="Projects"
          path="/projects"
          currentPath={location.pathname}
        />
        <NavDropdownItem
          label="Campaigns"
          path="/campaigns"
          currentPath={location.pathname}
        />

        <Button
          variant="ghost"
          size="nav"
          active={location.pathname.startsWith("/tasks")}
          className="gap-2 group w-[140px]"
          onClick={() => navigate("/tasks")}
        >
          <List
            size={16}
            className={
              !location.pathname.startsWith("/tasks")
                ? "group-hover:text-white transition-colors"
                : ""
            }
          />
          Tasks
        </Button>
      </div>
    </div>
  );
};
const NavDropdownItem = ({ label, path }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button
      variant="ghost"
      size="nav"
      active={location.pathname.startsWith(path)}
      className="gap-1.5 w-[140px]"
      onClick={() => navigate(path)}
    >
      {label}
      <ChevronDown size={14} />
    </Button>
  );
};

export default Navbar;
