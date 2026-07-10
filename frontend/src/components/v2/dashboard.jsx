import React, { useState, useEffect } from "react";
import {
  Phone,
  Trophy,
  IndianRupee,
  Briefcase,
  Calendar,
  Filter,
  ChevronDown,
  ArrowUp,
  Minus,
  Check,
  UserPlus,
} from "lucide-react";

const DashboardV2 = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-full p-8 bg-[#f8fafc] space-y-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-slate-800 tracking-tight">
            Good morning, {user ? user.user_name || user.name : "Onsite System"}
          </h1>
          <p className="text-[15px] text-slate-500 mt-1">
            Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            <Calendar size={16} className="text-slate-400" />
            Jul 6 - Jul 12, 2026
            <ChevronDown size={14} className="text-slate-400 ml-1" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            <Filter size={16} className="text-slate-400" />
            Filters
            <ChevronDown size={14} className="text-slate-400 ml-1" />
          </button>
        </div>
      </div>

      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
            <Phone size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-500 mb-1">
              Calls Today
            </span>
            <span className="text-3xl font-bold text-slate-800 mb-2">42</span>
            <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <ArrowUp size={14} strokeWidth={3} /> 12%{" "}
              <span className="text-slate-400 font-medium ml-0.5">
                vs yesterday
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
            <Trophy size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-500 mb-1">
              Won This Month
            </span>
            <span className="text-3xl font-bold text-slate-800 mb-2">12</span>
            <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <ArrowUp size={14} strokeWidth={3} /> 20%{" "}
              <span className="text-slate-400 font-medium ml-0.5">
                vs last month
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
            <IndianRupee size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-500 mb-1">
              Revenue Closed
            </span>
            <span className="text-3xl font-bold text-slate-800 mb-2">
              ₹8.40 L
            </span>
            <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <ArrowUp size={14} strokeWidth={3} /> 18%{" "}
              <span className="text-slate-400 font-medium ml-0.5">
                vs last month
              </span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
            <Briefcase size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-500 mb-1">
              Active Opportunities
            </span>
            <span className="text-3xl font-bold text-slate-800 mb-2">21</span>
            <div className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Minus size={14} strokeWidth={3} className="text-slate-400" /> No
              change
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Overview */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Pipeline Overview</h3>
            <button className="text-xs font-semibold text-slate-500 flex items-center gap-1 hover:text-slate-700">
              This Month <ChevronDown size={14} />
            </button>
          </div>

          <div className="flex items-center gap-8 px-4 py-2">
            {/* Mock Funnel Graphic */}
            <div className="flex-1 flex flex-col items-center gap-1 relative">
              <div className="w-full h-12 bg-indigo-500 rounded-sm"></div>
              <div className="w-[85%] h-10 bg-purple-500 rounded-sm"></div>
              <div className="w-[65%] h-10 bg-emerald-500 rounded-sm"></div>
              <div className="w-[45%] h-10 bg-blue-500 rounded-sm"></div>
              <div className="w-[30%] h-10 bg-red-400 rounded-sm"></div>

              <div className="mt-4 bg-indigo-50 text-indigo-600 font-bold text-xs py-2 px-6 rounded-lg w-full text-center">
                Conversion Rate: 19%
              </div>
            </div>

            {/* Funnel Legend */}
            <div className="flex-1 space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <div className="text-xs font-medium text-slate-500">
                  Total Opportunities
                </div>
                <div className="text-xl font-bold text-slate-800">78</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>{" "}
                    Qualification
                  </div>
                  <div className="font-semibold text-slate-800">
                    23{" "}
                    <span className="text-slate-400 text-xs font-medium">
                      (29%)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>{" "}
                    Proposal
                  </div>
                  <div className="font-semibold text-slate-800">
                    18{" "}
                    <span className="text-slate-400 text-xs font-medium">
                      (23%)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>{" "}
                    Negotiation
                  </div>
                  <div className="font-semibold text-slate-800">
                    15{" "}
                    <span className="text-slate-400 text-xs font-medium">
                      (19%)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>{" "}
                    Closed Won
                  </div>
                  <div className="font-semibold text-slate-800">
                    12{" "}
                    <span className="text-slate-400 text-xs font-medium">
                      (15%)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>{" "}
                    Closed Lost
                  </div>
                  <div className="font-semibold text-slate-800">
                    10{" "}
                    <span className="text-slate-400 text-xs font-medium">
                      (13%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Monthly Trend</h3>
            <button className="text-xs font-semibold text-slate-500 flex items-center gap-1 hover:text-slate-700">
              6 Months <ChevronDown size={14} />
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Deals
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>{" "}
              Revenue (₹)
            </div>
          </div>

          <div className="flex-1 relative flex items-end justify-between px-2 pb-6 mt-10">
            {/* Mock Y-Axis left */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-medium text-slate-400 w-6">
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>
            {/* Mock Y-Axis right */}
            <div className="absolute right-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-medium text-slate-400 text-right w-8">
              <span className="absolute -top-4 right-0 text-[9px]">
                Revenue
              </span>
              <span>₹20L</span>
              <span>₹15L</span>
              <span>₹10L</span>
              <span>₹5L</span>
              <span>₹0</span>
            </div>

            {/* Mock bars & line points */}
            <div className="w-full h-[180px] ml-8 mr-10 relative flex justify-between items-end border-b border-slate-100">
              {/* SVG Line Mock (Absolute overlay) */}
              <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <polyline
                  points="5,70 23,35 41,50 59,20 77,30 95,25"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Data points */}
              <div className="w-8 flex flex-col items-center justify-end h-full relative z-10 group">
                <span className="absolute -top-4 text-[10px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹12.5L
                </span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full border-2 border-white absolute bottom-[28%] -mb-1"></div>
                <div className="w-full bg-indigo-100 rounded-t-sm h-[20%] group-hover:bg-indigo-200 transition-colors"></div>
                <span className="absolute -bottom-6 text-[11px] font-medium text-slate-500 w-16 text-center">
                  Feb 2026
                </span>
                <span className="absolute bottom-[20%] text-[10px] font-bold text-indigo-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  12
                </span>
              </div>

              <div className="w-8 flex flex-col items-center justify-end h-full relative z-10 group">
                <span className="absolute -top-12 text-[10px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹18.3L
                </span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full border-2 border-white absolute bottom-[63%] -mb-1"></div>
                <div className="w-full bg-indigo-100 rounded-t-sm h-[30%] group-hover:bg-indigo-200 transition-colors"></div>
                <span className="absolute -bottom-6 text-[11px] font-medium text-slate-500 w-16 text-center">
                  Mar 2026
                </span>
                <span className="absolute bottom-[30%] text-[10px] font-bold text-indigo-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  18
                </span>
              </div>

              <div className="w-8 flex flex-col items-center justify-end h-full relative z-10 group">
                <span className="absolute -top-1 text-[10px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹15.7L
                </span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full border-2 border-white absolute bottom-[48%] -mb-1"></div>
                <div className="w-full bg-indigo-100 rounded-t-sm h-[35%] group-hover:bg-indigo-200 transition-colors"></div>
                <span className="absolute -bottom-6 text-[11px] font-medium text-slate-500 w-16 text-center">
                  Apr 2026
                </span>
                <span className="absolute bottom-[35%] text-[10px] font-bold text-indigo-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  22
                </span>
              </div>

              <div className="w-8 flex flex-col items-center justify-end h-full relative z-10 group">
                <span className="absolute -top-[70px] text-[10px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹38.05L
                </span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full border-2 border-white absolute bottom-[78%] -mb-1"></div>
                <div className="w-full bg-indigo-100 rounded-t-sm h-[28%] group-hover:bg-indigo-200 transition-colors"></div>
                <span className="absolute -bottom-6 text-[11px] font-medium text-slate-500 w-16 text-center">
                  May 2026
                </span>
                <span className="absolute bottom-[28%] text-[10px] font-bold text-indigo-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  17
                </span>
              </div>

              <div className="w-8 flex flex-col items-center justify-end h-full relative z-10 group">
                <span className="absolute -top-[50px] text-[10px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹8.40Cr
                </span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full border-2 border-white absolute bottom-[68%] -mb-1"></div>
                <div className="w-full bg-indigo-100 rounded-t-sm h-[35%] group-hover:bg-indigo-200 transition-colors"></div>
                <span className="absolute -bottom-6 text-[11px] font-medium text-slate-500 w-16 text-center">
                  Jun 2026
                </span>
                <span className="absolute bottom-[35%] text-[10px] font-bold text-indigo-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  20
                </span>
              </div>

              <div className="w-8 flex flex-col items-center justify-end h-full relative z-10 group">
                <span className="absolute -top-[60px] text-[10px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹65.83L
                </span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full border-2 border-white absolute bottom-[73%] -mb-1"></div>
                <div className="w-full bg-indigo-100 rounded-t-sm h-[42%] group-hover:bg-indigo-200 transition-colors"></div>
                <span className="absolute -bottom-6 text-[11px] font-medium text-slate-500 w-16 text-center">
                  Jul 2026
                </span>
                <span className="absolute bottom-[42%] text-[10px] font-bold text-indigo-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  24
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Tables & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Top Projects */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Top Projects</h3>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-3 font-semibold">Project</th>
                  <th className="px-6 py-3 font-semibold">Won</th>
                  <th className="px-6 py-3 font-semibold">Value</th>
                  <th className="px-6 py-3 font-semibold">Stage</th>
                  <th className="px-6 py-3 font-semibold">Close Date</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-slate-700">
                <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    23rd Edition Future of L&D Summit
                  </td>
                  <td className="px-6 py-4 text-slate-500">1</td>
                  <td className="px-6 py-4 text-slate-800 font-bold">
                    ₹40,000
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-md">
                      Negotiation
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">Jul 25, 2026</td>
                </tr>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    12th Edition DevOps Conclave
                  </td>
                  <td className="px-6 py-4 text-slate-500">1</td>
                  <td className="px-6 py-4 text-slate-800 font-bold">
                    ₹4.00 L
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-md">
                      Proposal
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">Jul 18, 2026</td>
                </tr>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    SaaS Tech Summit & Awards
                  </td>
                  <td className="px-6 py-4 text-slate-500">1</td>
                  <td className="px-6 py-4 text-slate-800 font-bold">
                    ₹2.00 L
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-md">
                      Qualification
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">Aug 02, 2026</td>
                </tr>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    AI & Automation Forum
                  </td>
                  <td className="px-6 py-4 text-slate-500">0</td>
                  <td className="px-6 py-4 text-slate-800 font-bold">
                    ₹1.25 L
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-md">
                      Qualification
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">Aug 10, 2026</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    Digital Workplace Summit
                  </td>
                  <td className="px-6 py-4 text-slate-500">0</td>
                  <td className="px-6 py-4 text-slate-800 font-bold">
                    ₹90,000
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-md">
                      Proposal
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">Aug 15, 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Recent Activities</h3>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              View All
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Activity 1 */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Phone size={16} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800">
                  Call with TechNova Solutions
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Discussed partnership opportunities
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                10:30 AM
              </span>
            </div>

            {/* Activity 2 */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Check size={16} strokeWidth={3} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800">
                  Opportunity won
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  CloudTech Solutions - ₹2.50 L
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Yesterday
              </span>
            </div>

            {/* Activity 3 */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                <Calendar size={16} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800">
                  Meeting scheduled
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Product demo with InfiniSys
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Jul 10, 2026
              </span>
            </div>

            {/* Activity 4 */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <UserPlus size={16} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800">
                  New contact added
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Rahul Sharma from Accenture
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Jul 9, 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardV2;
