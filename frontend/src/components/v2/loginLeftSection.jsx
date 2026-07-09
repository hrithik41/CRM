import React from 'react'

const LoginLeftSection = () => {
    return (
        <div className="hidden md:flex w-1/2 bg-slate-950 relative overflow-hidden flex-col justify-between p-12 lg:p-16 border-r border-slate-800">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDAuNWg0ME0wIDQwLjVoNDBWMHoiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-20"></div>

            {/* Decorative Glow Blobs */}
            <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none animate-none"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-none"></div>

            {/* Top Logo / Brand Section */}
            <div className="relative z-10 flex items-center gap-3 animate-fade-in">
                <img src="/ubslogo.png" alt="UBS Forums Logo" className="h-6 object-cover animate-none" />
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 mb-8 mt-auto animate-slide-up">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                    Manage your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                        customer relationships
                    </span> <br />
                    effectively.
                </h1>
                <p className="text-lg text-slate-400 max-w-md leading-relaxed mb-12">
                    Streamline your workflow, track interactions, and boost your sales with our comprehensive CRM platform.
                </p>

                {/* Glassmorphic Feature Card */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md hover:bg-white/10 transition-colors duration-300">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-white font-medium text-lg">Enterprise Ready</p>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Join thousands of companies using our platform to scale their business operations and drive growth.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginLeftSection