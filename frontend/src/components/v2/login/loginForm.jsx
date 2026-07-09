import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'

const LoginForm = ({ role, title, subtitle }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call and redirect to dashboard
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    }

    return (
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
                <div className="max-w-md w-full mx-auto">
                    {/* Back button */}
                    <div className="mb-8 animate-fade-in">
                        <Link to="/v2/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                            <ArrowLeft size={16} />
                            Back to role selection
                        </Link>
                    </div>

                    {/* Header (Dynamic based on props) */}
                    <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
                        <p className="text-slate-500 mt-2">{subtitle}</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <input 
                                    id="email" 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="!pl-10 block w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock size={18} />
                                </div>
                                <input 
                                    id="password" 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="!pl-10 !pr-10 block w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                                <button 
                                    type="button" 
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="btn-primary w-full flex items-center justify-center gap-2 mt-2 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
                        </button>
                    </form>
                </div>
        </div>
    )
}

export default LoginForm