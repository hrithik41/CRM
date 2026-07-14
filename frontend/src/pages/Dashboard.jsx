import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Target,
  Star,
  Filter,
  Calendar,
  Phone,
  Megaphone,
  IndianRupee,
  Percent,
  GitMerge,
  ListChecks,
  ShieldCheck,
  Settings,
  Database,
  Factory,
  Activity,
  User,
} from "lucide-react";
import { api } from "../utils/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [metrics, setMetrics] = useState({
    callsToday: 0,
    oppsWonThisMonth: 0,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      api
        .get(
          `/api/dashboard/metrics?user_id=${parsedUser.id || parsedUser.user_id}`,
        )
        .then((res) => {
          if (res.success) {
            setMetrics(res.data);
          }
        })
        .catch((err) =>
          console.error("Error fetching dashboard metrics:", err),
        );
    }
  }, []);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const shortDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "short",
  });
  const currentMonthYear = new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  // Recent Deals Mock Data
  const recentDeals = [
    {
      id: 1,
      client: "Acme Corp",
      contact: "Alice Smith",
      amount: "$12,500",
      stage: "Proposal Sent",
      date: "2 hours ago",
      status: "warning",
    },
    {
      id: 2,
      client: "Globex Holdings",
      contact: "Bob Johnson",
      amount: "$34,000",
      stage: "Negotiation",
      date: "5 hours ago",
      status: "warning",
    },
    {
      id: 3,
      client: "Initech Solutions",
      contact: "Peter Gibbons",
      amount: "$8,200",
      stage: "Closed Won",
      date: "1 day ago",
      status: "success",
    },
    {
      id: 4,
      client: "Hooli Inc",
      contact: "Gavin Belson",
      amount: "$150,000",
      stage: "Contract Signing",
      date: "2 days ago",
      status: "warning",
    },
    {
      id: 5,
      client: "Veer Industries",
      contact: "Sarah Connor",
      amount: "$22,500",
      stage: "Closed Lost",
      date: "3 days ago",
      status: "danger",
    },
  ];

  const getRoleDisplayName = (role) => {
    if (!role) return "Loading...";
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getRoleTitle = (role) => {
    if (!role) return "Dashboard";
    return getRoleDisplayName(role) + " Dashboard";
  };

  const getRoleName = (role) => {
    if (!role) return "SECTION";
    return role.replace(/_/g, " ");
  };

  const getRoleBgColor = (role) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-slate-800";
      case "ADMIN":
        return "bg-indigo-700";
      case "SALES":
        return "bg-emerald-600";
      case "DATA":
        return "bg-blue-600";
      case "PRODUCTION":
        return "bg-purple-600";
      case "SPONSORSHIP":
        return "bg-[#B44B00]";
      case "OPERATION":
        return "bg-teal-600";
      case "USER":
        return "bg-gray-600";
      default:
        return "bg-[#B44B00]";
    }
  };

  const getRoleTheme = (role) => {
    switch (role) {
      case "SUPER_ADMIN":
        return { main: "bg-slate-800", textMain: "text-slate-800", textLight: "text-slate-500", border: "border-slate-800", bgLight: "bg-slate-50", borderLight: "border-slate-200" };
      case "ADMIN":
        return { main: "bg-indigo-700", textMain: "text-indigo-700", textLight: "text-indigo-500", border: "border-indigo-700", bgLight: "bg-indigo-50", borderLight: "border-indigo-200" };
      case "SALES":
        return { main: "bg-emerald-600", textMain: "text-emerald-600", textLight: "text-emerald-500", border: "border-emerald-600", bgLight: "bg-emerald-50", borderLight: "border-emerald-200" };
      case "DATA":
        return { main: "bg-blue-600", textMain: "text-blue-600", textLight: "text-blue-500", border: "border-blue-600", bgLight: "bg-blue-50", borderLight: "border-blue-200" };
      case "PRODUCTION":
        return { main: "bg-purple-600", textMain: "text-purple-600", textLight: "text-purple-500", border: "border-purple-600", bgLight: "bg-purple-50", borderLight: "border-purple-200" };
      case "SPONSORSHIP":
        return { main: "bg-[#8c4600]", textMain: "text-[#b44b00]", textLight: "text-[#b44b00]/80", border: "border-[#b44b00]", bgLight: "bg-[#FFF8F0]", borderLight: "border-[#F0E6DD]" };
      case "OPERATION":
        return { main: "bg-teal-600", textMain: "text-teal-600", textLight: "text-teal-500", border: "border-teal-600", bgLight: "bg-teal-50", borderLight: "border-teal-200" };
      case "USER":
        return { main: "bg-gray-600", textMain: "text-gray-600", textLight: "text-gray-500", border: "border-gray-600", bgLight: "bg-gray-50", borderLight: "border-gray-200" };
      default:
        return { main: "bg-[#8c4600]", textMain: "text-[#b44b00]", textLight: "text-[#b44b00]/80", border: "border-[#b44b00]", bgLight: "bg-[#FFF8F0]", borderLight: "border-[#F0E6DD]" };
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "SUPER_ADMIN":
        return ShieldCheck;
      case "ADMIN":
        return Settings;
      case "SALES":
        return TrendingUp;
      case "DATA":
        return Database;
      case "PRODUCTION":
        return Factory;
      case "SPONSORSHIP":
        return Star;
      case "OPERATION":
        return Activity;
      case "USER":
        return User;
      default:
        return Star;
    }
  };

  const RoleIcon = getRoleIcon(user?.role);
  const theme = getRoleTheme(user?.role);

  return (
    <div className="animate-slide-up flex flex-col min-h-full bg-slate-50">
      {/* Sponsorship Banner & Filters */}
      <div className="flex flex-col bg-white border-b border-slate-200 w-full shadow-sm z-10 relative">
        {/* Top Div: Banner */}
        <div
          className={`${getRoleBgColor(user?.role)} text-white px-8 py-5 transition-colors duration-300`}
        >
          <div className="flex items-center gap-2 mb-1">
            <RoleIcon className="fill-white text-white" size={24} />
            <h1 className="text-2xl font-bold tracking-wide">
              {getRoleTitle(user?.role)}
            </h1>
          </div>
          <div className="text-sm text-white/90 ml-8 font-medium">
            {formattedDate} • {user ? user.name : "Loading..."} •{" "}
            {user ? getRoleDisplayName(user.role) : "Loading..."}
          </div>
        </div>

        {/* Bottom Div: Filter Bar */}
        <div className="flex flex-col px-8 py-3 text-sm text-slate-600 border-t border-slate-200 bg-[#F8FAFC]">
          {/* Filter First Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-500 font-bold text-xs tracking-wider">
                <Filter size={14} />
                FILTER
              </div>
              <select className="border border-slate-300 rounded px-3 py-1.5 bg-white text-slate-700 outline-none focus:border-blue-500 w-64 text-xs font-medium shadow-sm">
                <option>All Projects</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
              <Calendar size={14} />
              <span>Today</span>
              <span className="text-blue-500/80 mx-1">|</span>
              <span className="text-blue-600">2026-07-06 → 2026-07-06</span>
            </div>
          </div>

          {/* Filter Second Row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-slate-500">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-1 -mb-1 cursor-pointer">
              Today
            </button>
            <button className="hover:text-blue-600 pb-1 -mb-1 transition-colors cursor-pointer">
              Yesterday
            </button>
            <button className="hover:text-blue-600 pb-1 -mb-1 transition-colors cursor-pointer">
              This Week
            </button>
            <button className="hover:text-blue-600 pb-1 -mb-1 transition-colors cursor-pointer">
              Last Week
            </button>
            <button className="hover:text-blue-600 pb-1 -mb-1 transition-colors cursor-pointer">
              This Month
            </button>
            <button className="hover:text-blue-600 pb-1 -mb-1 transition-colors cursor-pointer">
              Last Month
            </button>
            <button className="hover:text-blue-600 pb-1 -mb-1 transition-colors cursor-pointer">
              This FY (2026)
            </button>

            <select className="border border-slate-300 rounded px-2 py-1 bg-white outline-none focus:border-blue-500 text-slate-600 cursor-pointer shadow-sm mx-1">
              <option>--- Month ---</option>
            </select>

            <button className="hover:text-blue-600 pb-1 -mb-1 transition-colors cursor-pointer">
              Q1 Apr-Jun
            </button>
            <button className="hover:text-blue-600 pb-1 -mb-1 transition-colors cursor-pointer">
              Q2 Jul-Sep
            </button>
            <button className="hover:text-blue-600 pb-1 -mb-1 transition-colors cursor-pointer">
              Q3 Oct-Dec
            </button>
            <button className="hover:text-blue-600 pb-1 -mb-1 transition-colors cursor-pointer">
              Q4 Jan-Mar
            </button>

            <div className="h-4 w-px bg-slate-300 mx-2"></div>

            <button className="hover:text-blue-600 pb-1 -mb-1 transition-colors cursor-pointer">
              Last FY (2025)
            </button>

            <div className="flex items-center gap-3 ml-auto">
              <input
                type="text"
                placeholder="From"
                className="border border-slate-300 rounded px-3 py-1.5 w-28 outline-none focus:border-blue-500 shadow-sm"
              />
              <input
                type="text"
                placeholder="To"
                className="border border-slate-300 rounded px-3 py-1.5 w-28 outline-none focus:border-blue-500 shadow-sm"
              />
              <button className="bg-[#0070c0] hover:bg-blue-700 text-white px-6 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer shadow-sm">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 w-full space-y-4">
        {/* Dynamic Section Header */}
        <div className="flex items-center gap-4 mb-1">
          <div className="flex items-center gap-2">
            <RoleIcon size={16} className={`fill-current ${theme.textMain}`} />
            <h2 className="text-sm font-bold text-slate-600 tracking-widest uppercase">
              {getRoleName(user?.role)}
            </h2>
          </div>
          <button className={`flex items-center gap-1.5 px-3 py-1 ${theme.bgLight} ${theme.textMain} text-xs font-bold rounded-full border ${theme.borderLight} shadow-sm cursor-pointer hover:bg-white transition-colors`}>
            <ExternalLink size={12} />
            FULL REPORT
          </button>
        </div>

        {/* Row 1: 2 Divs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          {/* Calls Today */}
          <div className={`${theme.bgLight} rounded shadow-sm border ${theme.borderLight} border-l-4 ${theme.border} px-4 py-3 flex flex-col justify-center transition-all hover:shadow-md`}>
            <div className="flex items-center gap-4">
              <div className={`${theme.main} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0`}>
                <Phone size={24} className="fill-white" />
              </div>
              <div className="flex flex-col">
                <span className={`text-[11px] font-bold ${theme.textMain} tracking-wider uppercase mb-0.5`}>
                  Calls Today
                </span>
                <span className={`text-3xl font-bold ${theme.textMain} leading-none mb-0.5`}>
                  {metrics.callsToday}
                </span>
                <span className={`text-xs ${theme.textLight}`}>{shortDate}</span>
              </div>
            </div>
          </div>

          {/* Won This Month */}
          <div className={`bg-white rounded shadow-sm border border-slate-200 border-b-4 ${theme.border} px-5 py-3 flex flex-col relative overflow-hidden transition-all hover:shadow-md`}>
            <div className={`absolute top-3 right-4 ${theme.bgLight} ${theme.textMain} font-bold text-xs px-2.5 py-0.5 rounded-full shadow-sm border ${theme.borderLight}`}>
              {currentMonth}
            </div>
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-1.5">
              Won This Month
            </span>
            <span className={`text-3xl font-bold ${theme.textMain} leading-none mb-1`}>
              {metrics.oppsWonThisMonth}
            </span>
            <span className="text-xs text-slate-400">
              Closed Won - {currentMonthYear}
            </span>
          </div>
        </div>

        {/* Row 2: 4 Divs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Calls (Activities) */}
          {/* <div className="bg-white rounded shadow-sm border border-slate-200 px-4 py-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1.5">
                <Phone size={12} />
                Calls (Activities)
              </div>
              <div className="text-2xl font-bold text-[#b44b00] mb-1">1,590</div>
            </div>
            <span className="text-[10px] text-slate-500">completed_datetime - 2025-04-01 - 2026-06-30</span>
          </div> */}

          {/* Pitches */}
          {/* <div className="bg-white rounded shadow-sm border border-slate-200 px-4 py-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1.5">
                <Megaphone size={12} />
                Pitches
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">21</div>
            </div>
            <span className="text-xs text-slate-600">Active pitches</span>
          </div> */}

          {/* Revenue Closed */}
          {/* <div className="bg-white rounded shadow-sm border border-slate-200 px-4 py-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1.5">
                <IndianRupee size={12} />
                Revenue Closed
              </div>
              <div className="text-2xl font-bold text-[#b44b00] mb-1">₹8.40 L</div>
            </div>
            <span className="text-[10px] text-slate-600">4 deals - New: ₹4.40 L - Old: ₹4.00 L</span>
          </div> */}

          {/* % Conversion */}
          {/* <div className="bg-white rounded shadow-sm border border-slate-200 px-4 py-2.5 flex flex-col justify-between items-start">
            <div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 tracking-wider uppercase mb-2">
                <Percent size={12} />
                CONVERSION
              </div>
              <div className="bg-orange-50 text-[#8c4600] font-bold text-[11px] px-2 py-0.5 rounded shadow-sm mb-1.5 border border-orange-100 inline-block">
                19%
              </div>
            </div>
            <span className="text-[11px] text-slate-600">Pitches → Won</span>
          </div> */}
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Project-wise Summary */}
          {/* <div className="bg-white rounded shadow-sm border border-slate-200 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GitMerge size={14} className="text-orange-500" />
                <h3 className="text-xs font-bold text-slate-800">Project-wise Summary</h3>
              </div>
              <ExternalLink size={12} className="text-orange-500 cursor-pointer" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-1.5 border-b border-slate-200">Project</th>
                    <th className="px-4 py-1.5 border-b border-slate-200">Total</th>
                    <th className="px-4 py-1.5 border-b border-slate-200">Won</th>
                    <th className="px-4 py-1.5 border-b border-slate-200">New Rev</th>
                    <th className="px-4 py-1.5 border-b border-slate-200">Old Rev</th>
                    <th className="px-4 py-1.5 border-b border-slate-200">Total Rev</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] font-semibold text-slate-600">
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5 text-orange-500 max-w-[200px] truncate">23rd Edition Future of L&D Summit & Awards - ...</td>
                    <td className="px-4 py-1.5 text-emerald-600">1</td>
                    <td className="px-4 py-1.5 text-emerald-600">1</td>
                    <td className="px-4 py-1.5">₹40,000</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹40,000</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5 text-orange-500 max-w-[200px] truncate">12th Edition DevOps Conclave & Awards - Thur...</td>
                    <td className="px-4 py-1.5 text-emerald-600">1</td>
                    <td className="px-4 py-1.5 text-emerald-600">1</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹4.00 L</td>
                    <td className="px-4 py-1.5">₹4.00 L</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5 text-orange-500 max-w-[200px] truncate">SaaS Tech Summit & Awards - Thur - 21st May ...</td>
                    <td className="px-4 py-1.5 text-emerald-600">1</td>
                    <td className="px-4 py-1.5 text-emerald-600">1</td>
                    <td className="px-4 py-1.5">₹2.00 L</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹2.00 L</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5 text-orange-500 max-w-[200px] truncate">8th Edition CRO Leadership Summit & Awards ...</td>
                    <td className="px-4 py-1.5 text-emerald-600">34</td>
                    <td className="px-4 py-1.5 text-emerald-600">1</td>
                    <td className="px-4 py-1.5">₹2.00 L</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹2.00 L</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5 text-orange-500 max-w-[200px] truncate">13th Edition DevOps Conclave & Awards - Thur...</td>
                    <td className="px-4 py-1.5 text-emerald-600">19</td>
                    <td className="px-4 py-1.5 text-emerald-600">0</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-1.5 text-orange-500 max-w-[200px] truncate">13th Edition CIO Conclave & Awards - Thur - 2...</td>
                    <td className="px-4 py-1.5 text-emerald-600">1</td>
                    <td className="px-4 py-1.5 text-emerald-600">0</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}

          {/* Monthly Performance Trend */}
          {/* <div className="bg-white rounded shadow-sm border border-slate-200 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-orange-500" />
                <h3 className="text-xs font-bold text-slate-800">Monthly Performance Trend</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-bold tracking-wider">6 MONTHS</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-1.5 border-b border-slate-200 bg-slate-50">Month</th>
                    <th className="px-4 py-1.5 border-b border-slate-200 bg-slate-50">Deals</th>
                    <th className="px-4 py-1.5 border-b border-slate-200 border-l border-r border-slate-200/60 bg-emerald-50/50">Total Revenue</th>
                    <th className="px-4 py-1.5 border-b border-slate-200 bg-slate-50">New Revenue</th>
                    <th className="px-4 py-1.5 border-b border-slate-200 bg-slate-50">Renewal [Old]</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] font-semibold text-slate-600">
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5">Jan 2026</td>
                    <td className="px-4 py-1.5 text-blue-500">38</td>
                    <td className="px-4 py-1.5 bg-emerald-50 border-l border-r border-emerald-100 text-slate-800">₹97.50 L</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹4.00 L</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5">Feb 2026</td>
                    <td className="px-4 py-1.5 text-blue-500">20</td>
                    <td className="px-4 py-1.5 bg-emerald-50 border-l border-r border-emerald-100 text-slate-800">₹50.63 L</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5">Mar 2026</td>
                    <td className="px-4 py-1.5 text-blue-500">22</td>
                    <td className="px-4 py-1.5 bg-emerald-50 border-l border-r border-emerald-100 text-slate-800">₹64.45 L</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5">Apr 2026</td>
                    <td className="px-4 py-1.5 text-blue-500">18</td>
                    <td className="px-4 py-1.5 bg-emerald-50 border-l border-r border-emerald-100 text-slate-800">₹37.65 L</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5">May 2026</td>
                    <td className="px-4 py-1.5 text-blue-500">17</td>
                    <td className="px-4 py-1.5 bg-emerald-50 border-l border-r border-emerald-100 text-slate-800">₹38.05 L</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5">Jun 2026</td>
                    <td className="px-4 py-1.5 text-blue-500">260</td>
                    <td className="px-4 py-1.5 bg-emerald-50 border-l border-r border-emerald-100 text-slate-800">₹8.40 Cr</td>
                    <td className="px-4 py-1.5">₹2.60 Cr</td>
                    <td className="px-4 py-1.5">₹5.20 Cr</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5">Jul 2026</td>
                    <td className="px-4 py-1.5 text-blue-500">24</td>
                    <td className="px-4 py-1.5 bg-emerald-50 border-l border-r border-emerald-100 text-slate-800">₹65.83 L</td>
                    <td className="px-4 py-1.5">₹29.28 L</td>
                    <td className="px-4 py-1.5">₹32.20 L</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-1.5">Aug 2026</td>
                    <td className="px-4 py-1.5 text-blue-500">4</td>
                    <td className="px-4 py-1.5 bg-emerald-50 border-l border-r border-emerald-100 text-slate-800">₹8.05 L</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                  </tr>
                  <tr className="hover:bg-slate-50 border-b border-slate-100">
                    <td className="px-4 py-1.5">Sep 2026</td>
                    <td className="px-4 py-1.5 text-blue-500">7</td>
                    <td className="px-4 py-1.5 bg-emerald-50 border-l border-r border-emerald-100 text-slate-800">₹18.74 L</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                  </tr>
                  <tr className="hover:bg-slate-50 border-b border-slate-100">
                    <td className="px-4 py-1.5">Oct 2026</td>
                    <td className="px-4 py-1.5 text-blue-500">7</td>
                    <td className="px-4 py-1.5 bg-emerald-50 border-l border-r border-emerald-100 text-slate-800">₹29.25 L</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-1.5">Dec 2026</td>
                    <td className="px-4 py-1.5 text-blue-500">3</td>
                    <td className="px-4 py-1.5 bg-emerald-50 border-l border-r border-emerald-100 text-slate-800">₹2.10 L</td>
                    <td className="px-4 py-1.5">₹0</td>
                    <td className="px-4 py-1.5">₹0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
        </div>

        {/* Open Tasks Row */}
        {/* <div className="bg-white rounded shadow-sm border border-slate-200 flex flex-col">
          <div className="flex items-center p-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ListChecks size={18} className="text-orange-500" />
              <h3 className="text-sm font-bold text-slate-800">Open Tasks</h3>
            </div>
          </div>
          <div className="overflow-y-auto max-h-[350px]">
            <table className="w-full text-left border-collapse">
              <tbody className="text-[12px]">
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="pl-6 pr-4 py-3 font-bold text-slate-800 w-[28%]">CB - Tasneam Imperium</td>
                  <td className="px-4 py-3 text-slate-400 text-xs w-[12%]">26 Jun</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">Tasneam Vasovala</span>
                      <span className="text-[11px] text-slate-400">Head GRC and Information security</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-bold text-[#b44b00] text-right w-[15%]">High</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="pl-6 pr-4 py-3 font-bold text-slate-800">2nd call - priyanshu le...</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">29 Jun</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">Priyanshu borah</span>
                      <span className="text-[11px] text-slate-400">Marketing Manager</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-bold text-blue-600 text-right">Normal</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="pl-6 pr-4 py-3 font-bold text-slate-800">2nd call</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">29 Jun</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">Jiten Ganatra</span>
                      <span className="text-[11px] text-slate-400">Associate Director Global Marketing & Communications</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-bold text-blue-600 text-right">Normal</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="pl-6 pr-4 py-3 font-bold text-slate-800">F/up - Nishant Affinsio</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">29 Jun</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">Nishant Shah</span>
                      <span className="text-[11px] text-slate-400">Chief Executive Officer</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-bold text-[#b44b00] text-right">High</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="pl-6 pr-4 py-3 font-bold text-slate-800">Call Back - CRO</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">29 Jun</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">Adarsh .</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-bold text-[#b44b00] text-right">High</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="pl-6 pr-4 py-3 font-bold text-slate-800">F/up - EY Vineet Kumar</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">30 Jun</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">Vineet Kumar</span>
                      <span className="text-[11px] text-slate-400">Director, Risk Consulting</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-bold text-[#b44b00] text-right">High</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="pl-6 pr-4 py-3 font-bold text-slate-800">F/up - Derisq</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">30 Jun</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">Vikram Rathod</span>
                      <span className="text-[11px] text-slate-400">Head - Distribution and Growth Specialist</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-bold text-[#b44b00] text-right">High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
