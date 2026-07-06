import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <Routes>
      {/* Forward root path to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Main dashboard shell layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Redirect fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App;