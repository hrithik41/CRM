import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import NewDashboard from './pages/NewDashboard'
import Login from './components/login'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newdashboard" element={<NewDashboard />} />
      </Route>

      {/* Redirect fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App;