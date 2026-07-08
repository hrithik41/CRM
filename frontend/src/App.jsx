import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import NewDashboard from './pages/NewDashboard'
import Contacts from './pages/Contacts'
import Accounts from './pages/Accounts'
import Opportunities from './pages/Opportunities'
import Projects from './pages/Projects'
import Campaigns from './pages/Campaigns'
import Tasks from './pages/Tasks'
import Login from './components/login'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newdashboard" element={<NewDashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>

      {/* Redirect fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App;