import React from 'react'
import { ShieldIcon, UserIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Login = () => {

    const handleLogin = [
        {
            to: "/v2/login/admin",
            role: "admin",
            title: "Admin Login",
            subtitle: "Access the dashboard as an administrator",
            icon: ShieldIcon,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            border: "border-slate-200 hover:border-indigo-500"
        },
        {
            to: "/v2/login/employee",
            role: "employee",
            title: "Employee Login",
            subtitle: "Access your employee portal and tasks",
            icon: UserIcon,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-slate-200 hover:border-blue-500"
        }
    ]

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
          <div className="max-w-md w-full mx-auto">
            {/* Header */}
            <div className="mb-10 text-center md:text-left animate-slide-up">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome to CRM</h1>
              <p className="text-slate-500 mt-2 text-lg">Choose your account type to continue</p>
            </div>

            {/* Body: Selection Cards */}
            <div className='flex flex-col gap-4 animate-fade-in' style={{ animationFillMode: 'both', animationDelay: '0.1s' }}>
              {handleLogin.map((handle) => {
                const Icon = handle.icon;
                return (
                  <Link 
                    key={handle.role} 
                    to={handle.to} 
                    className={`group flex items-start p-5 rounded-2xl border transition-all duration-300 hover:shadow-md hover:shadow-slate-200/50 hover:-translate-y-0.5 ${handle.border} bg-white cursor-pointer`}
                  >
                    <div className={`p-3 rounded-xl ${handle.bg} ${handle.color} mr-4 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{handle.title}</h2>
                      <p className="text-sm text-slate-500 mt-1">{handle.subtitle}</p>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-sm text-slate-500">
              <p>Don't have an account? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors">Contact Support</a></p>
            </div>
          </div>
        </div>
  )
}

export default Login