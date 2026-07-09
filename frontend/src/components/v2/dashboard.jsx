import React, { useState, useEffect } from 'react';
import { 
  Star,
  Filter,
  Calendar,
  Phone,
  Megaphone,
  IndianRupee,
  Percent,
  GitMerge,
  ListChecks,
  ExternalLink,
  TrendingUp
} from 'lucide-react';

const DashboardV2 = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric'
  });

  return (
    <div className="animate-slide-up flex flex-col min-h-full p-6 lg:p-8 space-y-6">
      
      {/* Sponsorship Banner & Filters */}
      <div className="flex flex-col bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl w-full shadow-lg overflow-hidden">
        {/* Top Div: Banner */}
        <div className="bg-gradient-to-r from-orange-600/80 to-amber-500/80 text-white px-8 py-6 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex items-center gap-2 mb-1">
            <Star className="fill-white text-white" size={24} />
            <h1 className="text-2xl font-bold tracking-wide">Sponsorship Dashboard</h1>
          </div>
          <div className="relative z-10 text-sm text-white/90 ml-8 font-medium">
            {formattedDate} • {user ? user.name : "Loading..."} • {user ? user.department : "Loading..."}
          </div>
        </div>

        {/* Bottom Div: Filter Bar */}
        <div className="flex flex-col px-8 py-4 text-sm text-slate-300 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs tracking-wider">
                <Filter size={14} />
                FILTER
              </div>
              <select className="border border-white/20 rounded-lg px-4 py-2 bg-slate-900 text-slate-200 outline-none focus:border-indigo-500 w-64 text-sm font-medium shadow-sm appearance-none">
                <option>All Projects</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-semibold bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 shadow-sm">
              <Calendar size={14} />
              <span>Today</span>
              <span className="text-indigo-400/50 mx-1">|</span>
              <span className="text-indigo-300">2026-07-06 → 2026-07-06</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-400">
            <button className="text-indigo-400 border-b-2 border-indigo-400 pb-1 -mb-1">Today</button>
            <button className="hover:text-indigo-300 pb-1 -mb-1 transition-colors">Yesterday</button>
            <button className="hover:text-indigo-300 pb-1 -mb-1 transition-colors">This Week</button>
            <button className="hover:text-indigo-300 pb-1 -mb-1 transition-colors">Last Week</button>
            <button className="hover:text-indigo-300 pb-1 -mb-1 transition-colors">This Month</button>
            <button className="hover:text-indigo-300 pb-1 -mb-1 transition-colors">This FY (2026)</button>
            
            <div className="h-4 w-px bg-white/10 mx-2"></div>
            
            <div className="flex items-center gap-3 ml-auto">
              <input type="text" placeholder="From" className="border border-white/10 rounded-lg bg-slate-900/50 px-3 py-1.5 w-28 outline-none focus:border-indigo-500 text-slate-200" />
              <input type="text" placeholder="To" className="border border-white/10 rounded-lg bg-slate-900/50 px-3 py-1.5 w-28 outline-none focus:border-indigo-500 text-slate-200" />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-indigo-500/25">Apply</button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <Phone size={28} className="fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-orange-400 tracking-widest uppercase mb-1">Calls Today</span>
              <span className="text-4xl font-black text-white leading-none mb-1">42</span>
              <span className="text-xs text-slate-400">06 Jul 2026</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
          <div className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs px-3 py-1 rounded-full">
            Jul
          </div>
          <div className="relative z-10">
            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2 block">Won This Month</span>
            <span className="text-4xl font-black text-emerald-400 leading-none mb-2 block">12</span>
            <span className="text-xs text-slate-500">Closed Won - Jul 2026</span>
          </div>
        </div>
      </div>

      {/* Row 2: Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors flex flex-col justify-between h-32">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">
              <Phone size={14} className="text-indigo-400" /> Calls
            </div>
            <div className="text-2xl font-bold text-white">1,590</div>
          </div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">YTD 2026</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors flex flex-col justify-between h-32">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">
              <Megaphone size={14} className="text-purple-400" /> Pitches
            </div>
            <div className="text-2xl font-bold text-white">21</div>
          </div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Active pitches</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors flex flex-col justify-between h-32">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">
              <IndianRupee size={14} className="text-amber-400" /> Rev Closed
            </div>
            <div className="text-2xl font-bold text-white">₹8.40 L</div>
          </div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">4 Deals won</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors flex flex-col justify-between h-32">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
              <Percent size={14} className="text-emerald-400" /> Conversion
            </div>
            <div className="bg-emerald-500/20 text-emerald-400 font-bold text-sm px-3 py-1 rounded-lg border border-emerald-500/30 inline-block">
              19%
            </div>
          </div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Pitches → Won</span>
        </div>
      </div>

      {/* Row 3: Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Project-wise Summary */}
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <GitMerge size={16} className="text-orange-400" />
              <h3 className="text-sm font-bold text-white">Project-wise Summary</h3>
            </div>
            <button className="text-slate-400 hover:text-white transition-colors"><ExternalLink size={14} /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                  <th className="px-6 py-3">Project</th>
                  <th className="px-6 py-3">Won</th>
                  <th className="px-6 py-3">Total Rev</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-slate-300">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-3 text-orange-400 max-w-[200px] truncate">23rd Edition Future of L&D Summit...</td>
                  <td className="px-6 py-3 text-emerald-400">1</td>
                  <td className="px-6 py-3">₹40,000</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-3 text-orange-400 max-w-[200px] truncate">12th Edition DevOps Conclave...</td>
                  <td className="px-6 py-3 text-emerald-400">1</td>
                  <td className="px-6 py-3">₹4.00 L</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-3 text-orange-400 max-w-[200px] truncate">SaaS Tech Summit & Awards...</td>
                  <td className="px-6 py-3 text-emerald-400">1</td>
                  <td className="px-6 py-3">₹2.00 L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Performance Trend */}
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <TrendingUp size={16} className="text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Monthly Trend</h3>
            </div>
            <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase border border-white/10 px-2 py-1 rounded">6 Months</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                  <th className="px-6 py-3">Month</th>
                  <th className="px-6 py-3">Deals</th>
                  <th className="px-6 py-3">Total Rev</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-slate-300">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-3">May 2026</td>
                  <td className="px-6 py-3 text-indigo-400">17</td>
                  <td className="px-6 py-3 text-emerald-400">₹38.05 L</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-3">Jun 2026</td>
                  <td className="px-6 py-3 text-indigo-400">260</td>
                  <td className="px-6 py-3 text-emerald-400">₹8.40 Cr</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-3">Jul 2026</td>
                  <td className="px-6 py-3 text-indigo-400">24</td>
                  <td className="px-6 py-3 text-emerald-400">₹65.83 L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardV2;
