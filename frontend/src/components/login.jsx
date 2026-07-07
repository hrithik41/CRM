import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from './ui/AuthContainer';
import { Users, TrendingUp, Download, ShieldCheck, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login for now, then navigate to dashboard
    navigate('/dashboard');
  };

  const features = [
    { text: "Unified contact & account management", icon: <Users size={18} className="text-blue-500" /> },
    { text: "Pipeline tracking & opportunity insights", icon: <TrendingUp size={18} className="text-blue-500" /> },
    { text: "Bulk import & export for all modules", icon: <Download size={18} className="text-blue-500" /> },
    { text: "Secure, role-based access control", icon: <ShieldCheck size={18} className="text-blue-500" /> }
  ];

  // Step 2: The Left Section Content (Brand Experience)
  const leftContent = (
    <div className="animate-fade-in">
      <h4 className="text-sm font-thin tracking-widest text-blue-200 mb-4 uppercase">UBS Forums CRM</h4>
      <h1 className="text-1xl lg:text-4xl font-bold mb-4 leading-[1]">
        Your complete relationship management platform.
      </h1>
      <p className="text-lg text-blue-100 mb-12 leading-relaxed max-w-md">
        Manage accounts, contacts, opportunities, and campaigns — all in one place. Built for the UBS Forums team.
      </p>
      
      <ul className="space-y-4">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-blue-100">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              {feature.icon}
            </div>
            <span className="text-base font-thin">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <AuthContainer leftContent={leftContent}>
      
      {/* Right Section - Login Form */}
      <div className="w-full">
        {/* Logo */}
        <div className="mb-8">
          <img src="/crmlogo.png" alt="UBS Forums CRM Logo" className="h-12 object-contain" />
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-500">Sign in to your CRM account to continue</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input 
              type="email" 
              id="email" 
              placeholder="example@gmail.com" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Forgot password?
              </a>
            </div>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#0066cc] hover:bg-[#0055b3] text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.01] shadow-md hover:shadow-lg mt-2"
          >
            Sign In
          </button>
        </form>
        
        {/* Footer Notices */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
            <Lock size={14} className="text-gray-400" />
            <span>Access restricted to <strong className="text-gray-700">@ubsforums.com</strong> accounts only</span>
          </div>
          
          <p className="text-xs text-gray-400">
            &copy; 2026 UBS Forums. All rights reserved.
          </p>
        </div>
      </div>

    </AuthContainer>
  );
};

export default Login;
