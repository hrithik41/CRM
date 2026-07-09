import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from './ui/AuthContainer';
import { Users, TrendingUp, Download, ShieldCheck, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../utils/api';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Custom Validation
    let hasError = false;
    if (!email.trim()) {
      setEmailError(true);
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError(true);
      hasError = true;
    }
    if (hasError) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    
    try {
        const data = await api.post("/api/auth/login", { email, password });
        if(data.success){
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Login successful! Welcome back.");
            console.log("User logged in:", data);
            navigate('/dashboard');
        }
        else{
            toast.error(data.message || "Failed to login. Please check your credentials.");
        }
    }
    catch(error){
        toast.error("Cannot connect to the server. Please try again later.");
        console.error(error);
    }
    setLoading(false);
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
      <h1 className="text-1xl lg:text-4xl font-bold mb-4 leading-1">
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
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                emailError 
                  ? 'border-red-500 bg-red-50 focus:ring-red-500 text-red-900 placeholder-red-300' 
                  : 'border-gray-300 focus:ring-blue-500 bg-gray-50 focus:bg-white'
              }`}
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
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                passwordError 
                  ? 'border-red-500 bg-red-50 focus:ring-red-500 text-red-900 placeholder-red-300' 
                  : 'border-gray-300 focus:ring-blue-500 bg-gray-50 focus:bg-white'
              }`}
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
