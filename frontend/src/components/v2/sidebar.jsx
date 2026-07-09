import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Layers, 
  Megaphone, 
  ListChecks,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/v2/dashboard', icon: Home },
    { name: 'Contacts', path: '/v2/contacts', icon: Users },
    { name: 'Accounts', path: '/v2/accounts', icon: Briefcase },
    { name: 'Opportunities', path: '/v2/opportunities', icon: TrendingUp },
    { name: 'Projects', path: '/v2/projects', icon: Layers },
    { name: 'Campaigns', path: '/v2/campaigns', icon: Megaphone },
    { name: 'Tasks', path: '/v2/tasks', icon: ListChecks },
  ];

  return (
    <div className="w-64 h-full bg-slate-950 border-r border-slate-800 flex flex-col relative z-20">
      {/* Decorative Blob */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Brand Section */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/50 backdrop-blur-md bg-slate-950/50 relative z-10">
        <div className="flex items-center gap-3">
          <img src="/ubslogo.png" alt="UBS Logo" className="h-6 object-contain" />
          <span className="text-white font-bold tracking-wider text-sm uppercase">CRM</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 overflow-y-auto relative z-10">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">Main Menu</div>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[inset_0_0_12px_rgba(99,102,241,0.1)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Icon size={18} className={`${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors duration-300`} />
                <span className="font-medium text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Action */}
      <div className="p-4 border-t border-slate-800/50 relative z-10">
        <button 
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/v2/login';
          }}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/10 hover:border-red-500/20 text-slate-300 transition-all duration-300 text-sm font-medium group"
        >
          <LogOut size={16} className="text-slate-400 group-hover:text-red-400 transition-colors" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
