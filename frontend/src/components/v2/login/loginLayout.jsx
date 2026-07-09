import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginLeftSection from './loginLeftSection'

const LoginLayout = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-white">
            <div className="flex w-full h-full">
                <LoginLeftSection />
                <Outlet />
            </div>
        </div>
    )
}

export default LoginLayout
