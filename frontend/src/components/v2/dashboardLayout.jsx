import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import Navbar from './navbar';

const DashboardV2Layout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B1120] font-sans">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#0B1120] relative z-10">
        
        {/* Top Navbar */}
        <Navbar />
        
        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardV2Layout;
