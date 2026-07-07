import React from 'react';

const AuthContainer = ({ leftContent, children }) => {
  return (
    <div className="flex min-h-screen w-full font-sans bg-white overflow-hidden">
      
      {/* Left Panel - Hidden on mobile, 50% width on large screens */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 bg-gradient-to-br from-[#0B213E] via-[#004d99] to-[#0066cc] text-white p-12 lg:p-24 relative overflow-hidden">
        
        {/* Modern Ambient Glowing Orbs */}
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none mix-blend-overlay"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none mix-blend-overlay"></div>
        
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-30 pointer-events-none"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-lg mx-auto">
          {leftContent}
        </div>
      </div>

      {/* Right Panel - 100% on mobile, 50% width on large screens */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white p-6 sm:p-12">
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </div>

    </div>
  );
};

export default AuthContainer;
